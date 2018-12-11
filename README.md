# webpack构建 react 全家桶

整理构建项目遇到的一些问题和重要知识点儿

## webpack-dev-server
简单来说，webpack-dev-server就是一个小型的静态文件服务器。使用它，可以为webpack打包生成的资源文件提供Web服务。

他的几个属性                          
- color（CLI only） console中打印彩色日志
- historyApiFallback 任意的404响应都被替代为index.html。有什么用呢？你现在运行
    npm start，然后打开浏览器，访问http://localhost:8080,然后点击Page1到链接http://localhost:8080/page1，
    然后刷新页面试试。是不是发现刷新后404了。为什么？dist文件夹里面并没有page1.html,当然会404了，所以我们需要配置
- historyApiFallback，让所有的404定位到index.html。
- host 指定一个host,默认是localhost。如果你希望服务器外部可以访问，指定如下：host: "0.0.0.0"。比如你用手机通过IP访问。
- hot 启用Webpack的模块热替换特性。关于热模块替换，我下一小节专门讲解一下。
- port 配置要监听的端口。默认就是我们现在使用的8080端口。
- proxy 代理。比如在 localhost:3000 上有后端服务的话，你可以这样启用代理：
    ```
        proxy: {
          "/api": "http://localhost:3000"
        }
    ```
- progress（CLI only） 将编译进度输出到控制台。

CLI ONLY的需要在命令行中配置                          
package.json                        
`"start": "webpack-dev-server --config webpack.dev.config.js --color --progress"`


## redux
通过action.js文件创建函数，可以创建action~                                
```js
/*action*/
export const INCREMENT = "counter/INCREMENT";
export const DECREMENT = "counter/DECREMENT";
export const RESET = "counter/RESET";
export function increment() {
    return {type: INCREMENT}
}
export function decrement() {
    return {type: DECREMENT}
}
export function reset() {
    return {type: RESET}
}
```

reducer是一个纯函数，接收action和旧的state,生成新的state.                           
```js
import {INCREMENT, DECREMENT, RESET} from '../actions/counter';
/*
* 初始化state
 */
const initState = {
    count: 0
};
/*
* reducer
 */
export default function reducer(state = initState, action) {
    switch (action.type) {
        case INCREMENT:
            return {
                count: state.count + 1
            };
        case DECREMENT:
            return {
                count: state.count - 1
            };
        case RESET:
            return {count: 0};
        default:
            return state
    }
}
```

一个项目有很多的reducers,我们要把他们整合到一起                    
```js
import counter from './reducers/counter';
export default function combineReducers(state = {}, action) {
    return {
        counter: counter(state.counter, action)
    }
}
```

到这里，我们必须再理解下一句话。                    
**reducer就是纯函数，接收state 和 action，然后返回一个新的 state。**                           
看看上面的代码，无论是combineReducers函数也好，还是reducer函数也好，都是接收state和action，
返回更新后的state。区别就是combineReducers函数是处理整棵树，reducer函数是处理树的某一点。

接下来，我们要创建一个store。                       
前面我们可以使用 action 来描述“发生了什么”，使用action创建函数来返回action。                   
还可以使用 reducers 来根据 action 更新 state 。                        
那我们如何提交action？提交的时候，怎么才能触发reducers呢？                        
store 就是把它们联系到一起的对象。store 有以下职责：                        
- 维持应用的 state；
- 提供 getState() 方法获取 state；
- 提供 dispatch(action) 触发reducers方法更新 state；
- 通过 subscribe(listener) 注册监听器;
- 通过 subscribe(listener) 返回的函数注销监听器。
```js
import {createStore} from 'redux';
import combineReducers from './reducers.js';
let store = createStore(combineReducers);
export default store;
```

接下来就可以做一个简单的测试了：
```js
import {increment, decrement, reset} from './actions/counter';
import store from './store';

// 打印初始状态
console.log(store.getState());

// 每次 state 更新时，打印日志
// 注意 subscribe() 返回一个函数用来注销监听器
let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
);

// 发起一系列 action
store.dispatch(increment());
store.dispatch(decrement());
store.dispatch(reset());

// 停止监听 state 更新
unsubscribe();
```

[具体示例可以看这里](https://github.com/yanlele/node-index/tree/master/book/01%E3%80%81react%E4%B8%93%E9%A2%98/02%E3%80%81redux/04%E3%80%81redux)



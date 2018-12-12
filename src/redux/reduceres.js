/**
 * create by yanle
 * create time 2018/12/11 下午4:29
 */

import counter from './reducers/counter';
import userInfo from './reducers/userInfo'

export default function combineReducers(state={}, action) {
    return {
        counter: counter(state.counter, action),
        userInfo: userInfo(state.userInfo, action),
    }
}
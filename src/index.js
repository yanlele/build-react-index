/**
 * create by yanle
 * create time 2018/12/11 下午4:20
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';

// 模块热更新
if(module.hot) {
    module.hot.accept();
}

ReactDom.render(
    getRouter(),
    document.getElementById('app')
);
/**
 * create by yanle
 * create time 2018/12/11 下午4:20
 */

import React, {Component} from 'react';
import ReactDom from 'react-dom';
import getRouter from './router/router';


ReactDom.render(
    getRouter(),
    document.getElementById('app')
);
/**
 * create by yanle
 * create time 2018/12/11 下午4:19
 */

const path = require('path');

module.exports = {
    entry: path.join(__dirname, './src/index.js'),

    output: {
        path: path.join(__dirname, './dist'),
        filename: 'bundle.js'
    }
};
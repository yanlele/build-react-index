/**
 * create by yanle
 * create time 2019/1/3 下午5:11
 */

import React, {Component} from 'react';
import {Input, Icon} from 'antd';

class MyInput extends Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props.value);
        return (
            <div>
                <Input
                    onChange={(e)=>{
                        this.props.onChange(e.target.value);
                    }}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    defaultValue={this.props.value}
                    placeholder="Username" />
            </div>
        )
    }
}

export default MyInput;
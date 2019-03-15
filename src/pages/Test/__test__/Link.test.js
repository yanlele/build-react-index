/*快照测试*/
import React from 'react';
import {shallow} from 'enzyme';
// import toJson from 'enzyme-to-json';
import render from 'react-test-renderer';
import ALink from '../Link';

describe('Link', () => {
  it('正确的快照', function () {
    const tree = render.create(<ALink page="http://www.facebook.com">facebook</ALink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('这个是正确的快照更改', function () {
    const tree = render.create(<ALink page="http://www.yanleweb.com">yanlelele</ALink>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('这种时候，快照就要报错了', function () {
    const user = {
      createAt: new Date(),
      id: Math.floor(Math.random() * 20),
      name: 'yanle',
    };
    expect(user).toMatchSnapshot({
      createAt: expect.any(Date),
      id: expect.any(Number),
    });
  });

  const alink = shallow(<ALink page="http://www.facebook.com">facebook</ALink>);
  it('鼠标移入时间', function () {
    alink.find('a').simulate('mouseEnter');
    expect(alink.state('className')).toEqual('hovered')
  });

  it('鼠标移除, ', function () {
    const alink = shallow(<ALink page="">facebook</ALink>);
    alink.find('a').simulate('mouseLeave');
    expect(alink.state('className')).toEqual('normal')
  });
});

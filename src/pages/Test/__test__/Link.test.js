/*快照测试*/
import React from 'react';
import {render} from 'enzyme';
import toJson from 'enzyme-to-json';
import ALink from '../Link';

describe('Link', () => {
  it('正确的快照', function () {
    const tree = render(<ALink page="http://www.facebook.com">facebook</ALink>);
    expect(toJson(tree)).toMatchSnapshot();
  });

  it('这个是正确的快照更改', function () {
    const tree = render(<ALink page="http://www.yanleweb.com">yanlelele</ALink>);
    expect(toJson(tree)).toMatchSnapshot();
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
});

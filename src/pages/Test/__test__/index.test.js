import React from 'react';
import {mount} from 'enzyme';
import Test from '../index';

describe('Test', () => {
  const checkbox = mount(<Test labelOff="off" labelOn="on"/>);
  it('default test eq off', function () {
    expect(checkbox.text()).toEqual('off');
  });

  it('change and eq on', function () {
    checkbox.find('input').simulate('change');
    expect(checkbox.text()).toEqual('on');
  });

  it('change times 2 and eq off', function () {
    checkbox.find('input').simulate('change');
    expect(checkbox.text()).toEqual('off');
  });
});

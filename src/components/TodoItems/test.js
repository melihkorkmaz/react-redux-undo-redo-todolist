import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import TodoItems from './';

configure({ adapter : new Adapter()});

describe('Todo Items Component', () => {
    let wrapper;
    const removeMock = jest.fn();

    beforeEach(() => {
        wrapper = shallow(<TodoItems onRemoveItem={removeMock} />)
    })

    it('should render component succesfully', ()=> {
        expect(wrapper.exists()).toEqual(true);
    })

    it('should have one ul and zero li', () => {
        expect(wrapper.find('ul').length).toEqual(1);
        expect(wrapper.find('li').length).toEqual(0);
    })

    it('should have one li if items prop has one item', () => {
        expect(wrapper.find('li').length).toEqual(0);
        const items = [{ text : 'Test todo', id : Date.now()}]

        wrapper.setProps({ items});
        expect(wrapper.find('li').length).toEqual(1);

        expect(wrapper.find('li').find('span').length).toEqual(1);
        expect(wrapper.find('li').find('span').text()).toEqual('Test todo');
        
        const removeButton = wrapper.find('li').find('button');
        expect(removeButton.length).toEqual(1);
        expect(removeButton.text()).toEqual('remove');
        expect(removeButton.prop('className')).toEqual('btn btn-link btn-remove');
    })

    it('should call remove func on click remove button', () => {
        wrapper.setProps({ items: [{ text : 'Test todo', id : Date.now()}] });
        const removeButton = wrapper.find('li').find('button');

        expect(removeMock.mock.calls.length).toEqual(0);
        removeButton.simulate('click');
        expect(removeMock.mock.calls.length).toEqual(1);
    })
})
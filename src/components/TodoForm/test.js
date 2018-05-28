import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import TodoForm from './';

configure({ adapter : new Adapter()});

describe('Todo Form Component', () => {
    let wrapper;
    const onAddMock = jest.fn();

    beforeEach(() => {
        sinon.stub(console, 'error');
        wrapper = shallow(<TodoForm onAdd={onAddMock} />);
    })

    afterEach(() => {
        console.error.restore();
    })

    it('should render component successfully', () => {
        expect(wrapper.exists()).toEqual(true);
        expect(wrapper.instance().state.todoText).toEqual('');
    })

    it('should throw error for onAdd prop', () => {
        expect(shallow(<TodoForm />));
        sinon.assert.callCount(console.error, 1);
    })

    it('should render input text', () => {
        const inputElement = wrapper.find('input');
        expect(inputElement.length).toEqual(1);
        expect(inputElement.prop('type')).toEqual('text');
        expect(inputElement.prop('placeholder')).toEqual('Write your task...');
        expect(inputElement.prop('className')).toEqual('form-control');
    })

    it('should render add button', () => {
        const buttonElement = wrapper.find('button');
        expect(buttonElement.length).toEqual(1);
        expect(buttonElement.text()).toEqual('Add Todo');
        expect(buttonElement.prop('className')).toEqual('btn btn-primary');
    })

    it('should call onadd when clicked', () => {
        expect(onAddMock.mock.calls.length).toEqual(0);
        wrapper.find('form').simulate('submit', { preventDefault: () => {}});
        expect(onAddMock.mock.calls.length).toEqual(1);
    })

    it('should change todo text on change', () => {
        const inputElement = wrapper.find('input');
        inputElement.simulate('change', {target: {value: 'test data'}});

        expect(wrapper.instance().state.todoText).toEqual('test data');
    })
})
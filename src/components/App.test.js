import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {App} from './App';

configure({adapter : new Adapter()})

describe('App component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App isUndoDisabled={true} isRedoDisabled={true} addTodo={() => {}} />)
  })

  it('should render succesfully', () => {
    expect(wrapper.exists()).toEqual(true);
  })

  it('should have undo redo button component', () => {
    const buttonComponent = wrapper.find('UndoRedoButtons');
    expect(buttonComponent.length).toEqual(1);
    expect(typeof buttonComponent.prop('onUndoClicked')).toEqual('function')
    expect(typeof buttonComponent.prop('onRedoClicked')).toEqual('function')
    expect(buttonComponent.prop('isUndoDisabled')).toEqual(true);
    expect(buttonComponent.prop('isRedoDisabled')).toEqual(true);
  })

  it('should have todo form component', () => {
    const todoForm = wrapper.find('TodoForm');
    expect(todoForm.length).toEqual(1);
    expect(typeof todoForm.prop('onAdd')).toEqual('function')
  })

  it('should have todo items component', () => {
    const todoItems = wrapper.find('TodoItems');
    expect(todoItems.length).toEqual(1);
    // expect(typeof todoItems.prop('onAdd')).toEqual('function')
  })
})


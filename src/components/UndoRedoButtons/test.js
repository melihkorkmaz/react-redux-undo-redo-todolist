import React from 'react';
import { shallow, configure } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import UndoRedoButtons from './';

configure({ adapter: new Adapter() });

describe('Undo Redo Buttons', () => {
    let wrapper;
    const undoMock = jest.fn();
    const redoMock = jest.fn();

    beforeEach(() => {
        sinon.stub(console, 'error');
        wrapper = shallow(<UndoRedoButtons onUndoClicked={undoMock} onRedoClicked={redoMock} />);
    })

    afterEach(() => {
        console.error.restore();
    })

    it('should throw two errors for required props', () => {
        shallow(<UndoRedoButtons />);
        sinon.assert.callCount(console.error, 2);
    })

    it('should render without crashing', () => {
        expect(wrapper.exists()).toEqual(true);
    })

    it('should have two button with undo redo text', () => {
        const buttons = wrapper.find('.btn');
        expect(buttons.length).toEqual(2);
        expect(buttons.first().text()).toEqual('Undo');
        expect(buttons.last().text()).toEqual('Redo');
    })


    it('should call undo function when undo clicked', () => {
        expect(undoMock.mock.calls.length).toEqual(0);
        wrapper.find('.btn').first().simulate('click');
        expect(undoMock.mock.calls.length).toEqual(1);
    })

    it('should call redo function when undo clicked', () => {
        expect(redoMock.mock.calls.length).toEqual(0);
        wrapper.find('.btn').last().simulate('click');
        expect(redoMock.mock.calls.length).toEqual(1);
    })

    it('should disable undo button if isUndoDisabled true', () => {
        wrapper.setProps({'isUndoDisabled' : true});
        expect(wrapper.find('.btn').first().prop('disabled')).toEqual(true);
    })

    it('should disable redo button if isRedoDisabled true', () => {
        wrapper.setProps({'isRedoDisabled' : true});
        expect(wrapper.find('.btn').last().prop('disabled')).toEqual(true);
    })
})
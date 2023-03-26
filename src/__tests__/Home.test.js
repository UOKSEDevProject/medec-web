import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import {configure, mount, shallow} from 'enzyme';
import Home from "../components/body/Home";

configure({adapter: new Adapter()});



jest.mock('react-redux', () => ({
    useDispatch: () => {},
    useSelector: () => ({
        userDs: {
            usrId:"userId"
        }
    }),
}));

describe('Home testing',()=>{
    test('should render Home',()=>{
        const wrapper = mount(
                <Home/>
            );
        expect(wrapper.find('.home-page-title').text()).toEqual('Manage Your Business for the Future')
    })
})
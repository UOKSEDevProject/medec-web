import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { configure, shallow} from 'enzyme';
import Footer from "../components/footer/Footer";
const Home = require("../components/body/Home");

configure({adapter: new Adapter()});

describe('Footer testing',()=>{
    test('should render Footer',()=>{
        const wrapper = shallow(<Footer/>);
        expect(wrapper.find('.footer-container').length).toEqual(1)
    })
})
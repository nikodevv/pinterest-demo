import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16/build";
import UserPage from './UserPage';

configure({adapter: new Adapter()});

describe('<UserPage />', () => {
  let urlParam = { params: {userId: 'testUserId1'}}; // matches fixtureData

  beforeEach(()=>{
  });

  test('renders', () => {
    const wrapper = shallow(<UserPage match={urlParam}/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('Saves posts to state', () => {

  });
});

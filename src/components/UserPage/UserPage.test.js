import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import configureMockStore from 'redux-mock-store';
import Adapter from "enzyme-adapter-react-16/build";
import UserPage, {helpers} from './UserPage';
import {FirestoreData} from "../../utility/firebaseFascade";
import {Provider} from "react-redux";
import {initialState} from "../../reducers/auth";

const mockStore = configureMockStore();
configure({adapter: new Adapter()});

describe('<UserPage />', () => {
  let urlParam = { params: {userId: 'testUserId1'}}; // matches fixtureData
  let examplePost = {};

  beforeEach(()=>{
    examplePost = {
      id: 'any',
      imgUrl: 'someUrl',
      linkUrl: 'anotherUrl'
    };
    FirestoreData.fetchUserPosts = jest.fn(() => new Promise(resolve=>resolve([examplePost])));
  });

  afterEach(()=>{
    jest.restoreAllMocks();
  });


  test('renders', () => {
    const wrapper = shallow(
      <Provider store={mockStore()}>
        <UserPage match={urlParam}/>
      </Provider>);
    expect(wrapper).toMatchSnapshot();
  });

  test('calls fetch helper with userId and setPosts', () => {
    const setPostsMock = jest.fn();
    const fetchMock = jest.fn();

    jest.spyOn(helpers, 'fetchData').mockImplementation(fetchMock);
    jest.spyOn(React,'useState').mockImplementation(jest.fn((initial) => [initial, setPostsMock]));

    const wrapper = mount(
      <Provider store={mockStore({auth: initialState})}>
        <UserPage match={urlParam}/>
      </Provider>);
    expect(helpers.fetchData).toBeCalledWith(urlParam.params.userId, setPostsMock);
  });

  test('fetch helper calls API with correct username', async ()=>{
    const uid = 'someRandomUid1235';
    expect(FirestoreData.fetchUserPosts).toBeCalledTimes(0);
    
    await helpers.fetchData(uid, jest.fn());
    expect(FirestoreData.fetchUserPosts).toBeCalledTimes(1);
    expect(FirestoreData.fetchUserPosts).toBeCalledWith(uid);
  });

  test('fetch helper calls the setPosts function it is passed with output of API endpoint', async () => {
    const uid = 'someRandomUid1235';
    const mockSetPosts = jest.fn();

    await helpers.fetchData(uid, mockSetPosts);
    expect(mockSetPosts).toBeCalledWith([examplePost]);
  });
});

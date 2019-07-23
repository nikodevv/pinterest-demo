import React from 'react';
import {configure, mount, shallow} from 'enzyme';
import Adapter from "enzyme-adapter-react-16/build";
import UserPage, {helpers} from './UserPage';
import {FirestoreData} from "../../utility/firebaseFascade";

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
    const wrapper = shallow(<UserPage match={urlParam}/>);
    expect(wrapper).toMatchSnapshot();
  });

  test('calls fetch helper with userId and setPosts', () => {
    const setPostsMock = jest.fn();
    const fetchMock = jest.fn();

    jest.spyOn(helpers, 'fetchData').mockImplementation(fetchMock);
    jest.spyOn(React,'useState').mockImplementation(jest.fn((initial) => [initial, setPostsMock]));

    const wrapper = mount(<UserPage match={urlParam}/>);
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

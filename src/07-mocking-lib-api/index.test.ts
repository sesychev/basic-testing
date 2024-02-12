// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/posts/1';
const responseData = {
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
};

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  beforeEach(() => {
    jest.runOnlyPendingTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const create = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi(relativePath);
    expect(create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    const get = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi(relativePath);
    expect(get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const result = await throttledGetDataFromApi(relativePath);
    expect(result).toEqual(responseData);
  });
});
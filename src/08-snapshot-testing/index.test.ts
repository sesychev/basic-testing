// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList([6, 10, 12])).toStrictEqual(
      {
        value: 6,
        next: {
          value: 10,
          next: {
            value: 12,
            next: {
              value: null,
              next: null
            }
          }
        }
      }
    );
  })
  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList([1, 2, 3])).toMatchSnapshot();
  });
});

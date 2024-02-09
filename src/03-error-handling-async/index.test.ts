// Uncomment the code below and write your tests
import { resolveValue, throwError, throwCustomError, MyAwesomeError, rejectCustomError } from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    expect(async (value: unknown) => resolveValue(value)).resolves;
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    expect(throwError).toThrow(Error)
  })

  test('should throw error with default message if message is not provided', () => {
    expect(() => {
      throwError();
    }).toThrow();
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(throwCustomError).toThrow(MyAwesomeError)
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(rejectCustomError).rejects.toThrow(MyAwesomeError);
  });
});

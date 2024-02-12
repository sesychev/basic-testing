// Uncomment the code below and write your tests
import { BankAccount, InsufficientFundsError, SynchronizationFailedError, TransferFailedError, getBankAccount, } from '.';

const account = new BankAccount(100);

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => account.withdraw(330)).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => {
      account.transfer(150, new BankAccount(200));
    }).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    expect(() =>
      account.transfer(100, account),
    ).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    account.deposit(70);
    expect(account.getBalance()).toBe(170);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(120);
  });

  test('should transfer money', () => {
    const another = new BankAccount(200);
    account.transfer(20, another);
    expect(account.getBalance()).toBe(100);
    expect(another.getBalance()).toBe(220);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const balance = await getBankAccount(69).fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(69);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(69);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});

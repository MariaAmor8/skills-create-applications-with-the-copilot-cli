'use strict';

const {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  calculate,
  runCLI,
} = require('../calculator');

describe('calculator operations', () => {
  test('adds numbers', () => {
    expect(addition(2, 3)).toBe(5);
  });

  test('subtracts numbers', () => {
    expect(subtraction(10, 4)).toBe(6);
  });

  test('multiplies numbers', () => {
    expect(multiplication(45, 2)).toBe(90);
  });

  test('divides numbers', () => {
    expect(division(20, 5)).toBe(4);
  });

  test('throws on division by zero', () => {
    expect(() => division(20, 0)).toThrow('Division by zero is not allowed.');
  });

  test('calculates modulo', () => {
    expect(modulo(5, 2)).toBe(1);
  });

  test('throws on modulo by zero', () => {
    expect(() => modulo(20, 0)).toThrow('Modulo by zero is not allowed.');
  });

  test('calculates power', () => {
    expect(power(2, 3)).toBe(8);
  });

  test('calculates square root', () => {
    expect(squareRoot(16)).toBe(4);
  });

  test('throws on negative square root input', () => {
    expect(() => squareRoot(-1)).toThrow('Square root of a negative number is not allowed.');
  });
});

describe('calculator dispatcher', () => {
  test('supports add aliases', () => {
    expect(calculate('add', 2, 3)).toBe(5);
    expect(calculate('+', 2, 3)).toBe(5);
  });

  test('supports subtract aliases', () => {
    expect(calculate('subtract', 10, 4)).toBe(6);
    expect(calculate('-', 10, 4)).toBe(6);
  });

  test('supports multiply aliases', () => {
    expect(calculate('multiply', 6, 7)).toBe(42);
    expect(calculate('*', 6, 7)).toBe(42);
  });

  test('supports divide aliases', () => {
    expect(calculate('divide', 20, 5)).toBe(4);
    expect(calculate('/', 20, 5)).toBe(4);
  });

  test('supports modulo aliases', () => {
    expect(calculate('modulo', 5, 2)).toBe(1);
    expect(calculate('%', 5, 2)).toBe(1);
  });

  test('supports power aliases', () => {
    expect(calculate('power', 2, 3)).toBe(8);
    expect(calculate('^', 2, 3)).toBe(8);
  });

  test('supports square root aliases', () => {
    expect(calculate('sqrt', 16)).toBe(4);
    expect(calculate('squareroot', 16)).toBe(4);
  });

  test('rejects unsupported operations', () => {
    expect(() => calculate('unknown', 5, 2)).toThrow('Unsupported operation: unknown');
  });
});

describe('calculator CLI', () => {
  test('runs addition from argv-like input', () => {
    expect(runCLI(['add', '2', '3'])).toBe(5);
  });

  test('runs subtraction from argv-like input', () => {
    expect(runCLI(['subtract', '10', '4'])).toBe(6);
  });

  test('runs multiplication from argv-like input', () => {
    expect(runCLI(['multiply', '45', '2'])).toBe(90);
  });

  test('runs division from argv-like input', () => {
    expect(runCLI(['divide', '20', '5'])).toBe(4);
  });

  test('runs modulo from argv-like input', () => {
    expect(runCLI(['modulo', '5', '2'])).toBe(1);
  });

  test('runs power from argv-like input', () => {
    expect(runCLI(['power', '2', '3'])).toBe(8);
  });

  test('runs square root from argv-like input', () => {
    expect(runCLI(['sqrt', '16'])).toBe(4);
  });

  test('rejects negative square root input from argv-like input', () => {
    expect(() => runCLI(['sqrt', '-1'])).toThrow(
      'Square root of a negative number is not allowed.',
    );
  });

  test('rejects invalid numbers', () => {
    expect(() => runCLI(['add', 'two', '3'])).toThrow('Invalid number: two');
  });

  test('rejects invalid usage', () => {
    expect(() => runCLI(['add', '2'])).toThrow(
      'Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <number1> [number2]',
    );
  });

  test('rejects square root with extra arguments', () => {
    expect(() => runCLI(['sqrt', '25', '1'])).toThrow(
      'Usage: node src/calculator.js <add|subtract|multiply|divide|modulo|power|sqrt> <number1> [number2]',
    );
  });
});

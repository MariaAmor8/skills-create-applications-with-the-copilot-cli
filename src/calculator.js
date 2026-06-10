'use strict';

/**
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 */

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }

  return a / b;
}

function parseNumber(value) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`Invalid number: ${value}`);
  }

  return parsed;
}

function calculate(operation, a, b) {
  const operations = {
    add: addition,
    '+': addition,
    subtract: subtraction,
    '-': subtraction,
    multiply: multiplication,
    '*': multiplication,
    divide: division,
    '/': division,
  };

  const handler = operations[operation];

  if (!handler) {
    throw new Error(`Unsupported operation: ${operation}`);
  }

  return handler(a, b);
}

function runCLI(args) {
  if (args.length !== 3) {
    throw new Error('Usage: node src/calculator.js <add|subtract|multiply|divide> <number1> <number2>');
  }

  const operation = args[0];
  const a = parseNumber(args[1]);
  const b = parseNumber(args[2]);

  return calculate(operation, a, b);
}

if (require.main === module) {
  try {
    const result = runCLI(process.argv.slice(2));
    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  runCLI,
};

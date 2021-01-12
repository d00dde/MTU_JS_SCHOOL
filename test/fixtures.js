module.exports = [
  {
    route: '/api/tasks/roman',
    positive: [
      {
        name: 'should be equal 1',
        input: 'I',
        value: 1,
      },
      {
        name: 'should be equal 3999 (lower case)',
        input: 'mmmcmxcix',
        value: 3999,
      },
      {
        name: 'should be equal 3999',
        input: 'MMMCMXCIX',
        value: 3999,
      },
    ],
    negative: [
      {
        name: 'should error invalid characters',
        input: 'IIWI',
        message: 'The string contains invalid characters',
      },
      {
        name: 'should error invalid length',
        input: '',
        message: 'String length does not meet conditions',
      },
      {
        name: 'should error invalid length',
        input: 'MMMCMCCCXCXXXIXX',
        message: 'String length does not meet conditions',
      },
      {
        name: 'should error exceeds the allowed value',
        input: 'MMMCMCCCXCXXXIX',
        message: 'The number exceeds the allowed value',
      },
      {
        name: 'should error repeat over 3 characters',
        input: 'XXXX',
        message: 'Invalid Roman number (over 3 repeats characters)',
      },
      {
        name: 'should error repeat single characters',
        input: 'MMMDDD',
        message: 'Invalid Roman number (repeat single characters)',
      },
      {
        name: 'should error wrong characters order',
        input: 'XXC',
        message: 'Invalid Roman number (wrong characters order)',
      },
      {
        name: 'should unexpected error on the server', // Проверка "непредвиденной" ошибки сервера
        input: 'error',
        message: 'Terrible server error',
        code: 500,
      },
    ],
  },
  {
    route: '/api/tasks/palindrome',
    positive: [
      {
        name: 'should be equal false (min number)',
        input: -2147483648,
        value: false,
      },
      {
        name: 'should be equal true (max true palindrome)',
        input: 2147447421,
        value: false,
      },
      {
        name: 'should be equal false (max number)',
        input: 2147483647,
        value: false,
      },
      {
        name: 'should be equal true',
        input: 12321,
        value: true,
      },
      {
        name: 'should be equal true (string input)',
        input: '123321',
        value: true,
      },
    ],
    negative: [
      {
        name: 'should error invalid number',
        input: '1233w21',
        message: 'Invalid number in input',
      },
      {
        name: 'should error invalid type',
        input: [123321],
        message: 'Incorrect type of input',
      },
      {
        name: 'should error not integer',
        input: 123.321,
        message: 'Not an integer entered',
      },
      {
        name: 'should out of range error',
        input: 123456654321,
        message: 'The number is out of range',
      },
    ],
  },
  {
    route: '/api/tasks/brackets',
    positive: [
      {
        name: 'should be equal true',
        input: '((({[]})))',
        value: true,
      },
      {
        name: 'should be equal false',
        input: '([)]',
        value: false,
      },
    ],
    negative: [
      {
        name: 'should error invalid characters',
        input: '{[(42)]}',
        message: 'The string contains invalid characters',
      },
      {
        name: 'should error empty string',
        input: '',
        message: 'String length does not meet conditions',
      },
      {
        name: 'should error string length over 104',
        input: new Array(105).fill('(').join(''),
        message: 'String length does not meet conditions',
      },
    ],
  },
  {
    route: '/api/tasks/arraySort',
    positive: [
      {
        name: 'should be equal true',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, 4, 3, 9, 6],
        },
        value: [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19, 22],
      },
    ],
    negative: [
      {
        name: 'should error arr1 length is over 1000',
        input: {
          arr1: new Array(1001).fill(null).map((_, i) => i),
          arr2: [2, 1, 4, 3, 9, 6],
        },
        message: 'arr1 length does not meet the conditions',
      },
      {
        name: 'should error arr1 length is 0',
        input: {
          arr1: [],
          arr2: [2, 1, 4, 3, 9, 6],
        },
        message: 'arr1 length does not meet the conditions',
      },
      {
        name: 'should error arr2 length is over 1000',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: new Array(1001).fill(null).map((_, i) => i),
        },
        message: 'arr2 length does not meet the conditions',
      },
      {
        name: 'should error arr2 length is 0',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [],
        },
        message: 'arr2 length does not meet the conditions',
      },
      {
        name: 'should error arr1 contains invalid elements',
        input: {
          arr1: [2, 3, 1, 3, 2, 4.3, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, 4, 3, 9, 6],
        },
        message: 'arr1 contains invalid elements',
      },
      {
        name: 'should error arr2 contains invalid elements',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, '4', 3, 9, 6],
        },
        message: 'arr2 contains invalid elements',
      },
      {
        name: 'should error arr1 not contain elements from the arr2',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, 4, 3, 9, 6, 42],
        },
        message: 'arr1 does not contain elements from the arr2',
      },
      {
        name: 'should error arr2 elements are not distinct',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, 4, 3, 9, 6, 2],
        },
        message: 'arr2 elements are not distinct',
      },
    ],
  },
  {
    route: '/api/tasks/nextIndex',
    positive: [
      {
        name: 'should be equal 2 (target in the nums)',
        input: {
          nums: [1, 3, 5, 6],
          target: 5,
        },
        value: 2,
      },
      {
        name: 'should be equal 1 (target is not in the nums)',
        input: {
          nums: [1, 3, 5, 6],
          target: 2,
        },
        value: 1,
      },
      {
        name: 'should be equal 0 (target lower any nums element)',
        input: {
          nums: [1, 3, 5, 6],
          target: 0,
        },
        value: 0,
      },
      {
        name: 'should be equal 1 (target larger any nums element)',
        input: {
          nums: [1, 3, 5, 6],
          target: 42,
        },
        value: 4,
      },
    ],
    negative: [
      {
        name: 'should error nums contains invalid element',
        input: {
          nums: [1, '3', 5, 6],
          target: 2,
        },
        message: 'nums contains invalid elements',
      },
      {
        name: 'should error target is not a integer',
        input: {
          nums: [1, 3, 5, 6],
          target: 2.5,
        },
        message: 'target must be an integer',
      },
      {
        name: 'should error target is not a number',
        input: {
          nums: [1, 3, 5, 6],
          target: [2],
        },
        message: 'target must be an integer',
      },
      {
        name: 'should error nums not sorted correctly',
        input: {
          nums: [1, 3, 5, 6, 4],
          target: 2,
        },
        message: 'nums must be sorted correctly',
      },
      {
        name: 'should error nums elements are not distinct',
        input: {
          nums: [1, 3, 3, 5, 6],
          target: 2,
        },
        message: 'nums elements are not distinct',
      },
    ],
  },
];

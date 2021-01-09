module.exports = [
  {
    route: '/api/tasks/roman',
    positive: [
      {
        name: 'should be equal 3',
        input: 'III',
        value: 3,
      },
      {
        name: 'should be equal 640',
        input: 'DCXL',
        value: 640,
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
        name: 'should error exceeds the allowed value',
        input: 'MMMDDD',
        message: 'The number exceeds the allowed value',
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
        name: 'should be equal true',
        input: 12321,
        value: true,
      },
      {
        name: 'should be equal false',
        input: 2234321,
        value: false,
      },
    ],
    negative: [
      {
        name: 'should error invalid type',
        input: '123321',
        message: 'Value must be a number',
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
        input: '{[(42)]',
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
        name: 'should error arr2 elements are not unique',
        input: {
          arr1: [2, 3, 1, 3, 2, 4, 6, 22, 7, 9, 2, 19],
          arr2: [2, 1, 4, 3, 9, 6, 2],
        },
        message: 'arr2 elements are not unique',
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
        name: 'should error target is not an integer',
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
    ],
  },
];

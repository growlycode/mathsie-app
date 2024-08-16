import { Equation, UserWorkbook } from "../core/workbook";


  const operations: Equation[] = [
    { left: 10, right: 7, symbol: '+' },
    { left: 11, right: 7, symbol: '+' },
    { left: 12, right: 7, symbol: '+' },
    { left: 13, right: 7, symbol: '+' },
    { left: 14, right: 7, symbol: '+' },
    { left: 15, right: 7, symbol: '+' },
    { left: 16, right: 7, symbol: '+' },
    { left: 17, right: 7, symbol: '+' },
    { left: 18, right: 7, symbol: '+' },
    { left: 19, right: 7, symbol: '+' },
  ];
  
  
  
 export const dummyWorkbook: UserWorkbook = {
    id: '1235',
    workbook: {
      title: 'Adding 7',
      worksheets: [
        { operations }, { operations: [...operations, 
          { left: 16, right: 7, symbol: '+' },
          { left: 17, right: 7, symbol: '+' },
          { left: 18, right: 7, symbol: '+' },
          { left: 19, right: 7, symbol: '+' },
          { left: 16, right: 7, symbol: '+' },
          { left: 17, right: 7, symbol: '+' },
          { left: 18, right: 7, symbol: '+' },
          { left: 19, right: 7, symbol: '+' }] }
      ]
    },
    worksheets: [
      {
        id: '12345_1',
        worksheet: { operations },
        svg: undefined,
        paths: []
      },
      {
        id: '12345_2',
        worksheet: { operations: [...operations, 
          { left: 16, right: 7, symbol: '+' },
          { left: 17, right: 7, symbol: '+' },
          { left: 18, right: 7, symbol: '+' },
          { left: 19, right: 7, symbol: '+' },
          { left: 16, right: 7, symbol: '+' },
          { left: 17, right: 7, symbol: '+' },
          { left: 18, right: 7, symbol: '+' },
          { left: 19, right: 7, symbol: '+' }]
        },
        svg: undefined,
        paths: []
      }
    ]
  }
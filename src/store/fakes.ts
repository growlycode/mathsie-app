import { Operation, Operator, UserWorkbook } from "../core/workbook";

const plus: Operator = {
    symbol: '+',
    func: (a, b) => a + b
  }
  
  const operations: Operation[] = [
    { operandLeft: 10, operandRight: 7, operator: plus },
    { operandLeft: 11, operandRight: 7, operator: plus },
    { operandLeft: 12, operandRight: 7, operator: plus },
    { operandLeft: 13, operandRight: 7, operator: plus },
    { operandLeft: 14, operandRight: 7, operator: plus },
    { operandLeft: 15, operandRight: 7, operator: plus },
    { operandLeft: 16, operandRight: 7, operator: plus },
    { operandLeft: 17, operandRight: 7, operator: plus },
    { operandLeft: 18, operandRight: 7, operator: plus },
    { operandLeft: 19, operandRight: 7, operator: plus },
  ];
  
  
  
 export const dummyWorkbook: UserWorkbook = {
    id: '1235',
    workbook: {
      title: 'Adding 7',
      worksheets: [
        { operations }, { operations: [...operations, 
          { operandLeft: 16, operandRight: 7, operator: plus },
          { operandLeft: 17, operandRight: 7, operator: plus },
          { operandLeft: 18, operandRight: 7, operator: plus },
          { operandLeft: 19, operandRight: 7, operator: plus },
          { operandLeft: 16, operandRight: 7, operator: plus },
          { operandLeft: 17, operandRight: 7, operator: plus },
          { operandLeft: 18, operandRight: 7, operator: plus },
          { operandLeft: 19, operandRight: 7, operator: plus }] }
      ]
    },
    worksheets: [
      {
        id: '12345_1',
        worksheet: { operations },
        canvasBytes: undefined,
        canvasPaths: []
      },
      {
        id: '12345_2',
        worksheet: { operations: [...operations, 
          { operandLeft: 16, operandRight: 7, operator: plus },
          { operandLeft: 17, operandRight: 7, operator: plus },
          { operandLeft: 18, operandRight: 7, operator: plus },
          { operandLeft: 19, operandRight: 7, operator: plus },
          { operandLeft: 16, operandRight: 7, operator: plus },
          { operandLeft: 17, operandRight: 7, operator: plus },
          { operandLeft: 18, operandRight: 7, operator: plus },
          { operandLeft: 19, operandRight: 7, operator: plus }]
        },
        canvasBytes: undefined,
        canvasPaths: []
      }
    ]
  }
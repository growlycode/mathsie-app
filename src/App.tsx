
import { Fragment } from 'react/jsx-runtime';
import './App.scss';
import { DrawingCanvas } from './html/demo';

interface Operator {
  symbol: string;
  func: (numLeft: number, numRight: number) => number;
}

const plus: Operator = {
  symbol: '+',
  func: (a, b) => a + b
}

interface Operation {
  operandLeft: number;
  operandRight: number;
  operator: Operator;
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
  { operandLeft: 20, operandRight: 7, operator: plus },
];

function App() {


  return (
    <div className='mathsie-workbook'>
      <div className='mathsie-worksheet'>
        <div className='equations'>
          {operations.map((op: Operation, idx: number) => <Fragment key={`o-${idx}`}>
            <div className='operand left'>{op.operandLeft}</div>
            <div className='operator'>{op.operator.symbol}</div>
            <div className='operand right'>{op.operandRight}</div>
            <div className='equals'>=</div>
          </Fragment>)}
        </div>
        <DrawingCanvas />
      </div>
    </div>
  );
}

export default App;

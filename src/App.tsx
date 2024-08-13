
import { Fragment } from 'react/jsx-runtime';
import './App.scss';
import { DrawingCanvas } from './html/demo';
import { useState } from 'react';
import { Operator, Operation, UserWorkbook, UserWorksheet } from './core/workbook';
import { listWithItemReplaced } from './util/array';


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



const uWorkbook: UserWorkbook = {
  id: '1235',
  workbook: {
    title: 'Adding 7',
    worksheets: [
      { operations }, { operations }
    ]
  },
  worksheets: [
    {
      id: '12345_1',
      worksheet: { operations },
      canvasBytes: undefined
    },
    {
      id: '12345_2',
      worksheet: { operations },
      canvasBytes: undefined
    }
  ]
}

function App() {

  const [currentSheet, setCurrentSheet] = useState<number>(0);
  const [workbook, setWorkbook] = useState<UserWorkbook>(uWorkbook);
  const [isMarking, setIsMarking] = useState<boolean>(true);

  function nextSheet() {
    setCurrentSheet(s => (s + 1) % workbook.worksheets.length);
  }

  function prevSheet() {
    setCurrentSheet(s => Math.max(0, s - 1));
  }

  function updateUserWorkbook(uws: UserWorksheet) {
    console.log('Updating ', uws.id)
    setWorkbook(wb => ({ ...wb, worksheets: listWithItemReplaced(uws.id, uws, wb.worksheets) }));
    return Promise.resolve();
  }

  return (
    <div className='mathsie-workbook'>
      <div className='mathsie-workbook--controls'>
        <div className='pages'>
          <button type="button" onClick={prevSheet}>&lt;</button>
          <span>Page {currentSheet + 1} of {workbook.worksheets.length}</span>
          <button type="button" onClick={nextSheet}>&gt;</button></div>
        <div>
          <button type="button" onClick={() => setIsMarking(s => !s)}>{isMarking ? 'Turn off' : 'Set'} marking</button></div>
      </div>
      <WorksheetPage uworksheet={workbook.worksheets[currentSheet]} isMarking={isMarking} id={'c' + currentSheet.toString()} 
      onSave={updateUserWorkbook}/>
    </div>
  );
}

function WorksheetPage({ uworksheet, isMarking, id, onSave }: { uworksheet: UserWorksheet, isMarking: boolean, id: string, 
  onSave: (uws: UserWorksheet) => Promise<any> }) {

  return <div className='mathsie-worksheet'>
    <div className={`equations${isMarking ? " marking" : ""}`}>
      {uworksheet.worksheet.operations.map((op: Operation, idx: number) => <Fragment key={`o-${idx}`}>
        <div className='is-error'><input type='checkbox' /></div>
        <div className='operand left'>{op.operandLeft}</div>
        <div className='operator'>{op.operator.symbol}</div>
        <div className='operand right'>{op.operandRight}</div>
        <div className='equals'>=</div>
      </Fragment>)}
    </div>
    <DrawingCanvas id={id} uws={uworksheet} onSave={onSave}  />
  </div>
}

export default App;

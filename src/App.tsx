
import { Fragment } from 'react/jsx-runtime';
import './App.scss';
import { DrawingCanvas } from './html/demo';
import { useEffect, useRef, useState } from 'react';
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
  const [isMarking, setIsMarking] = useState<boolean>(false);


  function updateUserWorkbook(uws: UserWorksheet) {
    setWorkbook(wb => ({ ...wb, worksheets: listWithItemReplaced(uws.id, uws, wb.worksheets) }));
    return Promise.resolve();
  }

  return (
    <div className='mathsie-workbook'>
      <PageControls currentPage={currentSheet} totalPages={workbook.worksheets.length} setPage={setCurrentSheet}
        isMarkingMode={isMarking} setIsMarkingMode={setIsMarking} />
      <WorksheetPage uworksheet={workbook.worksheets[currentSheet]} isMarking={isMarking} onSave={updateUserWorkbook} />
    </div>
  );
}

function PageControls({ currentPage, totalPages, setPage, isMarkingMode, setIsMarkingMode }: {
  currentPage: number, totalPages: number,
  setPage: (page: number) => void, isMarkingMode: boolean, setIsMarkingMode: (marking: boolean) => void
}) {

  function nextSheet() {
    setPage(Math.min(currentPage + 1, totalPages - 1));
  }

  function prevSheet() {
    setPage(Math.max(0, currentPage - 1));
  }

  return <div className='mathsie-workbook--controls'>
    <div className='pages'>
      <button type="button" onClick={prevSheet}>&lt;</button>
      <span>Page {currentPage + 1} of {totalPages}</span>
      <button type="button" onClick={nextSheet}>&gt;</button></div>
    <div>
      <button type="button" onClick={() => setIsMarkingMode(!isMarkingMode)}>{isMarkingMode ? 'Turn off' : 'Set'} marking</button></div>
  </div>
}

function WorksheetPage({ uworksheet, isMarking, onSave }: {
  uworksheet: UserWorksheet, isMarking: boolean, onSave: (uws: UserWorksheet) => Promise<any>
}) {

  const [debug, setDebug] = useState<string>();

  const ref = useRef<HTMLDivElement>(null);
  function convertRemToPixels(rem: number) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
  useEffect(() => {
    const div = ref.current;
    if (!div) return;


    const padding = window.innerHeight * 0.04;
    const rect = div.getBoundingClientRect();
    const rem = convertRemToPixels(0.5);
    console.log("0.5rem: ", rem);
    console.log("equations height: ", rect.height);
    console.log("equations padding: ", padding);


    const eqPadding = parseFloat(window.getComputedStyle(div, null).getPropertyValue('padding-top'));
    const eqInnerHeight = rect.height - (eqPadding*2);
    const eqInnerVH = window.innerHeight - rect.y;
    const rows = uworksheet.worksheet.operations.length;
    const height =  eqInnerHeight / rows;
    const requiredHeight = `${height - rem}px`;
    
    setDebug(`screen: ${window.screen.availHeight} innerHeight: ${window.innerHeight} / 4vh: ${padding} / eqPadding: ${eqPadding} eqHeight: ${rect.height} or ${eqInnerVH} / eqInnerHeight: ${eqInnerHeight} / 0.5rem: ${rem} / rows: ${rows}`);
    div.style.fontSize = requiredHeight;
    div.style.lineHeight = requiredHeight;

  }, [])

  return <div className='mathsie-worksheet'>
    <div style={{position: 'absolute'}}>{debug}</div>
    <div className={`equations${isMarking ? " marking" : ""}`} ref={ref}>
      {uworksheet.worksheet.operations.map((op: Operation, idx: number) => <Fragment key={`o-${idx}`}>
        <div className='is-error'><input type='checkbox' /></div>
        <div className='operand left'>{op.operandLeft}</div>
        <div className='operator'>{op.operator.symbol}</div>
        <div className='operand right'>{op.operandRight}</div>
        <div className='equals'>=</div>
      </Fragment>)}
    </div>
    <DrawingCanvas uws={uworksheet} onSave={onSave} />
  </div>
}

export default App;

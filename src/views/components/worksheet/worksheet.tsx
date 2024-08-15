import { useRef, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { SketchCanvas } from "../../../canvas/sketch";
import { UserWorksheet, Operation } from "../../../core/workbook";

export function WorksheetPage({ uworksheet, isMarking, onSave }: {
    uworksheet: UserWorksheet, isMarking: boolean, onSave: (uws: UserWorksheet) => Promise<any>
}) {

    // const [debug, setDebug] = useState<string>();

    const ref = useRef<HTMLDivElement>(null);
    function convertRemToPixels(rem: number) {
        return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    }
    useEffect(() => {
        const div = ref.current;
        if (!div) return;


        const rect = div.getBoundingClientRect();
        const rem = convertRemToPixels(0.5);
        const eqHeight = window.innerHeight - rect.y;
        const rows = uworksheet.worksheet.operations.length;
        const height = eqHeight / rows;
        const requiredHeight = `${Math.min(50, height - rem)}px`;

        // setDebug(`innerHeight: ${window.innerHeight} / eqHeight: ${eqHeight} / font-size: ${requiredHeight} / rows: ${rows}`);
        div.style.fontSize = requiredHeight;
        div.style.lineHeight = requiredHeight;

    }, [uworksheet])

    return <div className='mathsie-worksheet'>
        {/* <div style={{ position: 'absolute' }}>{debug}</div> */}
        <div className={`equations`}>
            <div className={`equations--inner ${isMarking ? " marking" : ""}`} ref={ref}>
                {uworksheet.worksheet.operations.map((op: Operation, idx: number) => <Fragment key={`o-${idx}`}>
                    <div className='is-error'><input type='checkbox' /></div>
                    <div className='operand left'>{op.left}</div>
                    <div className='operator'>{op.symbol}</div>
                    <div className='operand right'>{op.right}</div>
                    <div className='equals'>=</div>
                </Fragment>
                )}
            </div>
        </div>
        <SketchCanvas uws={uworksheet} onSave={onSave} />
    </div>
}
import { useRef, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { SketchCanvas } from "../canvas/sketch";
import { UserWorksheet, Equation } from "../../../core/workbook";

export function WorksheetPage({ uworksheet, onSave }: {
    uworksheet: UserWorksheet, onSave: (uws: UserWorksheet) => Promise<any>
}) {

    const ref = useRef<HTMLDivElement>(null);
    // function convertRemToPixels(rem: number) {
    //     return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
    // }
    useEffect(() => {
        const div = ref.current;
        if (!div) return;


        const rect = div.getBoundingClientRect();
        const gap = parseFloat(getComputedStyle(div).gap);
        //const rem = convertRemToPixels(gap);
        const eqHeight = window.innerHeight - rect.y;
        const rows = uworksheet.equations.length;
        const height = eqHeight / rows;
        const requiredHeight = `${Math.min(50, height - gap)}px`;

        div.style.fontSize = requiredHeight;
        div.style.lineHeight = requiredHeight;

    }, [uworksheet])

    return <div className='mathsie-worksheet flex h-full'>
        <div className={`equations p-[5svh] md:pl-[10svh] pr-0 basis-full`}>
            <div className={`equations--inner `} ref={ref}>
                {uworksheet.equations.map((op: Equation, idx: number) => <Fragment key={`o-${idx}`}>
                    <div className='select-none'>{op.left}</div>
                    <div className='select-none'>{op.symbol}</div>
                    <div className='select-none'>{op.right}</div>
                    <div className='select-none'>=</div>
                </Fragment>
                )}
            </div>
        </div>
        <SketchCanvas uws={uworksheet} onSave={onSave} />
    </div>
}
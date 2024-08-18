import { useEffect, useRef, useState } from "react";
import { UserWorksheet } from "../../../core/workbook";
import { MReactSketchCanvas, ReactSketchCanvasRef } from "./ReactSketchCanvas/MReactSketchCanvas";
import { IconButton } from "../buttons/icon-button";
import { prependStyle } from "../../../infrastructure/util/css";

interface DrawingCanvasProps {
    uws: UserWorksheet;
    className?: string;
    onSave: (uws: UserWorksheet) => Promise<any>;
}
export const SketchCanvas = ({ uws, className, onSave }: DrawingCanvasProps) => {

    const ref = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [penColor] = useState<string>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white' : 'black')
    const [height, setHeight] = useState<string | undefined>();

    useEffect(() => {
        const rect = ref.current?.getBoundingClientRect();
        setHeight(rect?.height+"px");
    }, []);

    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.resetCanvas();
        uws.paths?.length && canvasRef.current!.loadPaths(uws.paths);
    }, [uws.paths]);

    const handleEraserClick = () => {
        canvasRef.current?.eraseMode(true);
    };

    const handlePenClick = () => {
        canvasRef.current?.eraseMode(false);
    };

    const handleUndoClick = () => {
        canvasRef.current?.undo();
    };

    const handleRedoClick = () => {
        canvasRef.current?.redo();
    };

    const handleClearClick = () => {
        onSave({ ...uws, paths: [] })
    };

    const save = () => {
        canvasRef.current?.exportPaths().then(paths => onSave({ ...uws, paths }));
    }

    return <div className={`${prependStyle(className)}`} ref={ref}>
        <MReactSketchCanvas
            ref={canvasRef}
            height={height}
            className={`mathsie-canvas !border-none -ml-4 absolute`}
            canvasColor="transparent"
            strokeColor={penColor}
            eraserWidth={30}
            eraserPen="touch"
            onPointerUp={save}
        />
        <div className="absolute right-0 h-full flex flex-col gap-2 justify-center p-2 min-w-min">
            <IconButton onClick={handlePenClick} faClass="pencil" />
            <IconButton onClick={handleEraserClick} faClass="eraser" />
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
            <IconButton onClick={handleUndoClick} faClass="rotate-left" />
            <IconButton onClick={handleRedoClick} faClass="rotate-right" />
            <hr className="h-px my-1 bg-gray-200 border-0 dark:bg-gray-700" />
            {/* <IconButton onClick={save} faClass="save" /> */}
            <IconButton onClick={handleClearClick} faClass="trash" />
        </div>
    </div>
}
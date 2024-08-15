import { useEffect, useRef, useState } from "react";
import { UserWorksheet } from "../core/workbook";
import { MReactSketchCanvas, ReactSketchCanvasRef } from "./ReactSketchCanvas/MReactSketchCanvas";
import { CanvasPath } from "./types";

interface DrawingCanvasProps {
    uws: UserWorksheet;
    onSave: (uws: UserWorksheet) => Promise<any>;
}
export const SketchCanvas = ({ uws, onSave }: DrawingCanvasProps) => {
    const canvasRef = useRef<ReactSketchCanvasRef>(null);
    const [eraseMode, setEraseMode] = useState<boolean>(false);
    const [penColor] = useState<string>(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'white': 'black')

    useEffect(() => {
        if (!canvasRef.current) return;
        canvasRef.current.resetCanvas();
        uws.paths?.length && canvasRef.current!.loadPaths(uws.paths);
    }, [uws.paths]);

    const handleEraserClick = () => {
        setEraseMode(true);
        canvasRef.current?.eraseMode(true);
    };

    const handlePenClick = () => {
        setEraseMode(false);
        canvasRef.current?.eraseMode(false);
    };

    const handleUndoClick = () => {
        canvasRef.current?.undo();
    };

    const handleRedoClick = () => {
        canvasRef.current?.redo();
    };

    const savePaths = (paths: CanvasPath[]) => {
        onSave({ ...uws, paths });
    }

    const save = () => {
         canvasRef.current && canvasRef.current.exportPaths()
             .then(savePaths);
     }

    return <div className="canvas-wrapper">
        <MReactSketchCanvas
            ref={canvasRef}
            className="mathsie-canvas"
            canvasColor="transparent"
            strokeColor={penColor}
            eraserWidth={30}
            eraserPen="touch"
            onPointerUp={save}
        />
        <div className="canvas--actions">
            <i className="fa fa-pencil"
                data-disabled={!eraseMode}
                onClick={handlePenClick}
            />
            <i className="fa fa-eraser"
                data-disabled={eraseMode}
                onClick={handleEraserClick}
            />
            <div className="vr" />
            <i className="fa fa-rotate-left"
                onClick={handleUndoClick}
            />
            <i className="fa fa-rotate-right"
                onClick={handleRedoClick}
            />            
            <i className="fa fa-save"
            onClick={save}
        />
        </div>
    </div>
}
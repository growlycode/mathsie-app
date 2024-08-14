import { useEffect, useRef, useState } from "react";
import {
    ReactSketchCanvas,
    type ReactSketchCanvasRef
} from "react-sketch-canvas";
import { UserWorksheet } from "../core/workbook";

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
        uws.canvasPaths?.length && canvasRef.current!.loadPaths(uws.canvasPaths);
    }, [uws.canvasPaths]);


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

    const save = () => {

        canvasRef.current && canvasRef.current.exportPaths()
            .then(canvasPaths => onSave({ ...uws, canvasPaths }));
    }

    return <div className="canvas-wrapper">
        <ReactSketchCanvas
            ref={canvasRef}
            className="mathsie-canvas"
            canvasColor="transparent"
            strokeColor={penColor}
            eraserWidth={30}
            // allowOnlyPointerType="pen"
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
            onClick={() => save()}
        />
        </div>
    </div>
}
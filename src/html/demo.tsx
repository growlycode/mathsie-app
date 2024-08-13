import { useEffect, useRef } from "react";
import throttle from 'lodash.throttle';
import { UserWorksheet } from "../core/workbook";

interface DrawingCanvasProps {
    id: string;
    uws: UserWorksheet;
    onSave: (uws: UserWorksheet) => Promise<any>;
}

export function DrawingCanvas({ id, uws, onSave }: DrawingCanvasProps) {
    const ref = useRef<HTMLCanvasElement>(null);

    function getContext() {
        const ctx: CanvasRenderingContext2D | null | undefined = ref?.current?.getContext('2d');
        const canvas = ctx?.canvas;

        return { ctx, canvas };
    }

    useEffect(() => {

        const { ctx, canvas } = getContext();
        if (!ctx || !canvas) return;

        console.log('Loading ', uws.id, ' from ', uws.canvasBytes)

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (!uws.canvasBytes) return;


        var img = new Image;
        img.width = canvas.width;
        img.height = canvas.height;

        img.onload = function () {
            ctx.drawImage(img, 0, 0);
        }
        img.src = uws.canvasBytes;

        ctx.drawImage(img, 0, 0);


    }, [uws.canvasBytes]);

    useEffect(() => {
        console.log('Processing ', uws.id)
        const { ctx, canvas } = getContext();
        if (!ctx || !canvas) return;

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth * 0.4;

        ctx.strokeStyle = 'black';
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;

        //flag
        let isDrawing = false; //don't draw when mouse is just moving mouse w/o doing anything

        //where to start a line from and then where to end it
        let lastX = 0;
        let lastY = 0;
        let isPen = true;

        function getMousePos(e: any) {
            var rect = canvas!.getBoundingClientRect(), // abs. size of element
                scaleX = canvas!.width / rect.width,    // relationship bitmap vs. element for x
                scaleY = canvas!.height / rect.height;  // relationship bitmap vs. element for y

            return {
                x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
                y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
            }
        }

        function draw({ x, y }: any) {
            if (!isDrawing || !ctx) {
                return; //only run in click and drag, and only with the pen
            }

            ctx.strokeStyle = isPen ? 'black' : 'red';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY); //start from
            ctx.lineTo(x, y); //go to
            ctx.stroke(); //to actually draw the path on canvas
            [lastX, lastY] = [x, y];
        }

        function finish() {
            if (!ctx || !canvas) return;

            if (isDrawing) {
                isDrawing = false;
                onSave({ ...uws, canvasBytes: canvas.toDataURL() });
            }
        }

        
        const onMouseMove = (e: MouseEvent) => draw(getMousePos(e));
        const throttledMouseMove = throttle(onMouseMove, 30);

        function handleMouseDown(e: any) {
            isDrawing = true;

            const { x, y } = getMousePos(e);
            [lastX, lastY] = [x, y];
        }

        function handlePointerDown(e: any) { isPen = e.pointerType === 'pen' };

        canvas.addEventListener('pointerdown', handlePointerDown);
        canvas.addEventListener('mousemove', throttledMouseMove);
        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mouseup', finish);
        canvas.addEventListener('mouseout', finish);

        function getTouchPos(e: any) {
            var bcr = e.target.getBoundingClientRect();
            var x = e.targetTouches[0].clientX - bcr.x;
            var y = e.targetTouches[0].clientY - bcr.y;
            return { x, y };
        }

        function handleTouchStart(e: any) {
            if (e.target == canvas) {
                e.preventDefault();
                isDrawing = true;

                const { x, y } = getTouchPos(e);
                [lastX, lastY] = [x, y];
            }
        }

        function handleTouchMove(e: any) {
            if (e.target == canvas) {
                e.preventDefault();
                draw(getTouchPos(e))
            }
        }

        function handleTouchEnd(e: any) {
            if (e.target == canvas) {
                e.preventDefault();
                finish();
            }
        }

        //canvas on mobile
        document.body.addEventListener("touchstart", handleTouchStart);
        document.body.addEventListener("touchend", handleTouchEnd);
        document.body.addEventListener("touchmove", handleTouchMove);

        return function cleanup() {
            console.log('Unloading ', uws.id)
            canvas.removeEventListener('pointerdown', handlePointerDown);
            canvas.removeEventListener('mousemove', throttledMouseMove)
            canvas.removeEventListener('mouseup', finish);  
            canvas.removeEventListener('mouseup', finish);
            canvas.removeEventListener('mouseout', finish);
            document.body.removeEventListener("touchstart", handleTouchStart);
            document.body.addEventListener("touchend", handleTouchEnd);
            document.body.addEventListener("touchmove", handleTouchMove);
        }

    }, [uws.id])


    return <canvas id={`c${id}`} className="mathsie-canvas" ref={ref}></canvas>;
}


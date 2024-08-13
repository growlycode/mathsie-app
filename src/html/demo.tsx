import { useEffect, useRef } from "react";
import throttle from 'lodash.throttle';

export function DrawingCanvas() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null | undefined = ref?.current?.getContext('2d');
        const canvas = ctx?.canvas;
        if (!ctx || !canvas) return;

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth / 2;

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

        function draw(e: any) {
            if (!isDrawing || !ctx)// || !isPen)
                return; //only run in click and drag, and only with the pen

            const { x, y } = getMousePos(e);
            //console.log(e);

            ctx.strokeStyle = isPen ? 'black' : 'red';
            ctx.beginPath();
            ctx.moveTo(lastX, lastY); //start from
            ctx.lineTo(x, y); //go to
            ctx.stroke(); //to actually draw the path on canvas
            [lastX, lastY] = [x, y];
        }

        canvas.addEventListener('pointerdown',
            (event: any) => {
                console.log('pointerdown')
                isPen = event.pointerType === 'pen';
            },
            false
        );

        const onMouseMove = (e: MouseEvent) => {
            console.log('mousemove');
            draw(e);
        };

        const throttledMouseMove = throttle(onMouseMove, 30);
        canvas.addEventListener('mousemove', throttledMouseMove);
        canvas.addEventListener('mousedown', (e) => {
            isDrawing = true;

            const { x, y } = getMousePos(e);
            [lastX, lastY] = [x, y];
        });


        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);


        //canvas on mobile
        document.body.addEventListener("touchstart", function (e) {
            if (e.target == canvas) {
                e.preventDefault();
                const clientX = e.touches[0].clientX;
                const clientY = e.touches[0].clientY;
                isDrawing = true;

                [lastX, lastY] = [clientX, clientY];
            }
        }, false);
        document.body.addEventListener("touchend", function (e) {
            console.log('touchend')
            if (e.target == canvas) {
                e.preventDefault();
                isDrawing = false;
            }
        }, false);
        document.body.addEventListener("touchmove", function (e: any) {
            console.log('touchmove')
            if (e.target == canvas) {
                e.preventDefault();
                e.offsetX = e.targetTouches[0].clientX;
                e.offsetY = e.targetTouches[0].clientY;
                draw(e)
            }
        }, false);
    }, [])


    return <canvas id="draw" className="mathsie-canvas" ref={ref}></canvas>;
}
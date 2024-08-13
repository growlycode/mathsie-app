import { useEffect, useRef } from "react";
import throttle from 'lodash.throttle';

export function HtmlDemo() {
    const ref = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const ctx: CanvasRenderingContext2D | null | undefined = ref?.current?.getContext('2d');
        const canvas = ctx?.canvas;
        if (!ctx || !canvas) return;

        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;

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

        function draw(e: any) {
            if (!isDrawing || !ctx)
                return; //only run in click and drag
            //console.log(e);
            ctx.beginPath();
            ctx.strokeStyle = isPen ? 'black': 'red';
            ctx.moveTo(lastX, lastY); //start from
            ctx.lineTo(e.offsetX, e.offsetY); //go to
            ctx.stroke(); //to actually draw the path on canvas
            [lastX, lastY] = [e.offsetX, e.offsetY];
        }

        canvas.addEventListener('pointerdown',
            (event: any) => {
                console.log('pointerdown')
                isPen = event.pointerType === 'pen';
            },
            false
        );

        const onMouseMove = (e: MouseEvent) => {
            console.log('mousemove')
            draw(e);
        };
 
        const throttledMouseMove = throttle(onMouseMove, 30);
        canvas.addEventListener('mousemove', throttledMouseMove);
        canvas.addEventListener('mousedown', (e) => {
            console.log('mousedown')
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });


        canvas.addEventListener('mouseup', () => isDrawing = false);
        canvas.addEventListener('mouseout', () => isDrawing = false);


        //canvas on mobile

        document.body.addEventListener("touchstart", function (e) {
            
            console.log('touchstart')
            if (e.target == canvas) {
                e.preventDefault();
                const clientX = e.touches[0].clientX;
                const clientY = e.touches[0].clientY;
                isDrawing = true;
                draw({ offsetX: clientX, offsetY: clientY })
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

    return <canvas id="draw" ref={ref}></canvas>;
}
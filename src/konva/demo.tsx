import { useRef, useState } from 'react';
import { Stage, Layer, Line } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';

interface Line {

    tool: string;
    points: number[];
}


export function KonvaDemo() {
    const [tool, setTool] = useState('pen');
    const [lines, setLines] = useState<Line[]>([]);
    const isDrawing = useRef(false);

    const handleMouseDown = (e: KonvaEventObject<MouseEvent>) => {
        const stage = e?.target?.getStage();
        if (!stage) return;

        isDrawing.current = true;
        const pos = stage.getPointerPosition();
        if (!pos) return;

        setLines([...lines, { tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e: KonvaEventObject<MouseEvent>) => {
        // no drawing - skipping
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();
        if (!stage) return;

        const point = stage.getPointerPosition();
        if (!point) return;

        let lastLine = lines[lines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };
    return <><Stage
        width={window.innerWidth}
        height={window.innerHeight - 120}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
    >
        <Layer>

            {lines.map((line, i) => (
                <Line
                    key={i}
                    points={line.points}
                    stroke="#df4b26"
                    strokeWidth={5}
                    tension={0.5}
                    lineCap="round"
                    lineJoin="round"
                    globalCompositeOperation={
                        line.tool === 'eraser' ? 'destination-out' : 'source-over'
                    }
                />
            ))}
        </Layer>
    </Stage>
        <select
            value={tool}
            onChange={(e) => {
                setTool(e.target.value);
            }}
        >
            <option value="pen">Pen</option>
            <option value="eraser">Eraser</option>
        </select>
    </>
}
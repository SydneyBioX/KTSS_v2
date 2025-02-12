import { useMemo } from "react";
import { ScaleLinear } from "d3";

// tick length
const TICK_LENGTH = 10;

export const AxisBottom = ({
  xScale,
  pixelsPerTick,
  height,
}) => {
  const range = xScale.range();

  const ticks = useMemo(() => {
    const width = range[1] - range[0];
    const numberOfTicksTarget = Math.floor(width / pixelsPerTick);

    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [xScale]);

  return (
    <>
      {/* Ticks and labels */}
      {ticks.map(({ value, xOffset }) => (
        <g key={value} transform={`translate(${xOffset}, 0)`}>
          <line
            y1={TICK_LENGTH}
            y2={-height - TICK_LENGTH}
            stroke="#b7b7b7"
            strokeWidth={0.5}
            shapeRendering={"crispEdges"}
          />
          <text
            key={value}
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              transform: "translateY(20px)",
              fill: "#b7b7b7",
            }}
          >
            {value}
          </text>
          <text
            key="Kidney Quality (%)"
            style={{
              fontSize: "10px",
              textAnchor: "middle",
              fill: "#D2D7D3",
            }}></text>
        </g>
      ))}
    </>
  );
};

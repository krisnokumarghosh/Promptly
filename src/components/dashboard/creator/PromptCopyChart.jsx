
"use client";

import { jetbrainsMono } from "@/lib/fonts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Custom tooltip
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div
        className={`${jetbrainsMono.className} bg-[#141a14] border border-[#AAFF00]/20 rounded-2xl px-3 py-2`}
      >
        <p className="text-[10px] text-white/40 mb-0.5 truncate max-w-30">
          {payload[0].payload.title}
        </p>
        <p className="text-[13px] font-bold text-[#AAFF00]">
          {payload[0].value} copies
        </p>
      </div>
    );
  }
  return null;
}

// Custom bar label (shows on highest bar only)
function CustomBarLabel({ x, y, width, value, maxValue }) {
  if (value !== maxValue || value === 0) return null;
  return (
    <g>
      <rect
        x={x + width / 2 - 16}
        y={y - 26}
        width={32}
        height={20}
        rx={5}
        fill="#AAFF00"
      />
      <text
        x={x + width / 2}
        y={y - 12}
        textAnchor="middle"
        fill="#0a0a0a"
        fontSize={10}
        fontWeight={700}
        fontFamily="monospace"
      >
        {value}
      </text>
    </g>
  );
}

export default function PromptCopyChart({ prompts = [] }) {
  const data = prompts.map((p) => ({
    title: p.title.length > 14 ? p.title.slice(0, 14) + "…" : p.title,
    fullTitle: p.title,
    copies: p.copyCount ?? 0,
  }));

  const maxCopies = Math.max(...data.map((d) => d.copies), 1);

  // Stats
  const totalCopies = data.reduce((s, d) => s + d.copies, 0);
  const avgCopies = data.length ? (totalCopies / data.length).toFixed(1) : 0;
  const topPrompt = data.reduce(
    (a, b) => (a.copies > b.copies ? a : b),
    data[0] ?? {},
  );

  return (
    <div className="bg-[#0d120d] border border-white/[0.07] rounded-4xl p-5 mt-8 md:mt-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#AAFF00"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span className="text-[13px] font-semibold text-white">
            Prompt Performance
          </span>
        </div>
        <span
          className={`${jetbrainsMono.className} flex items-center gap-1.5 text-[10px] font-bold text-[#AAFF00] tracking-widest`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#AAFF00] animate-pulse" />
          LIVE
        </span>
      </div>

      {/* Chart */}
      {data.length === 0 ? (
        <div className="h-50 flex items-center justify-center text-white/25 text-[13px]">
          No prompt data yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={data}
            barCategoryGap="30%"
            margin={{ top: 30, right: 4, left: -28, bottom: 0 }}
          >
            <XAxis
              dataKey="title"
              tick={{
                fill: "rgba(255,255,255,0.3)",
                fontSize: 9,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fill: "rgba(255,255,255,0.2)",
                fontSize: 9,
                fontFamily: "monospace",
              }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.03)" }}
            />
            <Bar
              dataKey="copies"
              radius={[5, 5, 0, 0]}
              maxBarSize={52}
              shape={(props) => {
                const { x, y, width, height, value } = props;
                const fill =
                  value === maxCopies && value > 0
                    ? "#AAFF00"
                    : "rgba(170,255,0,0.35)";
                return (
                  <rect
                    x={x}
                    y={y}
                    width={width}
                    height={height}
                    fill={fill}
                    rx={5}
                    ry={5}
                  />
                );
              }}
              label={(props) => (
                <CustomBarLabel {...props} maxValue={maxCopies} />
              )}
            />
          </BarChart>
        </ResponsiveContainer>
      )}

      {/* Bottom stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
        <div>
          <p
            className={`${jetbrainsMono.className} text-[9px] text-white/25 tracking-widest uppercase mb-1`}
          >
            Total Copies
          </p>
          <p
            className={`${jetbrainsMono.className} text-[20px] font-bold text-white`}
          >
            {totalCopies}
          </p>
        </div>
        <div>
          <p
            className={`${jetbrainsMono.className} text-[9px] text-white/25 tracking-widest uppercase mb-1`}
          >
            Avg. Per Prompt
          </p>
          <p
            className={`${jetbrainsMono.className} text-[20px] font-bold text-white`}
          >
            {avgCopies}
          </p>
        </div>
        <div>
          <p
            className={`${jetbrainsMono.className} text-[9px] text-white/25 tracking-widest uppercase mb-1`}
          >
            Top Prompt
          </p>
          <p
            className={`${jetbrainsMono.className} text-[13px] font-bold text-[#AAFF00] max-w-30 truncate`}
          >
            {topPrompt?.fullTitle ?? "—"}
          </p>
        </div>
      </div>
    </div>
  );
}

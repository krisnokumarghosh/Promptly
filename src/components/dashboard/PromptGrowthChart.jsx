"use client";

import { useState, useMemo } from "react";
import { jetbrainsMono } from "@/lib/fonts";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  
} from "recharts";

function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className={`${jetbrainsMono.className} bg-[#0d120d] border border-[#AAFF00]/20 rounded-2xl px-3 py-2`}>
        <p className="text-[10px] text-white/40 mb-0.5">{label}</p>
        <p className="text-[13px] font-bold text-[#AAFF00]">
          {payload[0].value} prompts
        </p>
      </div>
    );
  }
  return null;
}

function CustomDot({ cx, cy, value }) {
  if (!value) return null;
  return (
    <circle
      cx={cx}
      cy={cy}
      r={4}
      fill="#AAFF00"
      stroke="#0d120d"
      strokeWidth={2}
    />
  );
}

export default function PromptGrowthChart({ prompts = [] }) {
  const [range, setRange] = useState(30);

  const chartData = useMemo(() => {
    const now = new Date();
    const cutoff = new Date(now - range * 24 * 60 * 60 * 1000);

    const filtered = prompts.filter(
      (p) => new Date(p.createdAt) >= cutoff
    );

    const grouped = {};

    for (let i = range; i >= 0; i--) {
      const d = new Date(now - i * 24 * 60 * 60 * 1000);
      const key = d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      }).toUpperCase();
      grouped[key] = 0;
    }

    filtered.forEach((p) => {
      const key = new Date(p.createdAt)
        .toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
        })
        .toUpperCase();
      if (grouped[key] !== undefined) {
        grouped[key] += 1;
      }
    });

    let total = 0;
    return Object.entries(grouped).map(([date, count]) => {
      total += count;
      return { date, count: total };
    });
  }, [prompts, range]);

  const tickInterval = Math.floor(chartData.length / 4);

  return (
    <div className="bg-[#0d120d] border border-white/[0.07] rounded-4xl p-5 mt-8 md:mt-20">

      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-[14px] font-semibold text-white">
            Performance Analytics
          </p>
          <p className="text-[11px] text-white/30 mt-0.5">
            Copies & Growth Trend over time
          </p>
        </div>

        <div className={`${jetbrainsMono.className} flex items-center gap-1 bg-white/4 border border-white/8 rounded-2xl p-1`}>
          {[7, 30].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-xl tracking-[0.06em] transition-all duration-150 ${
                range === r
                  ? "bg-[#AAFF00] text-[#0a0a0a]"
                  : "text-white/40 hover:text-white"
              }`}
            >
              {r} Days
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={chartData}
          margin={{ top: 10, right: 4, left: -28, bottom: 0 }}
        >
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#AAFF00" stopOpacity={0.25} />
              <stop offset="100%" stopColor="#AAFF00" stopOpacity={0.01} />
            </linearGradient>
          </defs>

          <XAxis
            dataKey="date"
            tick={{
              fill: "rgba(255,255,255,0.25)",
              fontSize: 9,
              fontFamily: "monospace",
            }}
            axisLine={false}
            tickLine={false}
            interval={tickInterval}
          />
          <YAxis
            tick={{
              fill: "rgba(255,255,255,0.2)",
              fontSize: 9,
              fontFamily: "monospace",
            }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{
              stroke: "rgba(170,255,0,0.15)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#AAFF00"
            strokeWidth={2.5}
            fill="url(#growthGradient)"
            dot={<CustomDot />}
            activeDot={{
              r: 6,
              fill: "#AAFF00",
              stroke: "#0d120d",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>

    </div>
  );
}
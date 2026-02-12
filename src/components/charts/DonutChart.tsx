'use client';

import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface DonutRing {
  data: { name: string; value: number }[];
  colors: string[];
}

interface DonutChartProps {
  rings: DonutRing[];
  width?: number;
  height?: number;
}

export function DonutChart({ rings, width = 300, height = 300 }: DonutChartProps) {
  return (
    <PieChart width={width} height={height}>
      {rings.map((ring, index) => (
        <Pie
          key={index}
          data={ring.data}
          cx="50%"
          cy="50%"
          innerRadius={60 + index * 30}
          outerRadius={80 + index * 30}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {ring.data.map((entry, i) => (
            <Cell key={`cell-${i}`} fill={ring.colors[i % ring.colors.length]} />
          ))}
        </Pie>
      ))}
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineData {
  name: string;
  [key: string]: string | number;
}

interface LineConfig {
  dataKey: string;
  stroke: string;
}

interface LineGraphProps {
  data: LineData[];
  lines: LineConfig[];
}

export function LineGraph({ data, lines }: LineGraphProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {lines.map((line) => (
          <Line key={line.dataKey} type="monotone" dataKey={line.dataKey} stroke={line.stroke} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

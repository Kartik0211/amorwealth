'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarData {
  name: string;
  [key: string]: string | number;
}

interface BarConfig {
  dataKey: string;
  fill: string;
}

interface BarChartComponentProps {
  data: BarData[];
  bars: BarConfig[];
}

export function BarChartComponent({ data, bars }: BarChartComponentProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {bars.map((bar) => (
          <Bar key={bar.dataKey} dataKey={bar.dataKey} fill={bar.fill} />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

'use client';

import * as React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';

const chartData = [
  { status: 'Finalizados', quantidade: 542, fill: 'var(--primary)' },
  { status: 'Reembolsados', quantidade: 128, fill: 'var(--primary-light)' },
  { status: 'Cancelados', quantidade: 215, fill: 'var(--primary-lighter)' },
  { status: 'Pendentes', quantidade: 187, fill: 'var(--primary-dark)' }
];

export function PieGraph2() {
  const totalPedidos = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantidade, 0);
  }, []);

  return (
    <div className="relative w-full h-80">
      <PieChart width={300} height={300}>
        <defs>
          {chartData.map((item, index) => (
            <linearGradient
              key={item.status}
              id={`fill${item.status}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop offset="0%" stopColor="var(--primary)" stopOpacity={1 - index * 0.15} />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.8 - index * 0.15} />
            </linearGradient>
          ))}
        </defs>
        <Pie
          data={chartData.map((item) => ({
            ...item,
            fill: `url(#fill${item.status})`
          }))}
          dataKey="quantidade"
          nameKey="status"
          cx="50%"
          cy="50%"
          outerRadius={100}
          innerRadius={60}
          stroke="var(--background)"
          strokeWidth={2}
          labelLine={false}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={`url(#fill${entry.status})`} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
          formatter={(value: number, name: string) => [`${value}`, name]}
        />
      </PieChart>

   
     
    </div>
  );
}

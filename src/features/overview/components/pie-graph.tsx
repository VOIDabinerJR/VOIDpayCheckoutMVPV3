'use client';

import * as React from 'react';
import { IconTrendingUp } from '@tabler/icons-react';
import { Label, Pie, PieChart } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from '@/components/ui/chart';

const chartData = [
  { status: 'Finalizados', quantidade: 542, fill: 'var(--primary)' },
  { status: 'Reembolsados', quantidade: 128, fill: 'var(--primary-light)' },
  { status: 'Cancelados', quantidade: 215, fill: 'var(--primary-lighter)' },
  { status: 'Pendentes', quantidade: 187, fill: 'var(--primary-dark)' }
];

const chartConfig = {
  quantidade: {
    label: 'Quantidade'
  },
  Finalizados: {
    label: 'Finalizados',
    color: 'var(--primary)'
  },
  Reembolsados: {
    label: 'Reembolsados',
    color: 'var(--primary-light)'
  },
  Cancelados: {
    label: 'Cancelados',
    color: 'var(--primary-lighter)'
  },
  Pendentes: {
    label: 'Pendentes',
    color: 'var(--primary-dark)'
  }
} satisfies ChartConfig;

export function PieGraph() {
  const totalPedidos = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.quantidade, 0);
  }, []);

  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Balanço de Pedidos</CardTitle>
        <CardDescription>
          <span className='hidden @[540px]/card:block'>
            Distribuição de pedidos por status no último mês
          </span>
          <span className='@[540px]/card:hidden'>Status dos pedidos</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square h-[250px]'
        >
          <PieChart>
            <defs>
              {['Finalizados', 'Reembolsados', 'Cancelados', 'Pendentes'].map(
                (status, index) => (
                  <linearGradient
                    key={status}
                    id={`fill${status}`}
                    x1='0'
                    y1='0'
                    x2='0'
                    y2='1'
                  >
                    <stop
                      offset='0%'
                      stopColor='var(--primary)'
                      stopOpacity={1 - index * 0.15}
                    />
                    <stop
                      offset='100%'
                      stopColor='var(--primary)'
                      stopOpacity={0.8 - index * 0.15}
                    />
                  </linearGradient>
                )
              )}
            </defs>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData.map((item) => ({
                ...item,
                fill: `url(#fill${item.status})`
              }))}
              dataKey='quantidade'
              nameKey='status'
              innerRadius={60}
              strokeWidth={2}
              stroke='var(--background)'
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor='middle'
                        dominantBaseline='middle'
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className='fill-foreground text-3xl font-bold'
                        >
                          {totalPedidos.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className='fill-muted-foreground text-sm'
                        >
                          Total Pedidos
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className='flex-col gap-2 text-sm'>
        <div className='flex items-center gap-2 leading-none font-medium'>
          Finalizados lideram com{' '}
          {((chartData[0].quantidade / totalPedidos) * 100).toFixed(1)}%{' '}
          <IconTrendingUp className='h-4 w-4' />
        </div>
        <div className='text-muted-foreground leading-none'>
          Dados referentes ao mês atual
        </div>
      </CardFooter>
    </Card>
  );
}
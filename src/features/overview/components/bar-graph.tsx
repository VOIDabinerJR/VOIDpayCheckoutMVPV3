'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

export const description = 'Gráfico de ganhos totais';

type ChartData = {
  data: string;
  total: number;
};

const CHART_DATA: ChartData[] = [
  { data: '2024-04-01', total: 22200 + 15000 + 18000 }, // Soma de mpesa + emola + visa
  { data: '2024-04-02', total: 9700 + 18000 + 12000 },
  { data: '2024-04-03', total: 16700 + 12000 + 15000 },
  { data: '2024-06-30', total: 44600 + 40000 + 35000 },
];

const CHART_CONFIG = {
  views: { label: 'Ganhos' },
  total: { label: 'Total', color: 'var(--primary)' },
} satisfies ChartConfig;

export function BarGraph() {
  const [isClient, setIsClient] = React.useState(false);

  // Calcular total geral
  const totalGeral = React.useMemo(() => {
    return CHART_DATA.reduce((acc, curr) => acc + curr.total, 0);
  }, []);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'MZN',
    }).format(value / 100);
  };

  const formatDate = (dateString: string, format: 'short' | 'long' = 'short') => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-MZ', {
      month: 'short',
      day: 'numeric',
      ...(format === 'long' && { year: 'numeric' }),
    });
  };

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Card className="@container/card !pt-3">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 !py-0">
          <CardTitle>Seus Ganhos</CardTitle>
          <CardDescription>
            <span className="hidden @[540px]/card:block">
              Total dos últimos 3 meses
            </span>
            <span className="@[540px]/card:hidden">Últimos 3 meses</span>
          </CardDescription>
        </div>

        <div className="flex">
          <div className="data-[active=true]:bg-primary/5 relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left sm:border-t-0 sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              Total Geral
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {formatCurrency(totalGeral)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={CHART_CONFIG}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            data={CHART_DATA}
            margin={{ left: 12, right: 12 }}
          >
            <defs>
              <linearGradient id="fillBar" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.8} />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.2} />
              </linearGradient>
            </defs>
            
            <CartesianGrid vertical={false} />
            
            <XAxis
              dataKey="data"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => formatDate(value)}
            />
            
            <ChartTooltip
              cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  formatter={(value) => [
                    formatCurrency(Number(value)),
                    'Ganhos totais',
                  ]}
                  labelFormatter={(value) => formatDate(value, 'long')}
                />
              }
            />
            
            <Bar
              dataKey="total"
              fill="url(#fillBar)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
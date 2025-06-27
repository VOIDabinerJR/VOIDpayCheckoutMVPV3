'use client';

import { IconTrendingUp } from '@tabler/icons-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

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

const paymentHistoryData = [
  { 
    month: 'Jan/24', 
    mpesa: 8500, 
    emola: 3200,
    visa: 800 
  },
  { 
    month: 'Fev/24', 
    mpesa: 12500, 
    emola: 6500,
    visa: 2800 
  },
  { 
    month: 'Mar/24', 
    mpesa: 11000, 
    emola: 6000,
    visa: 2500 
  },
  { 
    month: 'Abr/24', 
    mpesa: 9000, 
    emola: 4500,
    visa: 1700 
  },
  { 
    month: 'Mai/24', 
    mpesa: 18000, 
    emola: 7500,
    visa: 3200 
  },
  { 
    month: 'Jun/24', 
    mpesa: 16000, 
    emola: 8000,
    visa: 2500 
  }
];

const chartConfig = {
  mpesa: {
    label: 'MPesa',
    color: 'var(--primary)'
  },
  emola: {
    label: 'Emola',
    color: 'var(--secondary)'
  },
  visa: {
    label: 'Visa',
    color: 'var(--accent)'
  }
} satisfies ChartConfig;

export function PaymentMethodsAreaChart() {
  return (
    <Card className='@container/card'>
      <CardHeader>
        <CardTitle>Métodos de Pagamento</CardTitle>
        <CardDescription>
          Histórico de vendas por método de pagamento nos últimos 6 meses
        </CardDescription>
      </CardHeader>
      <CardContent className='px-2 pt-4 sm:px-6 sm:pt-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <AreaChart
            data={paymentHistoryData}
            margin={{
              left: 12,
              right: 12,
              top: 12,
              bottom: 12
            }}
          >
            <defs>
              <linearGradient id='fillMpesa' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-mpesa)'
                  stopOpacity={1.0}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-mpesa)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillEmola' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-emola)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-emola)'
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id='fillVisa' x1='0' y1='0' x2='0' y2='1'>
                <stop
                  offset='5%'
                  stopColor='var(--color-visa)'
                  stopOpacity={0.8}
                />
                <stop
                  offset='95%'
                  stopColor='var(--color-visa)'
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey='month'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <YAxis 
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `R$ ${value / 1000}k`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent 
                formatter={(value, name) => {
                  return [`R$ ${value.toLocaleString()}`, 
                    name === 'mpesa' ? 'MPesa' : 
                    name === 'emola' ? 'Emola' : 'Visa'];
                }}
                indicator='dot'
              />}
            />
            <Area
              dataKey='mpesa'
              type='monotone'
              fill='url(#fillMpesa)'
              stroke='var(--color-mpesa)'
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area
              dataKey='emola'
              type='monotone'
              fill='url(#fillEmola)'
              stroke='var(--color-emola)'
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Area
              dataKey='visa'
              type='monotone'
              fill='url(#fillVisa)'
              stroke='var(--color-visa)'
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 leading-none font-medium'>
              Crescimento de 15.2% nos pagamentos por MPesa{' '}
              <IconTrendingUp className='h-4 w-4' />
            </div>
            <div className='text-muted-foreground flex items-center gap-2 leading-none'>
              Janeiro - Junho 2024
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
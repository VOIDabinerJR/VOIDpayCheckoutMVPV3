import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter
} from '@/components/ui/card';
import {
  IconTrendingDown,
  IconTrendingUp,
  IconBell,
  IconInfoCircle
} from '@tabler/icons-react';
import React from 'react';

export default function OverViewLayout({
  sales,
  pie_stats,
  bar_stats,
  area_stats,
  last_payments
}: {
  sales: React.ReactNode;
  pie_stats: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
  last_payments: React.ReactNode;
}) {
  // Simulando dados do usuário (substitua pelos dados reais)
  const userName = 'Abiner Maleiane';
  const notifications = [
    { id: 1, text: 'Novo pedido recebido', time: '10 min atrás' },
    { id: 2, text: 'Pagamento confirmado', time: '1 hora atrás' }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        {/* Cabeçalho com saudação e notificações */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>
              Olá, {userName} 👋
            </h2>
            <p className='text-muted-foreground'>
              Aqui está o resumo do seu negócio
            </p>
          </div>

        
        </div>

        {/* Estatísticas principais */}
        <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4'>
          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Ganhos Mensais</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                5.250 MTn
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +8.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Crescimento este mês <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Comparado ao mês anterior
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Ganhos Anuais</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                2.500 MTn
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +15%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Crescimento anual <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Comparado ao ano anterior
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Pagamentos Pendentes</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                350 MTn
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingDown />
                  -5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Redução em relação ao mês passado{' '}
                <IconTrendingDown className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                12 pedidos aguardando pagamento
              </div>
            </CardFooter>
          </Card>

          <Card className='@container/card'>
            <CardHeader>
              <CardDescription>Checkouts Realizados</CardDescription>
              <CardTitle className='text-2xl font-semibold tabular-nums @[250px]/card:text-3xl'>
                128
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <IconTrendingUp />
                  +22%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex gap-2 font-medium'>
                Aumento nas conversões <IconTrendingUp className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                Taxa de conversão melhorada
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* Gráficos e tabelas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Visão Geral dos Ganhos</CardTitle>
              </CardHeader>
              {bar_stats}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Balanço de Pedidos</CardTitle>
              </CardHeader>
              {pie_stats}
            </Card>
          </div>

          <div className='col-span-4'>
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Vendas</CardTitle>
              </CardHeader>
              {area_stats}
            </Card>
          </div>

          <div className='col-span-4 md:col-span-3'>
            <Card>
              <CardHeader>
                <CardTitle>Tabela de Pedidos Recentes</CardTitle>
              </CardHeader>
              {sales}
            </Card>
          </div>
        </div>

        {last_payments}

        {/* Área de informações úteis */}
        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconInfoCircle className='size-5' /> Informações Úteis
            </CardTitle>
          </CardHeader>
          <div className='grid grid-cols-1 gap-4 px-6 pb-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Dicas de Vendas</h3>
              <p className='text-muted-foreground text-sm'>
                Seus produtos mais vendidos estão com estoque baixo. Considere
                repor.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Suporte Rápido</h3>
              <p className='text-muted-foreground text-sm'>
                Problemas com pagamentos? Contate nosso suporte imediatamente.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Novidades</h3>
              <p className='text-muted-foreground text-sm'>
                Nova atualização disponível! Melhorias no painel de controle.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

import PageContainer from '@/components/layout/page-container';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { IconInfoCircle, IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

export default function AnalyticsPage({
  sales,
  pie_stats2,
  bar_stats,
  area_stats,
  last_payments
}: {
  sales: React.ReactNode;
  pie_stats2: React.ReactNode;
  bar_stats: React.ReactNode;
  area_stats: React.ReactNode;
  last_payments: React.ReactNode;
}) {
  // Dados simulados
  const metrics = [
    {
      title: "VENDAS",
      value: "MZN 1998.00",
      description: "Finalizados",
      trend: "up",
      change: "2.5%"
    },
    {
      title: "RECEITA",
      value: "MZN 122305.83",
      description: "Finalizados",
      trend: "up",
      change: "15.3%"
    },
    {
      title: "TICKET MÉDIO",
      value: "MZN 3195.48",
      description: "Finalizados",
      trend: "down",
      change: "3.2%"
    },
    {
      title: "CONVERSÃO DO CHECKOUT",
      value: "16.90%",
      description: "Finalizados",
      trend: "up",
      change: "1.8%"
    },
    {
      title: "FORMAS DE PAGAMENTO",
      value: "",
      description: "Cartão • Carteira Móvel • Paypal • QR Code",
      trend: null
    },
    {
      title: "TAXA DE PEDIDOS CANCELADOS",
      value: "0.70%",
      description: "Finalizados",
      trend: "down",
      change: "0.3%"
    },
    {
      title: "TOP PRODUTOS",
      value: "dados insuficientes",
      description: "",
      trend: null
    },
    {
      title: "CARRINHOS ABANDONADOS",
      value: "dados insuficientes",
      description: "",
      trend: null
    },
    {
      title: "TAXA DE CLIENTES RECORRENTES",
      value: "dados insuficientes",
      description: "",
      trend: null
    }
  ];

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-6'>
        {/* Cabeçalho */}
        <div className='flex items-center justify-between'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Análise de Desempenho</h2>
            <p className='text-muted-foreground'>
              Seu desempenho nos últimos 30 dias
            </p>
          </div>
        </div>

        {/* Grid de Métricas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
          {metrics.map((metric, index) => (
            <Card key={index} className='hover:shadow-md transition-shadow'>
              <CardHeader>
                <CardTitle className='text-lg'>{metric.title}</CardTitle>
              </CardHeader>
              <CardContent className='mx-auto'>
                  {pie_stats2}
                <div className='flex items-baseline gap-2'>
                 
                  <p className='text-2xl font-bold'>{metric.value}</p>
                  
                  {metric.trend && (
                    <Badge  variant={metric.trend === 'up' ? 'outline' : 'destructive'}>
                      {metric.trend === 'up' ? (
                        <IconTrendingUp className='mr-1 h-4 w-4' />
                      ) : (
                        <IconTrendingDown className='mr-1 h-4 w-4' />
                      )}
                      {metric.change}
                    </Badge>
                  )}
                  
                </div>
                
              </CardContent>
              {metric.description && (
                <CardFooter className='mx-auto text-sm text-muted-foreground'>
                  {metric.description}
                </CardFooter>
              )}
            </Card>
          ))}
        </div>

        {/* Informações Adicionais */}
        <Card className='mt-4'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <IconInfoCircle className='size-5' /> Insights e Recomendações
            </CardTitle>
          </CardHeader>
          <CardContent className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Oportunidades</h3>
              <p className='text-muted-foreground text-sm'>
                Sua taxa de conversão está acima da média do setor. Considere aumentar o investimento em marketing.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Atenção</h3>
              <p className='text-muted-foreground text-sm'>
                O ticket médio diminuiu. Analise suas estratégias de upsell e cross-sell.
              </p>
            </div>
            <div className='rounded-lg border p-4'>
              <h3 className='mb-2 font-medium'>Dados Faltantes</h3>
              <p className='text-muted-foreground text-sm'>
                Configure o rastreamento de carrinhos abandonados para insights valiosos.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
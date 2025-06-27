import PageContainer from '@/components/layout/page-container';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  IconPlus,
  IconArrowUp,
  IconArrowDown,
  IconRefresh
} from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Wallet, Banknote, Receipt } from 'lucide-react';

export const metadata = {
  title: 'Dashboard: Saldos e Transações',
  description: 'Gerencie seus saldos, saques e reembolsos.'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-col space-y-8'>
        <div className='flex items-center justify-between'>
          <Heading
            title='Saldos e Transações'
            description='Gerencie seus saldos, saques e reembolsos.'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={cn(buttonVariants(), 'text-xs md:text-sm')}>
                <IconPlus className='mr-2 h-4 w-4' /> Nova Operação
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/withdraw'
                  className='flex w-full items-center'
                >
                  <IconArrowUp className='mr-2 h-4 w-4' />
                  <span>Solicitar Saque</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Para sua conta
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/refund'
                  className='flex w-full items-center'
                >
                  <IconArrowDown className='mr-2 h-4 w-4' />
                  <span>Reembolsar</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Para o cliente
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/transfer'
                  className='flex w-full items-center'
                >
                  <IconRefresh className='mr-2 h-4 w-4' />
                  <span>Transferência</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Entre contas
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <div className='flex flex-col items-center space-y-2 text-center'>
          <h2 className='text-xl font-bold'>
            Gerencie seu saldo e movimentações
          </h2>
          <p className='text-muted-foreground max-w-2xl'>
            Visualize seu saldo disponível, histórico de transações e realize
            operações financeiras.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              title: 'Solicitar Saque',
              description:
                'Transfira seu saldo disponível para sua conta bancária de forma rápida e segura.',
              details: ['Disponível em 1-2 dias úteis', 'Taxas aplicáveis'],
              button: 'Realizar Saque',
              icon: <IconArrowUp className='mr-2 h-5 w-5' />
            },
            {
              title: 'Realizar Reembolso',
              description:
                'Devolva valores para seus clientes diretamente para o método de pagamento original.',
              details: ['Processamento em até 5 dias', 'Histórico completo'],
              button: 'Iniciar Reembolso',
              icon: <IconArrowDown className='mr-2 h-5 w-5' />
            },
            {
              title: 'Saldo Disponível',
              description:
                'Visualize o valor disponível para saque e o total de suas transações.',
              details: ['Atualizado em tempo real', 'Detalhamento por período'],
              button: 'Ver Detalhes',
              icon: <Wallet className='mr-2 h-5 w-5' />
            },
            {
              title: 'Histórico de Saques',
              description:
                'Acompanhe todas as transferências realizadas para sua conta bancária.',
              details: ['Status de cada operação', 'Comprovantes disponíveis'],
              button: 'Consultar Histórico',
              icon: <Banknote className='mr-2 h-5 w-5' />
            },
            {
              title: 'Transações Recentes',
              description:
                'Visualize todas as entradas e saídas do seu saldo com detalhes completos.',
              details: ['Filtros avançados', 'Exportação de relatórios'],
              button: 'Ver Transações',
              icon: <Receipt className='mr-2 h-5 w-5' />
            },
            {
              title: 'Configurar Conta Bancária',
              description:
                'Adicione ou altere a conta bancária para recebimento de seus saques.',
              details: ['Dados seguros', 'Validação instantânea'],
              button: 'Gerenciar Conta',
              icon: <Wallet className='mr-2 h-5 w-5' />
            }
          ].map((item, index) => (
            <Card key={index} className='flex flex-col shadow-md'>
              <CardHeader className='text-center'>
                <CardTitle className='flex items-center justify-center'>
                  {item.icon}
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col items-center text-center'>
                <div className='mb-4 flex h-40 w-full items-center justify-center rounded-md bg-gray-100 text-gray-400'>
                  Gráfico/Ícone
                </div>
                <p className='text-muted-foreground mb-2 text-sm'>
                  {item.description}
                </p>
                <div className='mt-auto'>
                  {item.details.map((detail, i) => (
                    <p key={i} className='text-muted-foreground text-sm'>
                      {detail}
                    </p>
                  ))}
                </div>
              </CardContent>
              <CardFooter className='flex justify-center'>
                <Button className='w-full max-w-xs'>{item.button}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}

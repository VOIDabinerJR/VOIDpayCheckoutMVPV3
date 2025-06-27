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
import { IconPlus, IconFileInvoice } from '@tabler/icons-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { CalendarCheck, CreditCard, LinkIcon } from 'lucide-react';

export const metadata = {
  title: 'Dashboard: Transações',
  description: 'Escolha como começar a receber pagamentos.'
};

export default function Page() {
  return (
    <PageContainer>
      <div className='flex flex-col space-y-8'>
        <div className='flex items-center justify-between'>
          <Heading
            title='Transações'
            description='Escolha como começar a receber pagamentos.'
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className={cn(buttonVariants(), 'text-xs md:text-sm')}>
                <IconPlus className='mr-2 h-4 w-4' /> Criar Pagamento
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end'>
              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/invoices/new'
                  className='flex w-full items-center'
                >
                  <IconFileInvoice className='mr-2 h-4 w-4' />
                  <span>Fatura</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Cliente específico
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/payments-links/new'
                  className='flex w-full items-center'
                >
                  <LinkIcon className='mr-2 h-4 w-4' />
                  <span>Link de pagamento</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Qualquer pessoa
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/subscriptions/new'
                  className='flex w-full items-center'
                >
                  <CalendarCheck className='mr-2 h-4 w-4' />
                  <span>Assinatura</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Cliente específico
                  </span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer'>
                <Link
                  href='/apps/123/dashboard/transactions/payments/new'
                  className='flex w-full items-center'
                >
                  <CreditCard className='mr-2 h-4 w-4' />
                  <span>Pagamento manual</span>
                  <span className='text-muted-foreground ml-auto text-xs'>
                    Dados do cartão
                  </span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <Separator />

        <div className='flex flex-col items-center space-y-2 text-center'>
          <h2 className='text-xl font-bold'>
            Escolha como começar a receber pagamentos
          </h2>
          <p className='text-muted-foreground max-w-2xl'>
            Comece já com uma opção no-code ou explore as IUs personalizáveis
            que integram as nossas APIs.
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {[
            {
              title: 'Enviar uma fatura ao cliente',
              description:
                'Receba pagamentos pontuais ou recorrentes de clientes específicos com conciliação automatizada.',
              details: ['Configure em 1 minuto', 'Não é preciso programar'],
              button: 'Criar fatura'
            },
            {
              title: 'Compartilhe um link para uma página de checkout',
              description:
                'Venda um produto ou assinatura ou aceite uma doação compartilhando um link para uma página de pagamento.',
              details: ['Configure em 1 minuto', 'Não é preciso programar'],
              button: 'Criar um link de pagamento'
            },
            {
              title: 'Criar uma IU de pagamentos personalizada',
              description:
                'Aceite pagamentos no seu site e aplicativo móvel ao integrar nossos componentes de IU modulares com estilização em nível de CSS.',
              details: ['O código é obrigatório'],
              button: 'Saiba mais sobre o Elements'
            },
            {
              title: 'Use um formulário de pagamento pré-configurado',
              description:
                'Integre um formulário de checkout otimizado para conversão diretamente no seu site ou redirecione para uma página hospedada pela Stripe.',
              details: ['Low-code'],
              button: 'Saiba mais sobre o Checkout'
            },
            {
              title: 'Cobre os clientes pessoalmente',
              description:
                'Integre as nossas máquinas de cartão para aceitar pagamentos presenciais e levar a Stripe para o seu ponto de venda.',
              details: ['O código é obrigatório'],
              button: 'Saiba mais sobre o Terminal'
            },
            {
              title: 'Cobre um cliente de forma manual',
              description:
                'Crie um pagamento no Dashboard inserindo manualmente os dados do cartão do cliente.',
              details: ['Configure em 1 minuto', 'Não é preciso programar'],
              button: 'Criar pagamento'
            }
          ].map((item, index) => (
            <Card key={index} className='flex flex-col shadow-md'>
              <CardHeader className='text-center'>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className='flex flex-1 flex-col items-center text-center'>
                <div className='mb-4 flex h-64 w-full items-center justify-center rounded-md bg-gray-100 text-gray-400'>
                  Pré-visualização
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

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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import PaymentButtonModal from '@/features/payments/components/payment-button-modal';
import PaymentButtonsListingPage from '@/features/payments/components/payment-buttons-list';

import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import {
  IconKey,
  IconPlus,
  IconShieldLock,
  IconWebhook,
  IconSettings,
  IconRobot,
  IconRefresh,
  IconLink
} from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Botões de Pagamento',
  description: 'Gerencie seus botões de pagamento'
};

type pageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Page(props: pageProps) {
  const searchParams = await props.searchParams;
  searchParamsCache.parse(searchParams);

  return (
    <PageContainer>
      <div className='flex flex-1 flex-col space-y-4'>
        <div className='flex items-start justify-between'>
          <div>
            <Heading
              title='Botões de Pagamento'
              description='Crie e gerencie botões de pagamento para seus clientes.'
            />
          </div>
          <div className='flex gap-2'>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'text-xs md:text-sm'
                  )}
                >
                  <IconSettings className='mr-2 h-4 w-4' /> Configurações
                </button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='flex items-center gap-2'>
                    <IconSettings className='text-primary h-5 w-5' />
                    Configurações de Pagamento
                  </DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex items-center justify-between space-x-4'>
                    <Label
                      htmlFor='notifications'
                      className='flex flex-col space-y-1'
                    >
                      <span>Notificações</span>
                      <span className='text-muted-foreground font-normal'>
                        Receber notificações de novos pagamentos
                      </span>
                    </Label>
                    <Switch id='notifications' defaultChecked />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='webhook'>URL de Webhook</Label>
                    <Input
                      id='webhook'
                      placeholder='https://seusite.com/webhook'
                    />
                    <p className='text-muted-foreground text-xs'>
                      Receba atualizações em tempo real sobre pagamentos
                    </p>
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='default-amount'>Valor Padrão (MTn)</Label>
                    <Input
                      id='default-amount'
                      type='number'
                      placeholder='500'
                    />
                    <p className='text-muted-foreground text-xs'>
                      Valor sugerido para novos botões de pagamento
                    </p>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button variant='outline'>Cancelar</Button>
                  <Button>Salvar Configurações</Button>
                </div>
              </DialogContent>
            </Dialog>

            <PaymentButtonModal>
              <button
                className={cn(
                  buttonVariants({ variant: 'default' }),
                  'text-xs md:text-sm'
                )}
              >
                <IconPlus className='mr-2 h-4 w-4' /> Novo Botão
              </button>
            </PaymentButtonModal>
          </div>
        </div>
        <Separator />

        {/* Linha de Cartões de Estatísticas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Botões Ativos</h3>
            <p className='text-2xl font-bold'>24</p>
            <p className='text-muted-foreground text-xs'>Botões disponíveis</p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Pagamentos Hoje</h3>
            <p className='text-2xl font-bold'>18</p>
            <p className='text-muted-foreground text-xs'>
              +2 em relação a ontem
            </p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Taxa de Conversão</h3>
            <p className='text-2xl font-bold'>68%</p>
            <p className='text-muted-foreground text-xs'>
              Cliques que resultam em pagamento
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <DataTableSkeleton columnCount={6} rowCount={8} filterCount={3} />
          }
        >
          <PaymentButtonsListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

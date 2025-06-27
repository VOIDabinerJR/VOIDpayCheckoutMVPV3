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
import RefundModal from '@/features/finance/components/refund-modal';
import RefundsListingPage from '@/features/finance/components/refunds-list';

import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import {
  IconKey,
  IconPlus,
  IconShieldLock,
  IconWebhook,
  IconSettings,
  IconRobot,
  IconRefresh
} from '@tabler/icons-react';
import Link from 'next/link';
import { SearchParams } from 'nuqs/server';
import { Suspense } from 'react';

export const metadata = {
  title: 'Dashboard: Reembolsos',
  description: 'Gerencie seus reembolsos'
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
              title='Reembolsos'
              description='Gerencie solicitações de reembolso para seus clientes.'
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
                    <IconShieldLock className='text-primary h-5 w-5' />
                    Configurações de Reembolso
                  </DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex items-center justify-between space-x-4'>
                    <Label
                      htmlFor='auto-refund'
                      className='flex flex-col space-y-1'
                    >
                      <span>Reembolsos Automáticos</span>
                      <span className='text-muted-foreground font-normal'>
                        Ative para processar reembolsos automaticamente
                      </span>
                    </Label>
                    <Switch id='auto-refund' />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='max-days'>Prazo Máximo (dias)</Label>
                    <Input id='max-days' type='number' placeholder='30' />
                    <p className='text-muted-foreground text-xs'>
                      Período máximo para solicitação de reembolso
                    </p>
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='refund-percentage'>
                      Porcentagem Máxima
                    </Label>
                    <Input
                      id='refund-percentage'
                      type='number'
                      min='0'
                      max='100'
                      placeholder='100'
                    />
                    <p className='text-muted-foreground text-xs'>
                      Porcentagem máxima do valor que pode ser reembolsada
                    </p>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button variant='outline'>Cancelar</Button>
                  <Button>Salvar Configurações</Button>
                </div>
              </DialogContent>
            </Dialog>

            <RefundModal>
              <button
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-xs md:text-sm'
                )}
              >
                <IconPlus className='mr-2 h-4 w-4' /> Novo Reembolso
              </button>
            </RefundModal>
          </div>
        </div>
        <Separator />

        {/* Linha de Cartões de Estatísticas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Reembolsos Pendentes</h3>
            <p className='text-2xl font-bold'>5</p>
            <p className='text-muted-foreground text-xs'>
              Solicitações para processar
            </p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Valor Total</h3>
            <p className='text-2xl font-bold'>7.500 MTn</p>
            <p className='text-muted-foreground text-xs'>Em reembolsos</p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Tempo Médio</h3>
            <p className='text-2xl font-bold'>2 dias</p>
            <p className='text-muted-foreground text-xs'>Para processamento</p>
          </div>
        </div>

        <Suspense
          fallback={
            <DataTableSkeleton columnCount={6} rowCount={8} filterCount={3} />
          }
        >
          <RefundsListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

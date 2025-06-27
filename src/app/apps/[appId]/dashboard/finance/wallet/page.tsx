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
import WithdrawalModal from '@/features/finance/components/withdrawals-modal';
import WithdrawalsListingPage from '@/features/finance/components/withdrawals-list';

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
  title: 'Dashboard: Links de Pagamento',
  description: 'Gerencie seus links de pagamento '
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
              title='Saldo & Saques'
              description='Controle seus saldos e saques.'
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
                  <IconRefresh className='mr-2 h-4 w-4' /> Saque Automático
                </button>
              </DialogTrigger>
              <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                  <DialogTitle className='flex items-center gap-2'>
                    <IconRobot className='text-primary h-5 w-5' />
                    Configurar Saque Automático
                  </DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                  <div className='flex items-center justify-between space-x-4'>
                    <Label
                      htmlFor='auto-withdrawal'
                      className='flex flex-col space-y-1'
                    >
                      <span>Habilitar Saque Automático</span>
                      <span className='text-muted-foreground font-normal'>
                        Ative para sacar automaticamente conforme suas regras
                      </span>
                    </Label>
                    <Switch id='auto-withdrawal' />
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='min-amount'>Valor Mínimo (MTn)</Label>
                    <Input id='min-amount' type='number' placeholder='500' />
                    <p className='text-muted-foreground text-xs'>
                      Saque será acionado quando seu saldo atingir este valor
                    </p>
                  </div>

                  <div className='grid gap-2'>
                    <Label htmlFor='withdrawal-day'>Dia do Saque</Label>
                    <Input
                      id='withdrawal-day'
                      type='number'
                      min='1'
                      max='28'
                      placeholder='Dia do mês'
                    />
                    <p className='text-muted-foreground text-xs'>
                      Dia preferencial para processar saques automáticos
                    </p>
                  </div>
                </div>
                <div className='flex justify-end gap-2'>
                  <Button variant='outline'>Cancelar</Button>
                  <Button>Salvar Configurações</Button>
                </div>
              </DialogContent>
            </Dialog>

            <WithdrawalModal>
              <button
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-xs md:text-sm'
                )}
              >
                <IconPlus className='mr-2 h-4 w-4' /> Solicitar Saque
              </button>
            </WithdrawalModal>
          </div>
        </div>
        <Separator />

        {/* Linha de Cartões de Estatísticas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Saldo Disponivel</h3>
            <p className='text-2xl font-bold'>15.500 MTn</p>
            <p className='text-muted-foreground text-xs'>
              Valor para saque imediato
            </p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Pendente</h3>
            <p className='text-2xl font-bold'>2.500 MTn</p>
            <p className='text-muted-foreground text-xs'>A liberar em 7 dias</p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Taxa de Sucesso</h3>
            <p className='text-2xl font-bold'>92%</p>
            <p className='text-muted-foreground text-xs'>
              Melhor que semana passada
            </p>
          </div>
        </div>

        <Suspense
          fallback={
            <DataTableSkeleton columnCount={6} rowCount={8} filterCount={3} />
          }
        >
          <WithdrawalsListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

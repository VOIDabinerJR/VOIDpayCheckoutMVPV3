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

import { Separator } from '@/components/ui/separator';
import { DataTableSkeleton } from '@/components/ui/table/data-table-skeleton';
import AppCredentialsModal from '@/features/apps/components/app-credentials-modal';
import AppsListingPage from '@/features/apps/components/app-listing';

import { searchParamsCache, serialize } from '@/lib/searchparams';
import { cn } from '@/lib/utils';
import {
  IconKey,
  IconPlus,
  IconShieldLock,
  IconWebhook
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
              title='Links de pagamento'
              description='Gerencie seus links de pagamento e produtos'
            />
          </div>
          <div className='flex gap-2'>
            <AppCredentialsModal>
              <button
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'text-xs md:text-sm'
                )}
              >
                <IconKey className='mr-2 h-4 w-4' /> Documentação da API
              </button>
            </AppCredentialsModal>
            <Link
              href='/apps/123/dashboard/transactions/payment-links/new'
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <IconPlus className='mr-2 h-4 w-4' /> Criar Link
            </Link>
          </div>
        </div>
        <Separator />

        {/* Linha de Cartões de Estatísticas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Links Ativos</h3>
            <p className='text-2xl font-bold'>12</p>
            <p className='text-muted-foreground text-xs'>+2 este mês</p>
          </div>
        </div>

        {/* <Card className='border-muted bg-background text-foreground mx-auto w-full max-w-sm border'>
          <CardHeader>
            <CardTitle>Adicionar Produto</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='flex flex-col gap-4'>
              <div className='grid gap-1'>
                <Label htmlFor='productName'>Nome do Produto</Label>
                <Input id='productName' placeholder='Nome do produto' />
              </div>
              <div className='grid gap-1'>
                <Label htmlFor='quantity'>Quantidade</Label>
                <Input id='quantity' type='number' placeholder='0' />
              </div>
              <div className='grid gap-1'>
                <Label htmlFor='price'>Preço</Label>
                <Input
                  id='price'
                  type='number'
                  step='0.01'
                  placeholder='0.00'
                />
              </div>
              <div className='grid gap-1'>
                <Label htmlFor='file'>Imagem do Produto</Label>
                <Input id='file' type='file' />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button type='submit' className='w-full'>
              Gerar
            </Button>
          </CardFooter>
        </Card> */}

        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={6}
              rowCount={8}
              filterCount={3}
              //   filterPlaceholders={['Pesquisar aplicativos...', 'Status', 'Ambiente']}
            />
          }
        >
          <AppsListingPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

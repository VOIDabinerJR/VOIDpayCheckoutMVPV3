import PageContainer from '@/components/layout/page-container';
import { buttonVariants } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
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
  title: 'Dashboard: Aplicativos & Credenciais'
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
              title='Aplicativos & Credenciais'
              description='Gerencie suas integrações de gateway de pagamento e credenciais de API'
            />
            <div className='mt-2 flex gap-2'>
              <span className='text-muted-foreground inline-flex items-center gap-1 text-xs'>
                <IconShieldLock className='h-3 w-3' /> Conexão segura
              </span>
              <span className='text-muted-foreground inline-flex items-center gap-1 text-xs'>
                <IconWebhook className='h-3 w-3' /> Webhook configurado
              </span>
            </div>
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
              href='/apps/123/dashboard/apps/new'
              className={cn(buttonVariants(), 'text-xs md:text-sm')}
            >
              <IconPlus className='mr-2 h-4 w-4' /> Novo Aplicativo
            </Link>
          </div>
        </div>
        <Separator />

        {/* Linha de Cartões de Estatísticas */}
        <div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Aplicativos Ativos</h3>
            <p className='text-2xl font-bold'>12</p>
            <p className='text-muted-foreground text-xs'>+2 este mês</p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Requisições de API</h3>
            <p className='text-2xl font-bold'>1.2M</p>
            <p className='text-muted-foreground text-xs'>
              98% de taxa de sucesso
            </p>
          </div>
          <div className='rounded-lg border p-4'>
            <h3 className='text-sm font-medium'>Credenciais Expirando</h3>
            <p className='text-2xl font-bold'>3</p>
            <p className='text-muted-foreground text-xs'>
              nos próximos 30 dias
            </p>
          </div>
        </div>

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

// src/app/apps/page.tsx
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  IconPlus,
  IconSettingsAutomation,
  IconArrowRight,
  IconMoneybag,
  IconApps
} from '@tabler/icons-react';
import { getApplications, App } from '@/features/apps/api';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard : Aplicações'
};

export default async function AppsPage() {
  const apps = await getApplications();

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-bold'>Aplicações</h1>
        <Button>
          <IconPlus className='mr-2 h-4 w-4' />
          Criar aplicação
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </div>
  );
}

function AppCard({ app }: { app: App }) {
  return (
    <Card className='transition-shadow hover:shadow-md'>
      <div className='p-6'>
        <div className='flex items-start space-x-4'>
          <div className='bg-muted flex h-12 w-12 items-center justify-center rounded-md'>
            <IconApps className='h-6 w-6' />
          </div>
          <div className='flex-1 space-y-2'>
            <div className='flex items-center justify-between'>
              <h3 className='font-medium'>{app.name}</h3>
              <Badge variant='outline' className='text-xs'>
                {app.plan}
              </Badge>
            </div>
            <p className='text-muted-foreground text-sm'>{app.domain}</p>

            <div className='flex items-center space-x-2 text-sm'>
              {app.environment === 'production' ? (
                <Badge variant='outline' className='px-1.5 py-0.5 text-xs'>
                  Produção
                </Badge>
              ) : (
                <span className='text-muted-foreground text-xs'>
                  Ambiente não é de produção
                </span>
              )}
            </div>

            <p className='text-muted-foreground text-xs'>
              Atualizado {formatDistanceToNow(new Date(app.updatedAt))} atrás
            </p>
          </div>
        </div>

        <div className='mt-4 flex justify-end'>
          <Button variant='outline' size='sm' className='text-sm' asChild>
            <Link href={`/apps/123/dashboard`} className='flex items-center'>
              Ir para aplicação
              <IconArrowRight className='ml-1 h-3 w-3' />
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
}

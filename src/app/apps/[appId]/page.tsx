'use client'; // Adicione esta linha no topo do arquivo

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
import { cn } from '@/lib/utils';
import {
  IconKey,
  IconPlus,
  IconShieldLock,
  IconWebhook,
  IconSettings,
  IconRobot,
  IconRefresh,
  IconEye,
  IconEyeOff,
  IconCopy,
  IconTrash
} from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react'; // Importe useState do react

import KBar from '@/components/kbar';
import AppSidebar from '@/components/layout/app-sidebar';
import Header from '@/components/layout/header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import type { Metadata } from 'next';

// export const metadata = {
//   title: 'Dashboard: Configurações da Aplicação',
//   description: 'Gerencie as configurações e credenciais da sua aplicação'
// };

type PageProps = {
  params: {
    appId: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export default async function Page({ params }: PageProps) {
  // Dados mockados da aplicação - substituir por dados reais da API
  const appDetails = {
    name: 'Minha Aplicação',
    type: 'Integração',
    clientId: 'client_123456789',
    secret: 'sec_987654321',
    createdDate: '2023-10-15'
  };
  const defaultOpen = true;
  const [showSecret, setShowSecret] = useState(false);

  return (
    <KBar>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <SidebarInset>
          <Header />
          <PageContainer >
            <div className='flex flex-1 flex-col space-y-4'>
              <div className='flex items-start justify-between'>
                <div>
                  <Heading
                    title='Configurações da Aplicação'
                    description={`Gerencie as credenciais e configurações da aplicação ${params.appId}`}
                  />
                </div>
                <div className='flex gap-2'>
                  <Button variant='outline' className='text-xs md:text-sm'>
                    <IconRefresh className='mr-2 h-4 w-4' /> Rotacionar
                    Credenciais
                  </Button>
                </div>
              </div>
              <Separator />

              {/* Seção de Detalhes da Aplicação */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <IconSettings className='text-primary h-5 w-5' />
                    Informações da Aplicação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid gap-4 md:grid-cols-2'>
                    <div className='space-y-2'>
                      <Label>Nome da Aplicação</Label>
                      <Input value={appDetails.name} readOnly />
                    </div>
                    <div className='space-y-2'>
                      <Label>Tipo</Label>
                      <Input value={appDetails.type} readOnly />
                    </div>
                    <div className='space-y-2'>
                      <Label>Client ID</Label>
                      <div className='flex gap-2'>
                        <Input value={appDetails.clientId} readOnly />
                        <Button variant='outline' size='icon'>
                          <IconCopy className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <Label>Client Secret</Label>
                      <div className='flex gap-2'>
                        <Input
                          value={
                            showSecret ? appDetails.secret : '••••••••••••'
                          }
                          type={showSecret ? 'text' : 'password'}
                          readOnly
                        />
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => setShowSecret(!showSecret)}
                        >
                          {showSecret ? (
                            <IconEyeOff className='h-4 w-4' />
                          ) : (
                            <IconEye className='h-4 w-4' />
                          )}
                        </Button>
                        <Button variant='outline' size='icon'>
                          <IconCopy className='h-4 w-4' />
                        </Button>
                      </div>
                      <p className='text-muted-foreground text-xs'>
                        Criado em: {appDetails.createdDate}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Seção de Configurações de Segurança */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <IconShieldLock className='text-primary h-5 w-5' />
                    Segurança
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='flex items-center justify-between space-x-4'>
                      <Label htmlFor='2fa' className='flex flex-col space-y-1'>
                        <span>Autenticação de Dois Fatores</span>
                        <span className='text-muted-foreground font-normal'>
                          Requer verificação adicional para acessar esta
                          aplicação
                        </span>
                      </Label>
                      <Switch id='2fa' />
                    </div>

                    <div className='flex items-center justify-between space-x-4'>
                      <Label
                        htmlFor='ip-restriction'
                        className='flex flex-col space-y-1'
                      >
                        <span>Restrição de IP</span>
                        <span className='text-muted-foreground font-normal'>
                          Permitir acesso apenas de endereços IP específicos
                        </span>
                      </Label>
                      <Switch id='ip-restriction' />
                    </div>

                    {true && (
                      <div className='space-y-2'>
                        <Label>Endereços IP Permitidos</Label>
                        <Input placeholder='192.168.1.1, 10.0.0.1' />
                        <p className='text-muted-foreground text-xs'>
                          Separe múltiplos IPs com vírgulas
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className='flex justify-end'>
                  <Button>Salvar Configurações</Button>
                </CardFooter>
              </Card>

              {/* Seção de Webhooks */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <IconWebhook className='text-primary h-5 w-5' />
                    Configurações de Webhook
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    <div className='space-y-2'>
                      <Label>URL de Webhook</Label>
                      <Input placeholder='https://seusite.com/api/webhook' />
                    </div>

                    <div className='space-y-2'>
                      <Label>Secret do Webhook</Label>
                      <div className='flex gap-2'>
                        <Input
                          value={showSecret ? 'whsec_123456' : '••••••••••••'}
                          type={showSecret ? 'text' : 'password'}
                        />
                        <Button
                          variant='outline'
                          size='icon'
                          onClick={() => setShowSecret(!showSecret)}
                        >
                          {showSecret ? (
                            <IconEyeOff className='h-4 w-4' />
                          ) : (
                            <IconEye className='h-4 w-4' />
                          )}
                        </Button>
                        <Button variant='outline' size='icon'>
                          <IconCopy className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>

                    <div className='flex items-center justify-between space-x-4'>
                      <Label
                        htmlFor='webhook-enabled'
                        className='flex flex-col space-y-1'
                      >
                        <span>Webhook Ativo</span>
                        <span className='text-muted-foreground font-normal'>
                          Habilitar recebimento de eventos via webhook
                        </span>
                      </Label>
                      <Switch id='webhook-enabled' />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className='flex justify-between'>
                  <Button variant='destructive'>
                    <IconTrash className='mr-2 h-4 w-4' /> Remover Webhook
                  </Button>
                  <Button>Salvar Configurações</Button>
                </CardFooter>
              </Card>
            </div>
          </PageContainer>
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  );
}

import PageContainer from '@/components/layout/page-container';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { IconKey, IconShieldLock, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata = {
  title: 'Instalar Checkout Transparente VOIDpay',
  description: 'Configure o checkout transparente na sua loja Shopify',
};

export default function Page() {
  return (
    <PageContainer  >
      <div className='flex flex-1 flex-col space-y-6'>
        <div className='flex items-start justify-between'>
          <div>
            <Heading
              title='Instalar Checkout Transparente VOIDpay'
              description='Configure o aplicativo na sua loja Shopify'
            />
            <div className='mt-2 flex gap-2'>
              <span className='text-muted-foreground inline-flex items-center gap-1 text-xs'>
                <IconShieldLock className='h-3 w-3' /> Conexão segura
              </span>
            </div>
          </div>
          <Link
            href="#"
            className={cn(buttonVariants({ variant: 'outline' }), 'text-xs md:text-sm')}
          >
            <IconInfoCircle className='mr-2 h-4 w-4' /> Documentação
          </Link>
        </div>
        <Separator />

        <Card className="w-full max-w-3xl mx-auto border border-muted bg-background">
          <CardHeader>
            <CardTitle>Credenciais da Shopify</CardTitle>
            <p className="text-sm text-muted-foreground">
              Insira as informações disponíveis no site do aplicativo
            </p>
          </CardHeader>
          <CardContent>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="shopUrl">URL original da sua loja Shopify</Label>
                  <Input 
                    id="shopUrl" 
                    defaultValue="u79445-6d.anyshopify.com" 
                    placeholder="sualoja.myshopify.com" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiToken">Token de acordo da API da Shopify</Label>
                  <Input 
                    id="apiToken" 
                    defaultValue="alpax_37446e720b0e9f4c8beo13a4d81917" 
                    placeholder="Insira o token da API" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="apiKey">Chave de API da Shopify</Label>
                  <Input 
                    id="apiKey" 
                    defaultValue="7x213x276c58b0c423293151a61827aeb" 
                    placeholder="Insira a chave de API" 
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="apiSecret">Chave secreta da API da Shopify</Label>
                  <Input 
                    id="apiSecret" 
                    defaultValue="4172685893a1a5b9e88ec610712478" 
                    placeholder="Insira a chave secreta" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="voidpayToken">Token de botão VOIDpay</Label>
                  <Input 
                    id="voidpayToken" 
                    defaultValue="VOLD-04tc68v0952-4736-8c35-a50cb503800" 
                    placeholder="Insira o token VOIDpay" 
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="webhookUrl">URL de Webhook (Opcional)</Label>
                  <Input 
                    id="webhookUrl" 
                    placeholder="https://sualoja.com/webhook" 
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between border-t pt-4">
            <Link href="#" className={buttonVariants({ variant: 'ghost' })}>
              Cancelar
            </Link>
            <Button className="bg-primary hover:bg-primary/90">
             Salvar 
            </Button>
          </CardFooter>
        </Card>

       
      </div>
    </PageContainer>
  );
}
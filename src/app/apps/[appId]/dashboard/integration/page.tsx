'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Server, ShoppingCart, Mail, ClipboardCheck } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import * as React from 'react';

export default function IntegrationPage() {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  const integrationSteps = [
    {
      title: '1. Configuração Inicial',
      description:
        'Complete seu cadastro e crie um aplicativo no painel VoidPay',
      icon: <ClipboardCheck className='h-5 w-5' />
    },
    {
      title: '2. Obtenha suas credenciais',
      description: 'Acesse seu Client ID e Button Token no painel',
      icon: <Mail className='h-5 w-5' />
    },
    {
      title: '3. Escolha seu método de integração',
      description: 'Selecione abaixo a forma como deseja integrar',
      icon: <Code className='h-5 w-5' />
    }
  ];

  return (
    <div className='mx-auto w-full max-w-[85%]'>
      <PageContainer>
        <div className='flex flex-col space-y-8'>
          {/* Header */}
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>
              Integração com VoidPay
            </h1>
            <p className='text-muted-foreground mt-2'>
              Siga estes passos simples para integrar pagamentos em seu site
            </p>
          </div>

          {/* Progress and Steps */}
          <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Seu progresso</CardTitle>
                <Progress value={progress} className='mt-4' />
              </CardHeader>
              <CardContent className='space-y-4'>
                {integrationSteps.map((step, index) => (
                  <div
                    key={index}
                    className='hover:bg-muted/50 flex items-start gap-4 rounded-lg p-3 transition-colors'
                  >
                    <div className='bg-primary/10 text-primary rounded-full p-2'>
                      {step.icon}
                    </div>
                    <div>
                      <h3 className='font-medium'>{step.title}</h3>
                      <p className='text-muted-foreground text-sm'>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Start Card */}
            <Card>
              <CardHeader>
                <CardTitle>Comece rápido</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <Button variant='outline' className='w-full'>
                  Baixar Exemplo Completo
                </Button>
                <Button variant='outline' className='w-full'>
                  Ver Tutorial em Vídeo
                </Button>
                <Button className='w-full'>Acessar Painel VoidPay</Button>
                <div className='text-muted-foreground mt-4 text-xs'>
                  <p>
                    Recomendamos criar um app de teste no modo sandbox antes de
                    ir para produção.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Options */}
          <div>
            <h2 className='mb-6 text-2xl font-bold tracking-tight'>
              Métodos de Integração
            </h2>

            <Tabs defaultValue='html' className='w-full'>
              <TabsList className='grid w-full grid-cols-4'>
                <TabsTrigger value='html'>HTML</TabsTrigger>
                <TabsTrigger value='node'>Node.js</TabsTrigger>
                <TabsTrigger value='php'>PHP</TabsTrigger>
                <TabsTrigger value='ecommerce'>E-commerce</TabsTrigger>
              </TabsList>

              <TabsContent value='html'>
                <Card className='mt-4'>
                  <CardContent className='space-y-6 p-6'>
                    <div>
                      <h3 className='mb-2 font-semibold'>
                        Integração Frontend (HTML)
                      </h3>
                      <p className='text-muted-foreground text-sm'>
                        Adicione o botão de pagamento diretamente em sua página
                        HTML.
                      </p>
                    </div>

                    <div className='space-y-4'>
                      <div>
                        <h4 className='mb-2 font-medium'>
                          1. Adicione o container do botão
                        </h4>
                        <pre className='bg-muted overflow-x-auto rounded p-4 text-sm'>
                          {`<div id="void-button-container" 
  buttonToken="SEU_TOKEN_DO_BOTAO_AQUI">
</div>`}
                        </pre>
                      </div>

                      <div>
                        <h4 className='mb-2 font-medium'>
                          2. Inclua o script VoidPay
                        </h4>
                        <pre className='bg-muted overflow-x-auto rounded p-4 text-sm'>
                          {`<script 
  src="https://voidpay.com/sdk/js?clientId=SEU_CLIENT_ID&channel=oneway">
</script>`}
                        </pre>
                      </div>

                      <div>
                        <h4 className='mb-2 font-medium'>
                          3. Estrutura do produto (opcional)
                        </h4>
                        <pre className='bg-muted overflow-x-auto rounded p-4 text-sm'>
                          {`<div class="product-item">
  <img class="image-item" src="produto.jpg">
  <div class="name-item">Nome do Produto</div>
  <div class="quantity-item">1</div>
  <div class="price-item">1000</div>
</div>`}
                        </pre>
                      </div>
                    </div>

                    <div className='border-l-4 border-yellow-400 bg-yellow-50 p-4'>
                      <div className='flex'>
                        <div className='ml-3'>
                          <p className='text-sm text-yellow-700'>
                            <strong>Importante:</strong> Substitua
                            SEU_TOKEN_DO_BOTAO_AQUI e SEU_CLIENT_ID pelas
                            credenciais do seu painel VoidPay. Use
                            channel=oneway para pagamentos simples.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='node'>
                <Card className='mt-4'>
                  <CardContent className='space-y-4 p-6'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                      <Server className='h-12 w-12 text-green-600' />
                      <h3 className='text-xl font-semibold'>
                        Integração com Node.js
                      </h3>
                      <p className='text-muted-foreground'>
                        Documentação completa para integração backend com
                        Node.js
                      </p>
                      <Button variant='outline'>
                        Ver Documentação Node.js
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='php'>
                <Card className='mt-4'>
                  <CardContent className='space-y-4 p-6'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                      <Server className='h-12 w-12 text-blue-600' />
                      <h3 className='text-xl font-semibold'>
                        Integração com PHP
                      </h3>
                      <p className='text-muted-foreground'>
                        Documentação completa para integração backend com PHP
                      </p>
                      <Button variant='outline'>Ver Documentação PHP</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value='ecommerce'>
                <Card className='mt-4'>
                  <CardContent className='space-y-4 p-6'>
                    <div className='flex flex-col items-center gap-4 text-center'>
                      <ShoppingCart className='h-12 w-12 text-purple-600' />
                      <h3 className='text-xl font-semibold'>
                        Plugins para E-commerce
                      </h3>
                      <p className='text-muted-foreground'>
                        Integração com WooCommerce, Shopify, WordPress e outras
                        plataformas
                      </p>
                      <Button variant='outline'>Ver Plugins Disponíveis</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Important Notes */}
          <Card className='border-destructive/20 bg-destructive/5'>
            <CardContent className='p-6'>
              <h3 className='text-destructive mb-2 font-semibold'>Atenção</h3>
              <ul className='text-destructive/80 space-y-2 text-sm'>
                <li>
                  • Leia atentamente as políticas de pagamento antes de iniciar
                </li>
                <li>• No modo sandbox, nenhum valor real será transferido</li>
                <li>
                  • Você tem 4 horas para validar cada pedido após o pagamento
                </li>
                <li>
                  • Pedidos não validados serão automaticamente reembolsados
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </PageContainer>
    </div>
  );
}

'use client';

import PageContainer from '@/components/layout/page-container';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import * as React from 'react';
import { Code, Server, ShoppingCart } from 'lucide-react';
import { Progress } from "@/components/ui/progress";


export default function PaymentSetupPage() {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const [progress, setProgress] = React.useState(13)
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)
    return () => clearTimeout(timer)
  }, [])

  const userName = 'Abiner Maleiane';
  const notifications = [
    { id: 1, text: 'Novo pedido recebido', time: '10 min atrás' },
    { id: 2, text: 'Pagamento confirmado', time: '1 hora atrás' }
  ];

  return (
    <div className="mx-auto w-full max-w-[85%]">
      <PageContainer>
        <div className="flex flex-col space-y-8">
          {/* Etapas do processo */}
          <div className='flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Olá, {userName} 👋
              </h2>
            

            </div>


          </div>

          <div className='grid grid-cols-1 gap-6 lg:grid-cols-7   '>
            {/* Vídeo - Lado Esquerdo */}
            <div className='lg:col-span-4'>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <iframe
                  className="absolute h-full w-full"
                  src="https://www.youtube.com/embed/noVVc7dfF24?si=gki06Bt5nLPNIMI4"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Card - Lado Direito */}
            <div className='lg:col-span-3'>
              <Card className="h-full">
                <CardHeader className="flex flex-col items-center space-y-2">
                  <CardTitle className="text-center text-lg">Para começar</CardTitle>
                  <Progress value={progress} className="w-[80%]" />
                </CardHeader>

                <CardContent>
                  <div className='space-y-4 '>
                    <div className='rounded-lg border p-4 bg-muted/50 transition-colors duration-200 hover:bg-primary/10 cursor-pointer'>
                      <p className='text-muted-foreground text-sm'>
                        <span >1.</span> Primeiro, conclua seu cadastro.
                      </p>
                    </div>

                    <div className='rounded-lg border p-4 bg-muted/50 transition-colors duration-200 hover:bg-primary/10 cursor-pointer'>
                      <p className='text-muted-foreground text-sm'>
                        <span >2.</span> Crie um aplicativo para gerir botões.
                      </p>
                    </div>

                    <div className='rounded-lg border p-4 bg-muted/50 transition-colors duration-200 hover:bg-primary/10 cursor-pointer'>
                      <p className='text-muted-foreground text-sm'>
                        <span >3.</span> Configure um botão de pagamento personalizado.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>


          {/* Separador com texto */}

          <div className='flex items-center justify-between '>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Pronto! Agora integre
              </h2>

            </div>


          </div>

          {/* Integrações em carrossel */}
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            className="max-w-[95%] mx-auto" 
            
          >
            <CarouselContent className="flex gap-4">
              <CarouselItem className="basis-full">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-2">
                      <Code className="text-primary" />
                      <h4 className="font-semibold">HTML + CSS + JS</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Integre na sua loja, landing page ou sistema de gestão.
                      </p>
                      <Button variant="link">clicando aqui</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-2">
                      <Server className="text-green-600" />
                      <h4 className="font-semibold">Node.js</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Integre na sua loja, landing page ou sistema de gestão.
                      </p>
                      <Button variant="link">clicando aqui</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-2">
                      <Server className="text-blue-600" />
                      <h4 className="font-semibold">PHP</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Integre na sua loja, landing page ou sistema de gestão.
                      </p>
                      <Button variant="link">clicando aqui</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="basis-full">
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center gap-2">
                      <ShoppingCart className="text-purple-600" />
                      <h4 className="font-semibold">E-commerce</h4>
                      <p className="text-sm text-muted-foreground text-center">
                        Integração com WooCommerce, WordPress, Shopify, Wix.
                      </p>
                      <Button variant="link">clicando aqui</Button>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>


        </div>


      </PageContainer>
    </div>
  );
}

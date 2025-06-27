'use client';


import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconEye } from '@tabler/icons-react';

export default function CustomCheckout() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: React.ReactNode[] = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 100; // percent
        const y = Math.random() * 100; // percent
        newStars.push(
          <div
            key={i}
            className="star"
            style={{
              top: `${y}%`,
              left: `${x}%`,
            }}
          />
        );
      }
      setStars(newStars);
    };

    generateStars();
  }, []);


  const [components, setComponents] = useState({
    contactInfo: true,
    addressInfo: true,
    paymentMethods: true,
    cardDetails: true,
    orderSummary: true,
    payButton: true
  });
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  const toggleComponent = (component: keyof typeof components) => {
    setComponents(prev => ({
      ...prev,
      [component]: !prev[component]
    }));
  };

  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <div className="max-w-7xl mx-auto p-4   space-y-6">
      {stars}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Muffins AI</h1>


        </div>
        <div>
          <h1 className="text-2xl font-bold"></h1>
          <p className="text-muted-foreground">
            Este Ambiente é Seguro e Criptografado Psafe SSL
          </p>

        </div>

      </div>

      {

        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Coluna de Informações + Pagamento */}
            <div className="space-y-6">
              {components.contactInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informações de Envio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="fullName">Nome Completo</Label>
                        <Input id="fullName" placeholder="Nome Completo" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="phone">Telefone</Label>
                        <Input id="phone" placeholder="Telefone" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="Email" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {components.addressInfo && (
                <Card>
                  <CardHeader>
                    <CardTitle>Endereço de Envio</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-1">
                      <Label htmlFor="address">Endereço</Label>
                      <Input id="address" placeholder="Barro, Distrito, Província" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" placeholder="Cidade" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="postalCode">Código Postal</Label>
                        <Input id="postalCode" placeholder="Código Postal" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {components.paymentMethods && (
                <Card>
                  <CardHeader>
                    <CardTitle>Método de Pagamento</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Cartão</Button>
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Cartelas</Button>
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Paypal</Button>
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">QR Code</Button>
                    </div>

                    {components.cardDetails && (
                      <div className="space-y-1 mt-4">
                        <div className="space-y-1 mt-4">
                          <Label htmlFor="cardNumber">Número de Cartão</Label>
                          <Input id="cardNumber" placeholder="1234 1234 1234 1234" />
                        </div>
                      <br />
                      
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Input id="city" placeholder="MM/AA" />
                          </div>

                          <div className="space-y-1">
                            <Input id="postalCode" placeholder="CVV" />
                          </div>
                        </div>
                      </div>

                    )}
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Coluna de Resumo do Pedido */}
            <div>
              {components.orderSummary && (
                <Card>
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span>Créditos</span>
                        <span>MZN 200,00 x 1</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>MZN 2000,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA (20%)</span>
                        <span>MZN [Insento]</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frete</span>
                        <span>GRATUITA</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>MZN 2000,00</span>
                      </div>
                    </div>

                    {components.payButton && (
                      <Button className="w-full mt-6">Pagar</Button>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </>
      }
    </div>
  );
}
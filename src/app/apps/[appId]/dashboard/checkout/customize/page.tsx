'use client';


import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { IconEye } from '@tabler/icons-react';

export default function CustomCheckout() {
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
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Personalizar Checkout</h1>
          <p className="text-muted-foreground">
            Marque/desmarque os componentes que deseja incluir no seu checkout
          </p>
        </div>
        <Button
          onClick={togglePreviewMode}
          variant={isPreviewMode ? "default" : "outline"}
          className="gap-2"
        >
          <IconEye size={18} />
          {isPreviewMode ? "Editar" : "Visualizar"}
        </Button>
      </div>

      {!isPreviewMode ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna de Configuração */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Componentes do Checkout
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(components).map(([key, value]) => (
                  <div key={key} className="flex items-center space-x-2">
                    <Checkbox
                      id={key}
                      checked={value}
                      onCheckedChange={() => toggleComponent(key as keyof typeof components)}
                    />
                    <Label htmlFor={key}>
                      {key === 'contactInfo' && 'Informações de Contacto'}
                      {key === 'addressInfo' && 'Informações de Endereço'}
                      {key === 'paymentMethods' && 'Métodos de Pagamento'}
                      {key === 'cardDetails' && 'Detalhes do Cartão'}
                      {key === 'orderSummary' && 'Resumo do Pedido'}
                      {key === 'payButton' && 'Botão de Pagamento'}
                    </Label>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Coluna de Informações de Envio */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informações de Envio</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {components.contactInfo && (
                  <>
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
                  </>
                )}

                {components.addressInfo && (
                  <>
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
                  </>
                )}
              </CardContent>
            </Card>

            {components.paymentMethods && (
              <Card>
                <CardHeader>
                  <CardTitle>Método de Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                 <div className="flex gap-2">
                  <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Cartão</Button>
                  <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Cartelas</Button>
                  <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Paysal</Button>
                  <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">QR Code</Button>
                </div>

                  {components.cardDetails && (
                    <div className="space-y-1 mt-4">
                      <Label htmlFor="cardNumber">Número de Cartão</Label>
                      <Input id="cardNumber" placeholder="1234 1234 1234 1234" />
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Coluna de Resumo do Pedido */}
          <div className="lg:col-span-1">
            {components.orderSummary && (
              <Card>
                <CardHeader>
                  <CardTitle>Resumo do Pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Cadeira de madeira Betala</span>
                      <span>MZN 1200,00 x 2</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>MZN 2400,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>IVA (20%)</span>
                      <span>MZN 480,00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Frete</span>
                      <span>GRATUITA</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>MZN 2880,00</span>
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
      ) : (
        // Modo Preview - Visualização do Checkout Final
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">Paysal</Button>
                      <Button variant="outline" className="flex-shrink basis-[calc(25%-0.5rem)] min-w-0">QR Code</Button>
                    </div>

                    {components.cardDetails && (
                      <div className="space-y-1 mt-4">
                        <Label htmlFor="cardNumber">Número de Cartão</Label>
                        <Input id="cardNumber" placeholder="1234 1234 1234 1234" />
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
                        <span>Cadeira de madeira Betala</span>
                        <span>MZN 1200,00 x 2</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>MZN 2400,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>IVA (20%)</span>
                        <span>MZN 480,00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Frete</span>
                        <span>GRATUITA</span>
                      </div>
                      <Separator className="my-2" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>MZN 2880,00</span>
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
      )}
    </div>
  );
}
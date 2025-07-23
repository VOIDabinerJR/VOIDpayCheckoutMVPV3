'use client';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PaymentMethod } from './types';

declare global {
  interface Window {
    paypal?: any;
  }
}

type PaymentMethodsProps = {
  selectedMethod: PaymentMethod;
  onMethodChange: (method: PaymentMethod) => void;
  total: number;
  onPaypalSuccess?: () => void;
};

export const PaymentMethods = ({
  selectedMethod,
  onMethodChange,
  total,
  onPaypalSuccess,
}: PaymentMethodsProps) => {
  const [paypalSdkReady, setPaypalSdkReady] = useState(false);
  const [paypalError, setPaypalError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedMethod !== 'paypal' || paypalSdkReady) return;

    const loadPaypalSdk = () => {
      const script = document.createElement('script');
      script.src = `https://www.paypal.com/sdk/js?client-id=Ae6opfrt9hy32F1d5DP1LwX78WwECiejzXj6Cotwy8atfocuHvbkeIpaIVzIYiaealSWGcUWaWvp9PDF&currency=USD&enable-funding=card`;
      script.async = true;

      script.onload = () => {
        try {
          if (!window.paypal) {
            throw new Error('PayPal SDK não carregou corretamente');
          }
          
          window.paypal
            .Buttons({
              style: {
                color: 'black',
                backgroundColor: 'silver',
              },
              createOrder: async (data: any, actions: any) => {
                try {
                  const res = await fetch(
                    'https://my-flask-app-1-4uel.onrender.com/paypal/paypal/create_order',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw',
                        amount: total.toFixed(2),
                        currency: "USD",
                      }),
                    }
                  );

                  if (!res.ok) {
                    throw new Error('Falha ao criar ordem PayPal');
                  }

                  const dataRes = await res.json();
                  return dataRes.id;
                } catch (error) {
                  console.error('Erro ao criar ordem:', error);
                  setPaypalError('Erro ao processar pagamento');
                  throw error;
                }
              },
              onApprove: async (data: { orderID: string }, actions: any) => {
                try {
                  const res = await fetch(
                    'https://my-flask-app-1-4uel.onrender.com/paypal/paypal/capture_order',
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        orderID: data.orderID,
                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw',
                      }),
                    }
                  );

                  if (!res.ok) {
                    throw new Error('Falha ao capturar pagamento');
                  }

                  const captureRes = await res.json();
                  onPaypalSuccess?.();
                } catch (error) {
                  console.error('Erro ao capturar pagamento:', error);
                  setPaypalError('Erro ao finalizar pagamento');
                }
              },
              onError: (err: any) => {
                console.error('Erro no PayPal:', err);
                setPaypalError(`Erro no PayPal: ${err.message || 'Erro desconhecido'}`);
              },
            })
            .render('#paypal-button-container');
          
          setPaypalSdkReady(true);
          setPaypalError(null);
        } catch (error) {
          console.error('Erro ao inicializar PayPal:', error);
          setPaypalError('Falha ao carregar o PayPal. Tente recarregar a página.');
        }
      };

      script.onerror = () => {
        setPaypalError('Falha ao carregar o SDK do PayPal');
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
        const container = document.getElementById('paypal-button-container');
        if (container) container.innerHTML = '';
      };
    };

    loadPaypalSdk();
  }, [selectedMethod, paypalSdkReady, total, onPaypalSuccess]);

  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle className="text-strong-transparent">Método de Pagamento</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          {['card', 'wallet', 'paypal', 'qrcode'].map((method) => (
            <Button
              key={method}
              variant="outline"
              className={`flex-1 border transition-all ${
                selectedMethod === method
                  ? 'bg-muted shadow-inner ring-2 ring-muted-foreground'
                  : ''
              }`}
              onClick={() => {
                setPaypalError(null);
                onMethodChange(method as PaymentMethod);
              }}
            >
              {method === 'card' && 'Cartão'}
              {method === 'wallet' && 'Carteira'}
              {method === 'paypal' && 'PayPal'}
              {method === 'qrcode' && 'QR Code'}
            </Button>
          ))}
        </div>

        {selectedMethod === 'card' && (
          <div className="space-y-3 mt-4">
            <Label className="text-muted-transparent">Número de Cartão</Label>
            <Input className="glass-input" placeholder="1234 1234 1234 1234" />
            <div className="grid grid-cols-2 gap-4">
              <Input className="glass-input" placeholder="MM/AA" />
              <Input className="glass-input" placeholder="CVV" />
            </div>
          </div>
        )}

        {selectedMethod === 'wallet' && (
          <div className="mt-4 text-muted-transparent">
            Pagamento via Carteira selecionado.
          </div>
        )}

        {selectedMethod === 'paypal' && (
          <div className="mt-4">
            <div id="paypal-button-container" />
            {paypalError && (
              <p className="text-red-400 text-sm mt-2">{paypalError}</p>
            )}
          </div>
        )}

        {selectedMethod === 'qrcode' && (
          <div className="mt-4 text-muted-transparent">
            Mostrar QR Code aqui.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
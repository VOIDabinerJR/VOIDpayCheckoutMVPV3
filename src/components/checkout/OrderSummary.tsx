// components/checkout/OrderSummary.tsx
'use client';
import { OrderItem, OrderSummaryData  } from './types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

type OrderSummaryProps = {
  items: OrderItem[];
  summary: OrderSummaryData ;
  loading: boolean;
  error: string;
  onPayment: () => void;
};

export const OrderSummary = ({
  items,
  summary,
  loading,
  error,
  onPayment,
}: OrderSummaryProps) => {
  return (
    <Card className="glass-card">
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 py-2 last:border-none"
          >
            <div className="flex items-center gap-3">
              <img
                src={item.img}
                alt={item.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">
                  Quantidade: {item.quantity}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-semibold">
                MZN {(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        <Separator />
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>MZN {summary.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>IVA (20%)</span>
          <span>MZN {summary.tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Frete</span>
          <span>GRÁTIS</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>MZN {summary.total.toFixed(2)}</span>
        </div>
        <Button
          className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
          onClick={onPayment}
          disabled={loading}
        >
          {loading ? 'Processando...' : 'Pagar'}
        </Button>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};
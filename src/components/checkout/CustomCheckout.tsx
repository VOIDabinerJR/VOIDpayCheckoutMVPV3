// components/checkout/CustomCheckout.tsx
'use client';
import { Header } from './Header';
import { Footer } from './Footer';
import { StarsBackground } from './StarsBackground';
import { PersonalInfoForm } from './PersonalInfoForm';
import { AddressForm } from './AddressForm';
import { PaymentMethods } from './PaymentMethods';
import { OrderSummary } from './OrderSummary';
import { useCheckout } from './useCheckout';
import { OrderItem, OrderSummaryData } from './types';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Alert } from './Alert';

type CustomCheckoutProps = {
  storeName?: string;
};

type OrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled';

export const CustomCheckout = ({ storeName }: CustomCheckoutProps) => {


  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [summary, setSummary] = useState<OrderSummaryData>({
    tax: 0,
    subtotal: 0,
    iva: 0,
    total: 0,
    orderStatus: 'pending',

  });
  // const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState('');

  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');

  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderid');
  const buttonToken = searchParams.get('buttontoken');
  const channel = searchParams.get('channel');


  const addressParam = searchParams.get('address');
  const showAddressForm = addressParam === 'true';


  useEffect(() => {
    if (!orderId) {
      setError('ID do pedido não encontrado');

      return;
    }
    const fetchOrderData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/pay/pay/pay?orderid=${orderId}&buttontoken=${buttonToken}&channel=${channel}`,

        );

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.message || 'Failed to fetch order data');
        }
        const data = await res.json();

        if (data.orderStatus === 'completed') {
          setOrderStatus('completed');

        }


        setOrderItems(
          data.orderItems[0].map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
            img: item.img || '/default-product.png'
          }))
        );



        setSummary({
          tax: Number(data.ivaTax),
          subtotal: Number(data.subtotal),
          iva: data.iva,
          total: Number(data.total),
          orderStatus: data.orders
        });

        setOrderStatus(data.orderStatus);

      } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        setError(error instanceof Error ? error.message : 'Erro desconhecido');
      }
    };

    fetchOrderData();
  }, [orderId, buttonToken, channel]);


  const getStatusMessage = () => {
    if (orderStatus === 'completed') {
      return {
        message: 'Este pedido já foi concluído com sucesso!',
        type: 'success' as const
      };
    }

    if (orderStatus === 'cancelled') {
      return {
        message: 'Este pedido foi cancelado.',
        type: 'error' as const
      };
    }
  };

  const status = getStatusMessage();
  const isOrderCompleted = orderStatus === 'completed';


  const {
    fullName,
    setFullName,
    phone,
    setPhone,
    email,
    setEmail,
    address,
    setAddress,
    city,
    setCity,
    postalCode,
    setPostalCode,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    loading,
    handlePayment,
    handlePaypalSuccess,
  } = useCheckout();


  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 relative">
      <StarsBackground />
      <Header storeName={storeName ?? ''} />

      {status && (
        <Alert type=
          {status.type}>
          {status.message}
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        <div className="space-y-6">
          <PersonalInfoForm
            fullName={fullName}
            phone={phone}
            email={email}
            onFullNameChange={setFullName}
            onPhoneChange={setPhone}
            onEmailChange={setEmail}
          />

          {showAddressForm && (
            <AddressForm
              address={address}
              city={city}
              postalCode={postalCode}
              onAddressChange={setAddress}
              onCityChange={setCity}
              onPostalCodeChange={setPostalCode}
            />
          )}


          <PaymentMethods
            selectedMethod={selectedPaymentMethod}
            onMethodChange={setSelectedPaymentMethod}
            total={summary.total}
            onPaypalSuccess={handlePaypalSuccess}
          />
        </div>

        <div>
          <OrderSummary
            items={orderItems}
            summary={summary}
            loading={loading}
            error={error}
            onPayment={handlePayment}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};


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

type CustomCheckoutProps = {
  storeName?: string;
};

export const CustomCheckout = ({ storeName }: CustomCheckoutProps) => {


  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [summary, setSummary] = useState<OrderSummaryData>({
    tax: 0,
    subtotal: 0,
    iva: 0,
    total: 0
  });
  const [error, setError] = useState('');


  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderid');
  const buttonToken = searchParams.get('buttontoken');
  const channel = searchParams.get('channel');


  const addressParam = searchParams.get('address');
  const showAddressForm = addressParam === 'true';


  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/pay/pay/pay?orderid=${orderId}&buttontoken=${buttonToken}&channel=${channel}`
        );

        const data = await res.json();


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
        });

      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Falha ao carregar detalhes do pedido');
      }
    };

    if (orderId) fetchOrderData();
  }, [orderId]);




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


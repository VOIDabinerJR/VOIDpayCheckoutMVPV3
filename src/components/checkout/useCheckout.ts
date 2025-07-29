// components/checkout/useCheckout.ts
'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';
import { OrderItem, OrderSummaryData, PaymentMethod } from './types';

export const useCheckout = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderid');

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [summary, setSummary] = useState<OrderSummaryData>({
    tax: 0,
    subtotal: 0,
    iva: 0,
    total: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/pay/pay?orderid=${orderId}&buttontoken=VOID-04fce89f-0952-4736-8c35-c93c0e503809&channel=shopify`
        );
        if (!res.ok) throw new Error('Failed to fetch order data');
        const json = await res.json();
        console.log('Order data:', json);

        const items = json.orderItems?.[0] || [];

        setOrderItems(
          items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: parseFloat(item.price),
            img: item.img || '',
          }))
        );

        setSummary({
          tax: Number(json.ivaTax),
          subtotal: Number(json.subtotal),
          iva: json.iva,
          total: Number(json.total),
        });
      } catch (error) {
        console.error('Error fetching order:', error);
        setError('Failed to load order details');
      }
    };

    if (orderId) fetchData();
  }, [orderId]);

  const handlePayment = async () => {
    setLoading(true);
   setError('Please select a payment method');

    const payload = {
      idempotencyKey: '',
      orderId,
      fullName,
      phone,
      email,
      address,
      city,
      postalCode,
      paymentMethod: selectedPaymentMethod,
    };

    if (!selectedPaymentMethod) {
      setError('Please select a payment method');
      setLoading(false);
      return;
    }

    try {


      const IdempotencyKey = '1asda' ;  //crypto.randomUUID();
      payload.idempotencyKey = IdempotencyKey;

      const res = await fetch(`http://localhost:3001/pay/pay?orderid=${orderId}&buttontoken=VOID-04fce89f-0952-4736-8c35-c93c0e503809&channel=shopify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': IdempotencyKey
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to process payment');

      router.push('/success');
    } catch (err) {
      console.log(err);
      setError('Error processing payment: ' + err);
    } finally {
      setLoading(false);
    }



  };

  const handlePaypalSuccess = () => {
    router.push('/success');
  };

  return {
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
    error,
    orderItems,
    summary,
    handlePayment,
    handlePaypalSuccess,
  };
};



// if (selectedPaymentMethod === 'mobileWallet') {
//   try {
//     const res = await fetch('/api/checkout', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(payload),
//     });

//     if (!res.ok) throw new Error('Falha no pagamento');

//     router.push('/success');
//   } catch (err) {
//     setError('Erro ao processar pagamento: ' + err);
//   } finally {
//     setLoading(false);
//   }
// }

// if (selectedPaymentMethod === 'paypal') {
//   try {
//     const res = await fetch(
//       'https://my-flask-app-1-4uel.onrender.com/paypal/paypal/create_order',
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           token:
//             'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw',
//           amount: summary.total.toFixed(2),
//           currency: 'MZN',
//         }),
//       }
//     );

//     if (!res.ok) throw new Error('Erro ao criar ordem PayPal');

//     const data = await res.json();
//     let orderId = data.id;
//     orderId = '07U98539XY7500501';
//     const approvalUrl =
//       data.approvalUrl || `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;

//     window.location.href = approvalUrl;
//   } catch (err) {
//     setError('Erro ao processar pagamento PayPal: ' + err);
//     setLoading(false);
//   }
// }
'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils'; // se você usa utilitário para classNames
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useSearchParams } from 'next/navigation';
import router from 'next/router';


type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  img: string;
};


export default function CustomCheckout() {


  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'mobileWallet' | 'paypal' | 'qrcode' | null>(null);
  // const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card');


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const handlePayment = async () => {
    
    const orderId = searchParams.get('orderid');
    setLoading(true);
    setError('');

    const payload = {
      orderId,
      fullName,
      phone,
      email,
      address,
      city,
      postalCode,
      paymentMethod: selectedPaymentMethod,
    };

    // Aqui você enviaria o payload para o backend
 if (selectedPaymentMethod === 'mobileWallet') {
    try {
      // Simular envio
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Falha no pagamento');

      // Redirecionar para página de sucesso
      router.push('/success');
    } catch (err) {
      setError('Erro ao processar pagamento: ' + err);
    } finally {
      setLoading(false);
    }
  }
   if (selectedPaymentMethod === 'paypal') {
      // Fluxo PayPal (criar ordem, redirecionar para checkout PayPal)
      const res = await fetch("https://my-flask-app-1-4uel.onrender.com/paypal/paypal/create_order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw",
          amount: summary.total.toFixed(2),
          currency: "MZN",
        }),
      });

      if (!res.ok) throw new Error("Erro ao criar ordem PayPal");

      const data = await res.json();
      let orderId = data.id;
      orderId='07U98539XY7500501';
      const approvalUrl = data.approvalUrl || `https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`;

      // Redireciona para página do PayPal
      window.location.href = approvalUrl;
    } 
  };

  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);

  const [summary, setSummary] = useState({

    tax: 0,
    subtotal: 0,
    iva: 0,
    total: 0
  });


  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderid');



  const [stars, setStars] = useState<React.ReactNode[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');


  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Carrega os dados do pedido quando o componente é montado

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3001/pay/pay/pay?orderid=${orderId}&buttontoken=VOID-04fce89f-0952-4736-8c35-c93c0e503809&channel=shopify`);
        if (!res.ok) throw new Error('Failed to fetch order data');
        const json = await res.json();
        console.log('Order data:', json);

        // Corrige a estrutura de orderItems
        const items = json.orderItems?.[0] || []; // Garante que acessamos o array dentro do array

        setOrderItems(items.map((item: any) => ({
          name: item.name,
          quantity: item.quantity,
          price: parseFloat(item.price),
          img: item.img || '', // ou alguma imagem padrão
        })));

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


  useEffect(() => {
    if (selectedPaymentMethod !== 'paypal') return;

    const script = document.createElement('script'); 
    script.src = `https://www.paypal.com/sdk/js?client-id=Ae6opfrt9hy32F1d5DP1LwX78WwECiejzXj6Cotwy8atfocuHvbkeIpaIVzIYiaealSWGcUWaWvp9PDF&currency=USD&enable-funding=card`; // Ou MZN, se suportado
    script.async = true;

    script.onload = () => {
      (window as any).paypal.Buttons( {   
  style: {
  
    color: 'black',            // 'gold', 'blue', 'silver', 'white', 'black'
    backgroundColor: 'silver', // 'white', 'black', 'blue', 'silver'

  },
        createOrder: async (data: any, actions: any) => {
          // Chame sua rota Flask para gerar o PayPal orderId
          const res = await fetch("https://my-flask-app-1-4uel.onrender.com/paypal/paypal/create_order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw"
            })
          });

          const dataRes = await res.json();
          return dataRes.id;
        },
        onApprove: async (data: { orderID: any; }, actions: any) => {


          const res = await fetch("https://my-flask-app-1-4uel.onrender.com/paypal/paypal/capture_order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID,
              token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhbW91bnQiOiIxMC4wMCIsImN1cnJlbmN5IjoiVVNEIiwiaWF0IjoxNzUyMDQ4NDQxfQ.qH0OZJIjqAhxI4eTH7hsBg1bV-Hs-fVueuoMHwTRsuw"
            })
          });

          const captureRes = await res.json();
          alert("Pagamento aprovado!");
          router.push('/success'); // ou redirecionamento manual
        },
        onError: (err: any) => {
          console.error("Erro no PayPal:", err);
          setError("Erro no pagamento via PayPal: " + err);
        }
      }).render("#paypal-button-container");
    };

    document.body.appendChild(script); 

    return () => {
      // Cleanup (evita múltiplos botões)
      const existingContainer = document.getElementById("paypal-button-container");
      if (existingContainer) existingContainer.innerHTML = "";
    };
  }, [selectedPaymentMethod]);



  const subtotal = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const iva = subtotal * 0.2;
  const total = subtotal + iva;



  useEffect(() => {
    const newStars = Array.from({ length: 100 }, (_, i) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      return (
        <div key={i} className="star" style={{ top: `${y}%`, left: `${x}%`, position: 'absolute' }} />
      );
    });
    setStars(newStars);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6 relative">
      {stars}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-muted-foreground font-bold">Muffins AI <span> <Button onClick={toggleTheme} variant="ghost"
          className="border border-muted-foreground shadow-inner hover:shadow-md transition-all"
        >

          {theme === 'light' ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
        </Button></span></h1>
        <p className="text-muted-foreground">
          Este Ambiente é Seguro e Criptografado Psafe SSL
        </p>
      </div>

      <div className="flex justify-end">

      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Info do usuário */}
        <div className="space-y-6">
          {/* Informações de Envio */}
          <Card>
            <CardHeader><CardTitle>Informações de Envio</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="fullName">Nome Completo</Label>
                  <Input value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Nome Completo" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} placeholder="Telefone" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
              </div>
            </CardContent>
          </Card>

          {/* Endereço */}
          <Card>
            <CardHeader><CardTitle>Endereço de Envio</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Label htmlFor="address">Endereço</Label>
              <Input value={address} onChange={e => setAddress(e.target.value)} placeholder="Bairro, Distrito, Província" />

              <div className="grid grid-cols-2 gap-4">
                <Input value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade" />
                <Input value={postalCode} onChange={e => setPostalCode(e.target.value)} placeholder="Código Postal" />
              </div>
            </CardContent>
          </Card>

          {/* Métodos de Pagamento */}
          <Card>
            <CardHeader><CardTitle>Método de Pagamento</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                {['card', 'mobileWallet', 'paypal', 'qrcode'].map(method => (
                  <Button
                    key={method}
                    variant="outline"
                    className={`flex-1 border transition-all ${selectedPaymentMethod === method
                      ? 'bg-muted shadow-inner ring-2 ring-muted-foreground'
                      : ''
                      }`}
                    onClick={() => setSelectedPaymentMethod(method as 'card' | 'mobileWallet' | 'paypal' | 'qrcode')}
                  >
                    {method === 'card' && 'Cartão'}
                    {method === 'mobileWallet' && 'Carteira'}
                    {method === 'paypal' && 'PayPal'}
                    {method === 'qrcode' && 'QR Code'}
                  </Button>
                ))}
              </div>

              {/* Campos Condicionais */}
              {selectedPaymentMethod === 'card' && (
                <div className="space-y-3 mt-4">
                  <Label>Número de Cartão</Label>
                  <Input placeholder="1234 1234 1234 1234" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input placeholder="MM/AA" />
                    <Input placeholder="CVV" />
                  </div>
                </div>
              )}

              {selectedPaymentMethod === 'mobileWallet' && (
                <div className="mt-4">Pagamento via Carteira selecionado.</div>
              )}


              {selectedPaymentMethod === 'paypal' && (
                <div className="mt-4">
                  <div id="paypal-button-container" />
                </div>
              )}


              {selectedPaymentMethod === 'qrcode' && (
                <div className="mt-4">Mostrar QR Code aqui.</div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Resumo do Pedido */}
        <div>
          <Card>
            <CardHeader><CardTitle>Resumo do Pedido</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {orderItems.map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4 py-2 last:border-none">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-sm text-muted-foreground">Quantidade: {item.quantity}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold">MZN {(item.price * item.quantity).toFixed(2)}</span>
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
              <Button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white" onClick={handlePayment}>  {loading ? 'Processando...' : 'Pagar'}</Button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        <p>© {new Date().getFullYear()} VOIDpay. Todos os direitos reservados.</p>
        <div className="flex justify-center gap-4 mt-2">
          <a href="#" className="hover:underline">Termos de Serviço</a>
          <a href="#" className="hover:underline">Política de Privacidade</a>
          <a href="#" className="hover:underline">Suporte</a>
        </div>
      </footer>
    </div>
  );
}

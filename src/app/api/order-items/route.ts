// src/app/api/order-items/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get('orderId');

  console.log('Fetching order items for orderId:', orderId);

  const mockOrders: Record<string, any> = {
    '123': {
      items: [
        {
          name: 'Curso de Inglês Social',
          quantity: 1,
          price: 2000,
          image: 'https://socialidiomas.com.br/site/wp-content/uploads/2021/05/curso-de-ingles-social.jpg',
        },
        {
          name: 'Casa de Árvore',
          quantity: 2,
          price: 1000,
          image: 'https://cdn.awsli.com.br/600x700/1278/1278944/produto/259777355/arvore-0u1otlzanj.jpg',
        }
      ],
      tax: 0,
      subtotal: 4000,
      iva: 800,
      total: 4800,
    },

    '456': {
      items: [
        {
          name: 'E-book Programação',
          quantity: 3,
          price: 500,
          image: 'https://m.media-amazon.com/images/I/61u7T1koQqL._SL1500_.jpg',
        }
      ],
      tax: 0,
      subtotal: 1500,
      iva: 300,
      total: 1800,
    },

    '789': {
      items: [
        {
          name: 'Placa Solar 500W',
          quantity: 1,
          price: 7500,
          image: 'https://www.solardireto.pt/media/catalog/product/cache/1/image/600x700/0dc2d03fe217f8c83829496872af24a0/p/l/placa-solar-monocristalina-500w.jpg',
        },
        {
          name: 'Controlador de Carga MPPT',
          quantity: 1,
          price: 3000,
          image: 'https://cdn.awsli.com.br/600x700/1000/1000360/produto/134487131/3efcb38fc3.jpg',
        }
      ],
      tax: 0,
      subtotal: 10500,
      iva: 2100,
      total: 12600,
    }
  };

  const order = mockOrders[orderId as string];

  if (!order) {
    return NextResponse.json({ error: 'Pedido não encontrado.' }, { status: 404 });
  }

  return NextResponse.json(order);
}
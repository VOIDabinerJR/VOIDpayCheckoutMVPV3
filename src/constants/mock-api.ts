////////////////////////////////////////////////////////////////////////////////
// 🛑 Nothing in here has anything to do with Nextjs, it's just a fake database
////////////////////////////////////////////////////////////////////////////////
import { Withdrawal } from './data';
import { faker } from '@faker-js/faker';
import { matchSorter } from 'match-sorter'; // For filtering
import { App } from './data';
import { PaymentButton } from './data';

import { Refund, RefundsResponse } from './data';


// @/constants/mock-api.ts
export const mockPaymentButtons = {
  getPaymentButtons: async (filters: {
    page: number;
    limit: number;
    status?: string;
    search?: string;
  }) => {
    // Full mock data array
   const allButtons: PaymentButton[] = [
      {
        id: 'btn_001',
        name: 'Premium Subscription',
        buttonToken: 'VOID-b0eb1910-5de6-4b83-a5e3-311fc0884844',
        destination: null,
        appId: 13,
        createdAt: '2025-06-06T18:52:12.000Z',
        status: 'pending', // Changed to 'pending' to match needsActivation
        needsActivation: true,
        webhookUrl: 'https://api.example.com/webhooks/payments',
        clientSecret: 'sk_test_xyz123',
        transactionsCount: 0,
        lastUsedAt: null
      },
      {
        id: 'btn_002',
        name: 'Donation Button',
        buttonToken: 'VOID-c1fc2911-6ef7-5c94-b6f4-422fd1995955',
        destination: 'charity@org.com',
        appId: 13,
        createdAt: '2025-06-10T09:15:33.000Z',
        status: 'active',
        transactionsCount: 42,
        lastUsedAt: '2025-06-17T14:22:09.000Z'
      },
      {
        id: 'btn_003',
        name: 'E-commerce Checkout',
        buttonToken: 'VOID-d2gd3022-7gh8-6d05-c7g5-533ge2107066',
        destination: 'store@merchant.com',
        appId: 14,
        createdAt: '2025-06-15T11:08:57.000Z',
        status: 'active',
        transactionsCount: 128,
        lastUsedAt: '2025-06-18T10:45:21.000Z'
      },
      {
        id: 'btn_004',
        name: 'Service Payment',
        buttonToken: 'VOID-e3he4133-8hi9-7e16-d8h6-644hf3218177',
        destination: 'services@company.com',
        appId: 15,
        createdAt: '2025-06-18T08:30:45.000Z',
        status: 'active',
        transactionsCount: 56,
        lastUsedAt: '2025-06-18T12:15:30.000Z'
      },
      {
        id: 'btn_005',
        name: 'Event Ticket',
        buttonToken: 'VOID-f4if5244-9ij0-8f27-e9i7-755ig4329288',
        destination: 'events@org.com',
        appId: 13,
        createdAt: '2025-06-19T10:20:15.000Z',
        status: 'pending', // Changed to 'pending' to match needsActivation
        needsActivation: true,
        transactionsCount: 0,
        lastUsedAt: null
      }
    ];


    // Apply filters
    let filteredButtons = allButtons;
    
    if (filters.status) {
      filteredButtons = filteredButtons.filter(
        button => button.status === filters.status
      );
    }
    
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredButtons = filteredButtons.filter(
        button => button.name.toLowerCase().includes(searchTerm) || 
                button.buttonToken.toLowerCase().includes(searchTerm)
      );
    }

    // Apply pagination
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    const paginatedButtons = filteredButtons.slice(startIndex, endIndex);

    // Simulate API response format
    return {
      total_buttons: filteredButtons.length,
      buttons: paginatedButtons,
      page: filters.page,
      per_page: filters.limit,
      total_pages: Math.ceil(filteredButtons.length / filters.limit)
    };
  }
};
// Dados mockados de reembolsos
const refundsData: Refund[] = [
  {
    id: 'REF-2023-001',
    transaction_id: 'TXN-1001',
    amount: 1500.0,
    currency: 'MZN',
    type: 'full',
    status: 'completed',
    payment_method: 'credit_card',
    reason: 'Produto não entregue',
    created_at: '2023-05-15T10:30:00Z',
    processed_at: '2023-05-16T09:15:00Z',
    approved_by: 'admin1',
    approved_at: '2023-05-15T14:45:00Z',
    customer: {
      id: 'CUST-001',
      name: 'Maria João',
      email: 'maria.joao@example.com'
    },
    original_transaction: {
      id: 'TXN-1001',
      amount: 1500.0,
      reference: 'Compra de eletrônicos',
      date: '2023-05-10T08:45:00Z'
    },
    metadata: {
      admin_notes: 'Cliente confirmou não recebimento',
      customer_notes: 'Aguardava há 2 semanas'
    }
  },
  {
    id: 'REF-2023-002',
    transaction_id: 'TXN-1005',
    amount: 750.5,
    currency: 'MZN',
    type: 'partial',
    status: 'processing',
    payment_method: 'pix',
    reason: 'Produto com defeito',
    created_at: '2023-05-18T16:20:00Z',
    customer: {
      id: 'CUST-002',
      name: 'Carlos Silva',
      email: 'carlos.silva@example.com'
    },
    original_transaction: {
      id: 'TXN-1005',
      amount: 1500.0,
      reference: 'Compra de móveis',
      date: '2023-05-12T11:30:00Z'
    }
  },
  {
    id: 'REF-2023-003',
    transaction_id: 'TXN-1010',
    amount: 2000.0,
    currency: 'MZN',
    type: 'full',
    status: 'pending_approval',
    payment_method: 'bank_transfer',
    reason: 'Cancelamento de serviço',
    created_at: '2023-05-20T09:10:00Z',
    customer: {
      id: 'CUST-003',
      name: 'Ana Paula',
      email: 'ana.paula@example.com'
    },
    original_transaction: {
      id: 'TXN-1010',
      amount: 2000.0,
      reference: 'Assinatura anual',
      date: '2023-05-01T07:00:00Z'
    }
  },
  {
    id: 'REF-2023-004',
    transaction_id: 'TXN-1015',
    amount: 500.0,
    currency: 'MZN',
    type: 'partial',
    status: 'failed',
    payment_method: 'debit_card',
    reason: 'Desistência da compra',
    created_at: '2023-05-22T14:35:00Z',
    processed_at: '2023-05-23T10:20:00Z',
    customer: {
      id: 'CUST-004',
      name: 'José António',
      email: 'jose.antonio@example.com'
    },
    original_transaction: {
      id: 'TXN-1015',
      amount: 1000.0,
      reference: 'Compra de roupas',
      date: '2023-05-18T13:15:00Z'
    },
    metadata: {
      admin_notes: 'Falha na comunicação com o banco'
    }
  }
];

export const mockRefunds = {
  getRefunds: async (filters: {
    page?: number;
    limit?: number;
    status?: string;
    type?: string;
    search?: string;
  }): Promise<RefundsResponse> => {
    // Filtragem dos dados
    let filteredData = [...refundsData];

    // Filtro por status
    if (filters.status) {
      filteredData = filteredData.filter(
        (refund) => refund.status === filters.status
      );
    }

    // Filtro por tipo
    if (filters.type) {
      filteredData = filteredData.filter(
        (refund) => refund.type === filters.type
      );
    }

    // Filtro por pesquisa (ID, transaction_id ou nome do cliente)
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(
        (refund) =>
          refund.id.toLowerCase().includes(searchTerm) ||
          refund.transaction_id.toLowerCase().includes(searchTerm) ||
          refund.customer.name.toLowerCase().includes(searchTerm)
      );
    }

    // Paginação
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Calcular total amount
    const totalAmount = filteredData.reduce(
      (sum, refund) => sum + refund.amount,
      0
    );

    return {
      total_refunds: filteredData.length,
      total_amount: totalAmount,
      refunds: paginatedData,
      page: page,
      limit: limit
    };
  },

  // Método adicional para obter um reembolso específico
  getRefundById: async (id: string): Promise<Refund | undefined> => {
    return refundsData.find((refund) => refund.id === id);
  },

  // Método para atualizar status de um reembolso
  updateRefundStatus: async (
    id: string,
    status: Refund['status'],
    approvedBy?: string
  ): Promise<Refund | undefined> => {
    const refundIndex = refundsData.findIndex((refund) => refund.id === id);

    if (refundIndex !== -1) {
      const updatedRefund = {
        ...refundsData[refundIndex],
        status,
        approved_by: approvedBy,
        approved_at:
          status === 'completed' ? new Date().toISOString() : undefined,
        processed_at: ['completed', 'failed'].includes(status)
          ? new Date().toISOString()
          : refundsData[refundIndex].processed_at
      };

      refundsData[refundIndex] = updatedRefund;
      return updatedRefund;
    }

    return undefined;
  }
};

export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Define the shape of Product data
export type Product = {
  photo_url: string;
  name: string;
  description: string;
  created_at: string;
  price: number;
  id: number;
  category: string;
  updated_at: string;
  quantidade: number; // Novo campo
  payment_link: string; // Novo campo
};

// Mock product data store
export const fakeProducts = {
  records: [] as Product[], // Holds the list of product objects

  // Initialize with sample data
  initialize() {
    const sampleProducts: Product[] = [];
    function generateRandomProductData(id: number): Product {
      const categories = [
        'Electronics',
        'Furniture',
        'Clothing',
        'Toys',
        'Groceries',
        'Books',
        'Jewelry',
        'Beauty Products'
      ];

      const name = faker.commerce.productName();

      return {
        id,
        name,
        description: faker.commerce.productDescription(),
        created_at: faker.date
          .between({ from: '2022-01-01', to: '2023-12-31' })
          .toISOString(),
        price: parseFloat(faker.commerce.price({ min: 5, max: 500, dec: 2 })),
        photo_url: `https://api.slingacademy.com/public/sample-products/${id}.png`,
        category: faker.helpers.arrayElement(categories),
        updated_at: faker.date.recent().toISOString(),
        quantidade: faker.number.int({ min: 1, max: 100 }), // Valor entre 1 e 100
        payment_link: `https://pay.voidpay.com/checkout/${id}-${name.replace(/\s+/g, '-').toLowerCase()}`
      };
    }

    // Generate remaining records
    for (let i = 1; i <= 20; i++) {
      sampleProducts.push(generateRandomProductData(i));
    }

    this.records = sampleProducts;
  },

  // Get all products with optional category filtering and search
  async getAll({
    categories = [],
    search
  }: {
    categories?: string[];
    search?: string;
  }) {
    let products = [...this.records];

    // Filter products based on selected categories
    if (categories.length > 0) {
      products = products.filter((product) =>
        categories.includes(product.category)
      );
    }

    // Search functionality across multiple fields
    if (search) {
      products = matchSorter(products, search, {
        keys: ['name', 'description', 'category']
      });
    }

    return products;
  },

  // Get paginated results with optional category filtering and search
  async getProducts({
    page = 1,
    limit = 10,
    categories,
    search
  }: {
    page?: number;
    limit?: number;
    categories?: string;
    search?: string;
  }) {
    await delay(1000);
    const categoriesArray = categories ? categories.split('.') : [];
    const allProducts = await this.getAll({
      categories: categoriesArray,
      search
    });
    const totalProducts = allProducts.length;

    // Pagination logic
    const offset = (page - 1) * limit;
    const paginatedProducts = allProducts.slice(offset, offset + limit);

    // Mock current time
    const currentTime = new Date().toISOString();

    // Return paginated response
    return {
      success: true,
      time: currentTime,
      message: 'Sample data for testing and learning purposes',
      total_products: totalProducts,
      offset,
      limit,
      products: paginatedProducts
    };
  },

  // Get a specific product by its ID
  async getProductById(id: number) {
    await delay(1000); // Simulate a delay

    // Find the product by its ID
    const product = this.records.find((product) => product.id === id);

    if (!product) {
      return {
        success: false,
        message: `Product with ID ${id} not found`
      };
    }

    // Mock current time
    const currentTime = new Date().toISOString();

    return {
      success: true,
      time: currentTime,
      message: `Product with ID ${id} found`,
      product
    };
  }
};

export const mockWithdrawals = {
  getWithdrawals: async (filters: {
    page: number;
    limit: number;
    status?: string;
    method?: string;
    search?: string;
  }) => {
    // Simula um delay de rede
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Dados mockados de exemplo
    const allWithdrawals: Withdrawal[] = [
      {
        id: 'wd_123456',
        amount: 1500.5,
        method: 'mpesa',
        destination: '84 1234 5678',
        destination_name: 'João Silva',
        status: 'completed',
        created_at: '2023-10-15T10:30:00Z',
        reference: 'Pagamento de serviços',
        fee: 15.01,
        net_amount: 1485.49
      },
      {
        id: 'wd_789012',
        amount: 2500.0,
        method: 'bank',
        destination: 'Banco BIM - Conta 1234567',
        destination_name: 'Maria Souza',
        status: 'processing',
        created_at: '2023-10-16T14:45:00Z',
        reference: 'Transferência mensal',
        fee: 25.0,
        net_amount: 2475.0
      }
      // Adicione mais exemplos conforme necessário
    ];

    // Aplica filtros
    let filtered = allWithdrawals;

    if (filters.status) {
      filtered = filtered.filter((w) => w.status === filters.status);
    }

    if (filters.method) {
      filtered = filtered.filter((w) => w.method === filters.method);
    }

    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(
        (w) =>
          w.id.toLowerCase().includes(search) ||
          w.destination.toLowerCase().includes(search) ||
          (w.destination_name &&
            w.destination_name.toLowerCase().includes(search)) ||
          (w.reference && w.reference.toLowerCase().includes(search))
      );
    }

    // Paginação
    const start = (filters.page - 1) * filters.limit;
    const end = start + filters.limit;
    const paginated = filtered.slice(start, end);

    return {
      withdrawals: paginated,
      total_withdrawals: filtered.length,
      page: filters.page,
      limit: filters.limit
    };
  }
};

export const mockApps = {
  getApps: async (filters: any) => {
    // Simulação de delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockData: App[] = [
      {
        id: 'app_1',
        name: 'E-commerce Store',
        description: 'Main online store integration',
        client_id: 'client_123456',
        status: 'active',
        environment: 'production',
        created_at: '2023-01-15',
        updated_at: '2023-06-20',
        last_used: '2023-06-25T14:30:00Z',
        webhook_url: 'https://store.com/api/webhooks',
        ip_restrictions: ['192.168.1.1'],
        permissions: ['payments_read', 'payments_write']
      },
      {
        id: 'app_2',
        name: 'Mobile App',
        description: 'Android application',
        client_id: 'client_789012',
        status: 'active',
        environment: 'sandbox',
        created_at: '2023-03-10',
        updated_at: '2023-06-18',
        last_used: '2023-06-24T09:15:00Z',
        permissions: ['payments_read']
      },
      {
        id: 'app_3',
        name: 'POS System',
        description: 'Point of Sale terminal integration',
        client_id: 'client_345678',
        status: 'active',
        environment: 'production',
        created_at: '2023-02-28',
        updated_at: '2023-06-22',
        last_used: '2023-06-23T16:45:00Z',
        webhook_url: 'https://pos.example.com/webhook',
        ip_restrictions: ['10.0.0.1', '10.0.0.2'],
        permissions: ['payments_read', 'payments_write', 'refunds']
      },
      {
        id: 'app_4',
        name: 'Booking Platform',
        description: 'Hotel reservation system',
        client_id: 'client_901234',
        status: 'inactive',
        environment: 'production',
        created_at: '2022-11-05',
        updated_at: '2023-05-30',
        last_used: '2023-05-28T11:20:00Z',
        permissions: ['payments_read']
      },
      {
        id: 'app_5',
        name: 'Subscription Service',
        description: 'Recurring billing system',
        client_id: 'client_567890',
        status: 'active',
        environment: 'sandbox',
        created_at: '2023-04-15',
        updated_at: '2023-06-19',
        last_used: '2023-06-21T13:10:00Z',
        webhook_url: 'https://subs.example.com/api/events',
        ip_restrictions: ['172.16.0.5'],
        permissions: ['payments_read', 'subscriptions']
      },
      {
        id: 'app_6',
        name: 'Marketplace',
        description: 'Multi-vendor platform',
        client_id: 'client_123789',
        status: 'active',
        environment: 'production',
        created_at: '2023-01-30',
        updated_at: '2023-06-15',
        last_used: '2023-06-20T10:05:00Z',
        webhook_url: 'https://marketplace.com/webhooks/payments',
        ip_restrictions: ['192.168.2.10', '192.168.2.11'],
        permissions: ['payments_read', 'payments_write', 'disputes']
      }
    ];
    // Aplicar filtros
    let filteredData = [...mockData];

    if (filters.search) {
      filteredData = filteredData.filter(
        (app) =>
          app.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          app.description?.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Paginação correta
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginatedData = filteredData.slice(startIndex, startIndex + limit);

    return {
      total_apps: filteredData.length,
      apps: paginatedData,
      page,
      limit,
      total_pages: Math.ceil(filteredData.length / limit)
    };
  }
};
// Initialize sample products
fakeProducts.initialize();

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Mail,
  Globe,
  Download,
  Eye,
  Calendar,
  Building2,
  User,
  CreditCard,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

const ProfessionalInvoicePreview = () => {
  const [previewMode, setPreviewMode] = useState('pdf');

  // Sample data - em produção viria das props
  const invoiceData = {
    client: 'Empresa XYZ Ltda',
    clientEmail: 'contato@empresaxyz.com',
    clientPhone: '+55 11 9999-8888',
    clientAddress: 'Rua das Empresas, 123\nSão Paulo, SP - 01234-567',
    currency: 'BRL',
    invoiceNumber: 'INV-2025-001',
    issueDate: '2025-06-14',
    dueDate: '2025-07-14',
    items: [
      {
        description: 'Desenvolvimento de Sistema Web',
        quantity: 1,
        price: 5000,
        category: 'Desenvolvimento'
      },
      {
        description: 'Consultoria em UX/UI Design',
        quantity: 40,
        price: 150,
        category: 'Design'
      },
      {
        description: 'Hospedagem e Manutenção (3 meses)',
        quantity: 3,
        price: 200,
        category: 'Serviços'
      }
    ],
    notes:
      'Pagamento via PIX ou transferência bancária.\nDesconto de 5% para pagamento à vista.',
    footer:
      'Obrigado pela confiança! Entre em contato conosco para quaisquer dúvidas.',
    customFields: [
      { name: 'Projeto', value: 'Portal Corporativo v2.0' },
      { name: 'Prazo de Entrega', value: '30 dias úteis' }
    ],
    companyInfo: {
      name: 'TechSolutions Pro',
      cnpj: '12.345.678/0001-90',
      address: 'Av. Paulista, 1000 - Sala 15\nSão Paulo, SP - 01310-100',
      phone: '+55 11 3333-4444',
      email: 'contato@techsolutions.com',
      website: 'www.techsolutions.com'
    }
  };

  const subtotal = invoiceData.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const taxes = subtotal * 0.1; // 10% de impostos
  const total = subtotal + taxes;

  const PDFPreview = () => (
    <div className='overflow-hidden rounded-xl border border-gray-100 bg-white shadow-2xl'>
      {/* Header elegante */}
      <div className='bg-gradient-to-r from-slate-900 to-slate-700 p-8 text-white'>
        <div className='flex items-start justify-between'>
          <div>
            <h1 className='mb-2 text-3xl font-bold'>
              {invoiceData.companyInfo.name}
            </h1>
            <div className='space-y-1 text-slate-300'>
              <p className='flex items-center gap-2'>
                <Building2 size={16} />
                {invoiceData.companyInfo.address.replace('\n', ' • ')}
              </p>
              <p className='flex items-center gap-2'>
                <Phone size={16} />
                {invoiceData.companyInfo.phone} •{' '}
                {invoiceData.companyInfo.email}
              </p>
            </div>
          </div>
          <div className='text-right'>
            <div className='rounded-lg bg-white/10 p-4 backdrop-blur-sm'>
              <h2 className='text-2xl font-bold'>FATURA</h2>
              <p className='text-slate-300'>#{invoiceData.invoiceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Informações principais */}
      <div className='space-y-8 p-8'>
        {/* Dados do cliente e datas */}
        <div className='grid grid-cols-2 gap-8'>
          <div className='space-y-4'>
            <div>
              <h3 className='mb-3 text-sm font-semibold tracking-wide uppercase'>
                Faturar Para
              </h3>
              <div className='space-y-2 rounded-lg bg-gray-50 p-4'>
                <h4 className='font-semibold text-gray-900'>
                  {invoiceData.client}
                </h4>
                <p className='flex items-center gap-2'>
                  <Mail size={14} />
                  {invoiceData.clientEmail}
                </p>
                <p className='flex items-center gap-2'>
                  <Phone size={14} />
                  {invoiceData.clientPhone}
                </p>
                <p className='flex items-start gap-2'>
                  <MapPin size={14} className='mt-0.5' />
                  <span className='whitespace-pre-line'>
                    {invoiceData.clientAddress}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <div>
              <h3 className='mb-3 text-sm font-semibold tracking-wide text-gray-500 uppercase'>
                Detalhes da Fatura
              </h3>
              <div className='space-y-3'>
                <div className='flex justify-between border-b border-gray-100 py-2'>
                  <span className='text-gray-600'>Data de Emissão:</span>
                  <span className='font-medium'>
                    {new Date(invoiceData.issueDate).toLocaleDateString(
                      'pt-BR'
                    )}
                  </span>
                </div>
                <div className='flex justify-between border-b border-gray-100 py-2'>
                  <span className='text-gray-600'>Vencimento:</span>
                  <span className='font-medium text-orange-600'>
                    {new Date(invoiceData.dueDate).toLocaleDateString('pt-BR')}
                  </span>
                </div>
                <div className='flex justify-between py-2'>
                  <span className='text-gray-600'>Status:</span>
                  <Badge
                    variant='outline'
                    className='border-yellow-200 bg-yellow-50 text-yellow-700'
                  >
                    Pendente
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Campos personalizados */}
        {invoiceData.customFields.length > 0 && (
          <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
            <h3 className='mb-4 font-semibold text-blue-900'>
              Informações do Projeto
            </h3>
            <div className='grid grid-cols-2 gap-4'>
              {invoiceData.customFields.map((field, index) => (
                <div key={index} className='space-y-1'>
                  <span className='text-sm font-medium text-blue-800'>
                    {field.name}:
                  </span>
                  <p className='text-blue-700'>{field.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tabela de itens sofisticada */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Itens da Fatura
          </h3>
          <div className='overflow-hidden rounded-lg border border-gray-200'>
            <table className='w-full'>
              <thead className='bg-gray-50'>
                <tr>
                  <th className='px-6 py-4 text-left text-sm font-semibold text-gray-900'>
                    Descrição
                  </th>
                  <th className='px-6 py-4 text-center text-sm font-semibold text-gray-900'>
                    Qtd
                  </th>
                  <th className='px-6 py-4 text-right text-sm font-semibold text-gray-900'>
                    Valor Unit.
                  </th>
                  <th className='px-6 py-4 text-right text-sm font-semibold text-gray-900'>
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-gray-200'>
                {invoiceData.items.map((item, index) => (
                  <tr
                    key={index}
                    className='transition-colors hover:bg-gray-50'
                  >
                    <td className='px-6 py-4'>
                      <div>
                        <p className='font-medium text-gray-900'>
                          {item.description}
                        </p>
                        <p className='text-sm text-gray-500'>{item.category}</p>
                      </div>
                    </td>
                    <td className='px-6 py-4 text-center font-medium text-gray-900'>
                      {item.quantity}
                    </td>
                    <td className='px-6 py-4 text-right font-medium text-gray-900'>
                      {formatCurrency(item.price, invoiceData.currency)}
                    </td>
                    <td className='px-6 py-4 text-right font-bold text-gray-900'>
                      {formatCurrency(
                        item.price * item.quantity,
                        invoiceData.currency
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totais elegantes */}
        <div className='flex justify-end'>
          <div className='w-80 space-y-3'>
            <div className='flex justify-between py-2 text-gray-600'>
              <span>Subtotal:</span>
              <span className='font-medium'>
                {formatCurrency(subtotal, invoiceData.currency)}
              </span>
            </div>
            <div className='flex justify-between py-2 text-gray-600'>
              <span>Impostos (10%):</span>
              <span className='font-medium'>
                {formatCurrency(taxes, invoiceData.currency)}
              </span>
            </div>
            <div className='border-t border-gray-300 pt-3'>
              <div className='flex items-center justify-between'>
                <span className='text-lg font-bold text-gray-900'>Total:</span>
                <span className='text-2xl font-bold text-slate-900'>
                  {formatCurrency(total, invoiceData.currency)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Observações */}
        {invoiceData.notes && (
          <div className='rounded-lg border border-amber-200 bg-amber-50 p-6'>
            <h3 className='mb-3 flex items-center gap-2 font-semibold text-amber-900'>
              <CheckCircle2 size={18} />
              Instruções de Pagamento
            </h3>
            <p className='leading-relaxed whitespace-pre-line text-amber-800'>
              {invoiceData.notes}
            </p>
          </div>
        )}
      </div>

      {/* Footer elegante */}
      {invoiceData.footer && (
        <div className='border-t border-gray-200 bg-gray-50 px-8 py-6'>
          <p className='text-center text-gray-600 italic'>
            {invoiceData.footer}
          </p>
          <div className='mt-2 text-center text-sm text-gray-500'>
            CNPJ: {invoiceData.companyInfo.cnpj} •{' '}
            {invoiceData.companyInfo.website}
          </div>
        </div>
      )}
    </div>
  );

  const EmailPreview = () => (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl'>
      {/* Email header */}
      <div className='bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white'>
        <div className='flex items-center gap-3'>
          <Mail size={24} />
          <h3 className='text-xl font-semibold'>Nova Fatura Disponível</h3>
        </div>
      </div>

      {/* Email metadata */}
      <div className='border-b border-gray-200 bg-gray-50 px-6 py-4'>
        <div className='space-y-2 text-sm'>
          <div>
            <span className='font-medium'>Para:</span> {invoiceData.clientEmail}
          </div>
          <div>
            <span className='font-medium'>Assunto:</span> Fatura #
            {invoiceData.invoiceNumber} -{' '}
            {formatCurrency(total, invoiceData.currency)}
          </div>
          <div>
            <span className='font-medium'>De:</span>{' '}
            {invoiceData.companyInfo.email}
          </div>
        </div>
      </div>

      {/* Email body */}
      <div className='space-y-6 p-6'>
        <div className='space-y-4'>
          <h2 className='text-xl font-semibold text-gray-900'>
            Olá, {invoiceData.client}!
          </h2>

          <p className='leading-relaxed text-gray-700'>
            Esperamos que esteja tudo bem! Temos uma nova fatura disponível para
            seu projeto.
          </p>

          {/* Invoice summary card */}
          <div className='rounded-lg border border-blue-100 bg-gradient-to-r from-slate-50 to-blue-50 p-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h3 className='font-semibold text-slate-900'>Resumo da Fatura</h3>
              <Badge className='bg-blue-100 text-blue-800'>
                {invoiceData.invoiceNumber}
              </Badge>
            </div>

            <div className='mb-4 grid grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-gray-600'>Valor Total</p>
                <p className='text-2xl font-bold text-slate-900'>
                  {formatCurrency(total, invoiceData.currency)}
                </p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Vencimento</p>
                <p className='text-lg font-semibold text-orange-600'>
                  {new Date(invoiceData.dueDate).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>

            <div className='space-y-2'>
              {invoiceData.items.slice(0, 2).map((item, index) => (
                <div key={index} className='flex justify-between text-sm'>
                  <span className='text-gray-700'>{item.description}</span>
                  <span className='font-medium'>
                    {formatCurrency(
                      item.price * item.quantity,
                      invoiceData.currency
                    )}
                  </span>
                </div>
              ))}
              {invoiceData.items.length > 2 && (
                <div className='text-sm text-gray-500 italic'>
                  + {invoiceData.items.length - 2} item(s) adicional(s)
                </div>
              )}
            </div>
          </div>

          <div className='space-y-3'>
            <Button className='w-full bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700'>
              <CreditCard className='mr-2' size={20} />
              Visualizar e Pagar Fatura
            </Button>

            <Button variant='outline' className='w-full border-gray-300'>
              <Download className='mr-2' size={18} />
              Baixar PDF
            </Button>
          </div>

          {invoiceData.notes && (
            <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-4'>
              <h4 className='mb-2 font-medium text-yellow-900'>
                Instruções de Pagamento:
              </h4>
              <p className='text-sm whitespace-pre-line text-yellow-800'>
                {invoiceData.notes}
              </p>
            </div>
          )}

          <p className='text-sm leading-relaxed text-gray-600'>
            Se você tiver alguma dúvida sobre esta fatura, não hesite em nos
            contatar. Estamos aqui para ajudar!
          </p>

          <div className='pt-4 text-center'>
            <p className='font-medium text-gray-900'>
              Obrigado pela confiança!
            </p>
            <p className='text-gray-600'>{invoiceData.companyInfo.name}</p>
          </div>
        </div>
      </div>

      {/* Email footer */}
      <div className='bg-gray-100 px-6 py-4 text-center text-sm text-gray-500'>
        <p>{invoiceData.companyInfo.address.replace('\n', ' • ')}</p>
        <p>
          {invoiceData.companyInfo.phone} • {invoiceData.companyInfo.email}
        </p>
      </div>
    </div>
  );

  const WebPreview = () => (
    <div className='overflow-hidden rounded-lg border border-gray-200 bg-white shadow-xl'>
      {/* Web header */}
      <div className='bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-white'>
        <div className='space-y-2 text-center'>
          <h1 className='text-3xl font-bold'>Portal de Pagamento</h1>
          <p className='text-emerald-100'>
            Fatura #{invoiceData.invoiceNumber}
          </p>
        </div>
      </div>

      <div className='space-y-8 p-8'>
        {/* Status e valor principal */}
        <div className='space-y-4 text-center'>
          <div className='inline-flex items-center gap-2 rounded-full border border-yellow-200 bg-yellow-50 px-4 py-2 text-yellow-800'>
            <Calendar size={16} />
            <span className='font-medium'>
              Vence em{' '}
              {new Date(invoiceData.dueDate).toLocaleDateString('pt-BR')}
            </span>
          </div>

          <div>
            <p className='mb-2 text-gray-600'>Valor Total a Pagar</p>
            <p className='text-5xl font-bold text-gray-900'>
              {formatCurrency(total, invoiceData.currency)}
            </p>
          </div>

          <div className='flex justify-center space-x-4'>
            <Button
              size='lg'
              className='bg-emerald-600 px-8 hover:bg-emerald-700'
            >
              <CreditCard className='mr-2' />
              Pagar Agora
            </Button>
            <Button variant='outline' size='lg'>
              <Download className='mr-2' />
              Baixar PDF
            </Button>
          </div>
        </div>

        {/* Progress bar */}
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-600'>Status do Pagamento</span>
            <span className='font-medium text-yellow-600'>Aguardando</span>
          </div>
          <div className='h-2 w-full rounded-full bg-gray-200'>
            <div className='h-2 w-0 rounded-full bg-yellow-500 transition-all duration-500'></div>
          </div>
        </div>

        {/* Client info card */}
        <div className='rounded-lg bg-gray-50 p-6'>
          <h3 className='mb-4 flex items-center gap-2 font-semibold text-gray-900'>
            <User size={18} />
            Informações do Cliente
          </h3>
          <div className='grid grid-cols-2 gap-4 text-sm'>
            <div>
              <p className='text-gray-600'>Cliente:</p>
              <p className='font-medium'>{invoiceData.client}</p>
            </div>
            <div>
              <p className='text-gray-600'>Email:</p>
              <p className='font-medium'>{invoiceData.clientEmail}</p>
            </div>
          </div>
        </div>

        {/* Items table simplificada */}
        <div className='space-y-4'>
          <h3 className='font-semibold text-gray-900'>Detalhes da Cobrança</h3>
          <div className='space-y-3'>
            {invoiceData.items.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between border-b border-gray-100 py-3'
              >
                <div>
                  <p className='font-medium text-gray-900'>
                    {item.description}
                  </p>
                  <p className='text-sm text-gray-500'>
                    {item.quantity}x{' '}
                    {formatCurrency(item.price, invoiceData.currency)}
                  </p>
                </div>
                <p className='font-semibold text-gray-900'>
                  {formatCurrency(
                    item.price * item.quantity,
                    invoiceData.currency
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Payment methods */}
        <div className='rounded-lg border border-blue-200 bg-blue-50 p-6'>
          <h3 className='mb-4 font-semibold text-blue-900'>
            Métodos de Pagamento Aceitos
          </h3>
          <div className='grid grid-cols-3 gap-4 text-center'>
            <div className='space-y-2'>
              <div className='rounded-lg border border-blue-200 bg-white p-3'>
                <CreditCard className='mx-auto text-blue-600' size={24} />
              </div>
              <p className='text-sm font-medium text-blue-800'>Cartão</p>
            </div>
            <div className='space-y-2'>
              <div className='rounded-lg border border-blue-200 bg-white p-3'>
                <Building2 className='mx-auto text-blue-600' size={24} />
              </div>
              <p className='text-sm font-medium text-blue-800'>PIX</p>
            </div>
            <div className='space-y-2'>
              <div className='rounded-lg border border-blue-200 bg-white p-3'>
                <Calendar className='mx-auto text-blue-600' size={24} />
              </div>
              <p className='text-sm font-medium text-blue-800'>Boleto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreview = () => {
    switch (previewMode) {
      case 'pdf':
        return <PDFPreview />;
      case 'email':
        return <EmailPreview />;
      case 'web':
        return <WebPreview />;
      default:
        return <PDFPreview />;
    }
  };

  return (
    <div className='mx-auto max-w-6xl space-y-6 p-6'>
      {/* Mode selector */}
      <div className='bg-background/50 border-gray-20 rounded-lg border p-4 shadow-sm'>
        <div className='flex items-center justify-between'>
          <h2 className='text-xl font-semibold'>Prévia da Fatura</h2>
          <div className='flex gap-2'>
            <Button
              variant={previewMode === 'pdf' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('pdf')}
              className='flex items-center gap-2'
            >
              <FileText size={16} />
              PDF
            </Button>
            <Button
              variant={previewMode === 'email' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('email')}
              className='flex items-center gap-2'
            >
              <Mail size={16} />
              Email
            </Button>
            <Button
              variant={previewMode === 'web' ? 'default' : 'outline'}
              onClick={() => setPreviewMode('web')}
              className='flex items-center gap-2'
            >
              <Globe size={16} />
              Portal
            </Button>
          </div>
        </div>
      </div>

      {/* Preview content */}
      <div className='bg-background rounded-lg p-8'>{renderPreview()}</div>
    </div>
  );
};

export default ProfessionalInvoicePreview;

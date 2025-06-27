'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import {
  IconPlus,
  IconArrowLeft,
  IconEye,
  IconMail,
  IconFileDownload,
  IconX
} from '@tabler/icons-react';
import Link from 'next/link';
import ProfessionalInvoicePreview from '@/components/invoice-preview-modal';

export default function CreateInvoicePage() {
  const router = useRouter();
  const [client, setClient] = useState('');
  const [currency, setCurrency] = useState('BRL');
  const [items, setItems] = useState<
    { description: string; quantity: number; price: number }[]
  >([{ description: '', quantity: 1, price: 0 }]);
  const [paymentMethod, setPaymentMethod] = useState('request');
  const [notes, setNotes] = useState('');
  const [footer, setFooter] = useState('');
  const [customFields, setCustomFields] = useState<
    { name: string; value: string }[]
  >([]);
  const [taxId, setTaxId] = useState('');
  const [pageSize, setPageSize] = useState('auto');
  const [previewMode, setPreviewMode] = useState<'pdf' | 'email' | 'web'>(
    'pdf'
  );
  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  const addItem = () => {
    setItems([...items, { description: '', quantity: 1, price: 0 }]);
  };

  const updateItem = (index: number, field: string, value: string | number) => {
    const newItems = [...items];
    if (field in newItems[index]) {
      (newItems[index] as any)[field] = value;
    }
    setItems(newItems);
  };

  const removeItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(
      newItems.length > 0
        ? newItems
        : [{ description: '', quantity: 1, price: 0 }]
    );
  };

  const addCustomField = () => {
    setCustomFields([...customFields, { name: '', value: '' }]);
  };

  const updateCustomField = (
    index: number,
    field: keyof { name: string; value: string },
    value: string
  ) => {
    const newFields = [...customFields];
    newFields[index][field] = value;
    setCustomFields(newFields);
  };

  const removeCustomField = (index: number) => {
    const newFields = [...customFields];
    newFields.splice(index, 1);
    setCustomFields(newFields);
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para criar a fatura
    router.push('/apps/123/dashboard/transactions/invoices');
  };

  if (!isClientLoaded) {
    return null;
  }

  return (
    <div className='flex h-screen flex-col bg-gray-50'>
      {/* Header */}
      <div className='bg-background flex items-center justify-between border-b px-6 py-4'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/apps/123/dashboard/transactions/invoices'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <IconArrowLeft className='h-4 w-4' />
          </Link>
          <h1 className='text-xl font-semibold'>Criar Fatura</h1>
        </div>
        <div className='flex space-x-2'>
          <Button onClick={handleSubmit}>Salvar Fatura</Button>
        </div>
      </div>

      {/* Main Content - Split View */}
      <div className='bg-background flex flex-1 overflow-hidden'>
        {/* Form Section */}
        <div className='w-1/2 overflow-y-auto p-6'>
          {/* Client Section */}
          <div className='mb-6'>
            <h2 className='mb-4 text-lg font-medium'>Informações do Cliente</h2>
            <Card>
              <CardContent className='space-y-4 p-4'>
                <div>
                  <Label htmlFor='client'>Cliente</Label>
                  <Input
                    id='client'
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    placeholder='Nome do cliente ou email'
                    className='mt-1'
                  />
                </div>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <Label htmlFor='currency'>Moeda</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger className='mt-1'>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='BRL'>
                          BRL - Real Brasileiro
                        </SelectItem>
                        <SelectItem value='USD'>
                          USD - Dólar Americano
                        </SelectItem>
                        <SelectItem value='EUR'>EUR - Euro</SelectItem>
                        <SelectItem value='GBP'>
                          GBP - Libra Esterlina
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor='tax-id'>ID fiscal</Label>
                    <Input
                      id='tax-id'
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      placeholder='CNPJ/CPF'
                      className='mt-1'
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Items Section */}
          <div className='mb-6'>
            <div className='mb-4 flex items-center justify-between'>
              <h2 className='text-lg font-medium'>Itens</h2>
              <Button variant='outline' size='sm' onClick={addItem}>
                <IconPlus className='mr-2 h-4 w-4' />
                Adicionar Item
              </Button>
            </div>
            <Card>
              <CardContent className='space-y-4 p-4'>
                {items.map((item, index) => (
                  <div key={index} className='space-y-3'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-sm font-medium'>Item #{index + 1}</h3>
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => removeItem(index)}
                        className='text-red-500 hover:text-red-600'
                      >
                        <IconX className='h-4 w-4' />
                      </Button>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                      <div className='col-span-2'>
                        <Label htmlFor={`item-${index}-description`}>
                          Descrição
                        </Label>
                        <Input
                          id={`item-${index}-description`}
                          value={item.description}
                          onChange={(e) =>
                            updateItem(index, 'description', e.target.value)
                          }
                          placeholder='Descrição do serviço/produto'
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label htmlFor={`item-${index}-quantity`}>
                          Quantidade
                        </Label>
                        <Input
                          id={`item-${index}-quantity`}
                          type='number'
                          min='1'
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(
                              index,
                              'quantity',
                              parseInt(e.target.value) || 0
                            )
                          }
                          className='mt-1'
                        />
                      </div>
                      <div>
                        <Label htmlFor={`item-${index}-price`}>
                          Preço Unitário
                        </Label>
                        <div className='relative mt-1'>
                          <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500'>
                            {currency === 'BRL'
                              ? 'R$'
                              : currency === 'USD'
                                ? '$'
                                : currency === 'EUR'
                                  ? '€'
                                  : '£'}
                          </span>
                          <Input
                            id={`item-${index}-price`}
                            type='number'
                            step='0.01'
                            min='0'
                            value={item.price}
                            onChange={(e) =>
                              updateItem(
                                index,
                                'price',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className='pl-10'
                          />
                        </div>
                      </div>
                    </div>
                    <Separator className='my-2' />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Payment Section */}
          <div className='mb-6'>
            <h2 className='mb-4 text-lg font-medium'>Método de Pagamento</h2>
            <Card>
              <CardContent className='space-y-4 p-4'>
                <div className='space-y-3'>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='radio'
                      id='request-payment'
                      name='payment-method'
                      value='request'
                      checked={paymentMethod === 'request'}
                      onChange={() => setPaymentMethod('request')}
                      className='text-primary focus:ring-primary h-4 w-4'
                    />
                    <div>
                      <Label htmlFor='request-payment'>
                        Solicitar pagamento
                      </Label>
                      <p className='text-sm text-gray-500'>
                        O cliente receberá uma solicitação de pagamento
                      </p>
                    </div>
                  </div>
                  <div className='flex items-center space-x-3'>
                    <input
                      type='radio'
                      id='auto-charge'
                      name='payment-method'
                      value='auto'
                      checked={paymentMethod === 'auto'}
                      onChange={() => setPaymentMethod('auto')}
                      className='text-primary focus:ring-primary h-4 w-4'
                    />
                    <div>
                      <Label htmlFor='auto-charge'>Cobrança automática</Label>
                      <p className='text-sm text-gray-500'>
                        Cobrar automaticamente o método de pagamento salvo do
                        cliente
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Options */}
          <div className='mb-6'>
            <h2 className='mb-4 text-lg font-medium'>Opções Adicionais</h2>
            <Card>
              <CardContent className='space-y-4 p-4'>
                <div>
                  <Label htmlFor='notes'>Observações</Label>
                  <Textarea
                    id='notes'
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='Mensagem para o cliente'
                    rows={3}
                    className='mt-1'
                  />
                </div>
                <div>
                  <Label htmlFor='footer'>Rodapé</Label>
                  <Textarea
                    id='footer'
                    value={footer}
                    onChange={(e) => setFooter(e.target.value)}
                    placeholder='Texto do rodapé'
                    rows={2}
                    className='mt-1'
                  />
                </div>
                <div>
                  <div className='mb-2 flex items-center justify-between'>
                    <Label>Campos Personalizados</Label>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={addCustomField}
                    >
                      <IconPlus className='mr-2 h-4 w-4' />
                      Adicionar
                    </Button>
                  </div>
                  {customFields.length > 0 ? (
                    <div className='space-y-2'>
                      {customFields.map((field, index) => (
                        <div
                          key={index}
                          className='flex items-center space-x-2'
                        >
                          <Input
                            value={field.name}
                            onChange={(e) =>
                              updateCustomField(index, 'name', e.target.value)
                            }
                            placeholder='Nome do campo'
                            className='flex-1'
                          />
                          <Input
                            value={field.value}
                            onChange={(e) =>
                              updateCustomField(index, 'value', e.target.value)
                            }
                            placeholder='Valor'
                            className='flex-1'
                          />
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeCustomField(index)}
                            className='text-red-500 hover:text-red-600'
                          >
                            <IconX className='h-4 w-4' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='py-2 text-sm text-gray-500'>
                      Nenhum campo personalizado adicionado
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Preview Section */}
        <div className='bg-background/50 w-1/2 overflow-y-auto border-l p-6'>
          <div className='mt-4'>
            <ProfessionalInvoicePreview
            //   mode={previewMode}
            //   invoiceData={{
            //     client,
            //     currency,
            //     items,
            //     total: calculateTotal(),
            //     paymentMethod,
            //     notes,
            //     footer,
            //     customFields,
            //     taxId
            //   }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

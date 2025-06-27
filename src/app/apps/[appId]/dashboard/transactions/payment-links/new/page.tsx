'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
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
  Plus,
  ArrowLeft,
  Eye,
  Mail,
  Download,
  X,
  Link as LinkIcon,
  CreditCard,
  Landmark,
  QrCode
} from 'lucide-react';
import Link from 'next/link';

export default function CreatePaymentLinkPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    amount: null as number | null,
    currency: 'BRL',
    paymentMethods: ['pix', 'credit_card'] as string[],
    expirationDays: null as number | null,
    maxInstallments: 1,
    customFields: [] as { name: string; required: boolean }[]
  });

  const [isClientLoaded, setIsClientLoaded] = useState(false);

  useEffect(() => {
    setIsClientLoaded(true);
  }, []);

  const handleChange = (field: keyof typeof formData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addCustomField = () => {
    handleChange('customFields', [
      ...formData.customFields,
      { name: '', required: false }
    ]);
  };

  const updateCustomField = (
    index: number,
    field: 'name' | 'required',
    value: string | boolean
  ) => {
    const newFields = [...formData.customFields];
    newFields[index][field] = value as never;
    handleChange('customFields', newFields);
  };

  const removeCustomField = (index: number) => {
    handleChange(
      'customFields',
      formData.customFields.filter((_, i) => i !== index)
    );
  };

  const togglePaymentMethod = (method: string) => {
    const methods = formData.paymentMethods.includes(method)
      ? formData.paymentMethods.filter((m) => m !== method)
      : [...formData.paymentMethods, method];
    handleChange('paymentMethods', methods);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para criar o link de pagamento
    router.push('/apps/123/dashboard/payment-links');
  };

  if (!isClientLoaded) {
    return null;
  }

  const paymentMethodIcons = {
    pix: <QrCode className='h-4 w-4' />,
    credit_card: <CreditCard className='h-4 w-4' />,
    boleto: <Landmark className='h-4 w-4' />
  };

  return (
    <div className='bg-muted/40 flex min-h-screen flex-col'>
      {/* Header */}
      <header className='bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10 flex items-center justify-between border-b px-6 py-3 backdrop-blur'>
        <div className='flex items-center space-x-4'>
          <Link
            href='/apps/123/dashboard/transactions/payment-links'
            className={buttonVariants({ variant: 'ghost', size: 'sm' })}
          >
            <ArrowLeft className='h-4 w-4' />
          </Link>
          <div>
            <h1 className='text-lg font-semibold'>Criar Link de Pagamento</h1>
            <p className='text-muted-foreground text-sm'>
              Gere links para receber pagamentos de forma rápida e segura
            </p>
          </div>
        </div>
        <div className='flex space-x-2'>
          <Button onClick={handleSubmit}>Gerar Link</Button>
        </div>
      </header>

      {/* Main Content */}
      <main className='flex flex-1 overflow-hidden'>
        {/* Form Section */}
        <section className='w-full overflow-y-auto p-6'>
          <div className='space-y-6'>
            {/* Basic Info Section */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Informações Básicas</CardTitle>
                <CardDescription>
                  Configure os detalhes principais do seu link de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='grid gap-4 md:grid-cols-2'>
                  <div className='space-y-2'>
                    <Label htmlFor='name'>Nome do Link*</Label>
                    <Input
                      id='name'
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder='Ex: Pagamento de serviço'
                      required
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='currency'>Moeda</Label>
                    <Select
                      value={formData.currency}
                      onValueChange={(value) => handleChange('currency', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='BRL'>
                          BRL - Real Brasileiro
                        </SelectItem>
                        <SelectItem value='USD'>
                          USD - Dólar Americano
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='description'>Descrição</Label>
                  <Textarea
                    id='description'
                    value={formData.description}
                    onChange={(e) =>
                      handleChange('description', e.target.value)
                    }
                    placeholder='Descreva o que está sendo cobrado'
                    rows={3}
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='amount'>Valor*</Label>
                  <div className='relative'>
                    <span className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2 text-sm'>
                      {formData.currency === 'BRL' ? 'R$' : '$'}
                    </span>
                    <Input
                      id='amount'
                      type='number'
                      min='0'
                      step='0.01'
                      value={formData.amount || ''}
                      onChange={(e) =>
                        handleChange(
                          'amount',
                          parseFloat(e.target.value) || null
                        )
                      }
                      placeholder='0,00'
                      className='pl-8'
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods Section */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>Métodos de Pagamento</CardTitle>
                <CardDescription>
                  Selecione as formas de pagamento disponíveis
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-3'>
                  {['pix', 'credit_card', 'boleto'].map((method) => (
                    <div key={method} className='flex items-center space-x-3'>
                      <button
                        type='button'
                        onClick={() => togglePaymentMethod(method)}
                        className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                          formData.paymentMethods.includes(method)
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-muted'
                        }`}
                      >
                        {formData.paymentMethods.includes(method) && (
                          <span className='h-3 w-3 rounded-full bg-current' />
                        )}
                      </button>
                      <div className='flex items-center space-x-2'>
                        {
                          paymentMethodIcons[
                            method as keyof typeof paymentMethodIcons
                          ]
                        }
                        <Label htmlFor={`${method}-method`}>
                          {method === 'pix'
                            ? 'PIX'
                            : method === 'credit_card'
                              ? 'Cartão de Crédito'
                              : 'Boleto Bancário'}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>

                {formData.paymentMethods.includes('credit_card') && (
                  <div className='ml-8 space-y-2'>
                    <Label htmlFor='max-installments'>
                      Parcelamento máximo
                    </Label>
                    <Select
                      value={formData.maxInstallments.toString()}
                      onValueChange={(value) =>
                        handleChange('maxInstallments', parseInt(value))
                      }
                    >
                      <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Selecione' />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num === 1 ? 'À vista' : `Até ${num}x`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Advanced Options */}
            <Card>
              <CardHeader>
                <CardTitle className='text-lg'>
                  Configurações Avançadas
                </CardTitle>
                <CardDescription>
                  Personalize o comportamento do seu link de pagamento
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <Label htmlFor='expiration'>Expiração (dias)</Label>
                  <Input
                    id='expiration'
                    type='number'
                    min='1'
                    value={formData.expirationDays || ''}
                    onChange={(e) =>
                      handleChange(
                        'expirationDays',
                        parseInt(e.target.value) || null
                      )
                    }
                    placeholder='Número de dias até expirar'
                    className='w-[180px]'
                  />
                  <p className='text-muted-foreground text-sm'>
                    Deixe em branco para não expirar
                  </p>
                </div>

                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <div>
                      <Label>Campos Personalizados</Label>
                      <p className='text-muted-foreground text-sm'>
                        Colete informações adicionais do cliente
                      </p>
                    </div>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={addCustomField}
                    >
                      <Plus className='mr-2 h-4 w-4' />
                      Adicionar Campo
                    </Button>
                  </div>

                  {formData.customFields.length > 0 ? (
                    <div className='space-y-3'>
                      {formData.customFields.map((field, index) => (
                        <div key={index} className='flex items-start gap-3'>
                          <div className='grid flex-1 gap-2'>
                            <Input
                              value={field.name}
                              onChange={(e) =>
                                updateCustomField(index, 'name', e.target.value)
                              }
                              placeholder='Nome do campo (ex: Telefone, CPF)'
                            />
                            <div className='flex items-center space-x-2'>
                              <button
                                type='button'
                                onClick={() =>
                                  updateCustomField(
                                    index,
                                    'required',
                                    !field.required
                                  )
                                }
                                className={`flex h-4 w-4 items-center justify-center rounded-sm border transition-colors ${
                                  field.required
                                    ? 'border-primary bg-primary text-primary-foreground'
                                    : 'border-muted'
                                }`}
                              >
                                {field.required && (
                                  <span className='h-2 w-2 rounded-full bg-current' />
                                )}
                              </button>
                              <Label
                                htmlFor={`field-${index}-required`}
                                className='text-sm'
                              >
                                Campo obrigatório
                              </Label>
                            </div>
                          </div>
                          <Button
                            variant='ghost'
                            size='sm'
                            onClick={() => removeCustomField(index)}
                            className='text-destructive hover:text-destructive'
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className='rounded-md border border-dashed p-4 text-center'>
                      <p className='text-muted-foreground text-sm'>
                        Nenhum campo personalizado adicionado
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Preview Section */}
        <section className='bg-muted/40 hidden w-1/3 overflow-y-auto border-l p-6 lg:block'>
          <div className='sticky top-6 space-y-6'>
            <Card>
              <CardHeader>
                <div className='flex items-center space-x-2'>
                  <LinkIcon className='text-primary h-5 w-5' />
                  <CardTitle>Prévia do Link</CardTitle>
                </div>
                <CardDescription>
                  Como seu link de pagamento será exibido
                </CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='bg-card rounded-lg border p-4 shadow-sm'>
                  <h3 className='font-medium'>
                    {formData.name || 'Pagamento de serviço'}
                  </h3>
                  <p className='text-muted-foreground mt-1 text-sm'>
                    {formData.description || 'Descrição do pagamento'}
                  </p>
                  <div className='mt-4 flex items-center justify-between'>
                    <div>
                      <p className='text-muted-foreground text-sm'>Valor</p>
                      <p className='text-xl font-semibold'>
                        {formData.amount
                          ? new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: formData.currency
                            }).format(formData.amount)
                          : 'R$ 0,00'}
                      </p>
                    </div>
                    <Button className='from-primary to-primary/90 bg-gradient-to-r'>
                      Pagar Agora
                    </Button>
                  </div>
                </div>

                <div className='bg-card rounded-lg border p-4 shadow-sm'>
                  <h4 className='text-sm font-medium'>Métodos de pagamento</h4>
                  <div className='mt-3 space-y-3'>
                    {formData.paymentMethods.includes('pix') && (
                      <div className='flex items-center space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600'>
                          <QrCode className='h-4 w-4' />
                        </div>
                        <span className='text-sm'>PIX</span>
                      </div>
                    )}
                    {formData.paymentMethods.includes('credit_card') && (
                      <div className='flex items-center space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600'>
                          <CreditCard className='h-4 w-4' />
                        </div>
                        <span className='text-sm'>
                          Cartão de Crédito{' '}
                          {formData.maxInstallments > 1
                            ? `(até ${formData.maxInstallments}x)`
                            : ''}
                        </span>
                      </div>
                    )}
                    {formData.paymentMethods.includes('boleto') && (
                      <div className='flex items-center space-x-3'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-violet-100 text-violet-600'>
                          <Landmark className='h-4 w-4' />
                        </div>
                        <span className='text-sm'>Boleto Bancário</span>
                      </div>
                    )}
                  </div>
                </div>

                {formData.expirationDays && (
                  <div className='bg-card rounded-lg border p-4 shadow-sm'>
                    <h4 className='text-sm font-medium'>Expiração</h4>
                    <p className='text-muted-foreground mt-1 text-sm'>
                      Este link expira em {formData.expirationDays} dia
                      {formData.expirationDays > 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}

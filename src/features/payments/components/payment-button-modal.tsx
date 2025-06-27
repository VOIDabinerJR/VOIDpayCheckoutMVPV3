'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  IconPlus,
  IconLink,
  IconShieldLock,
  IconMail,
  IconLoader2
} from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface PaymentButtonModalProps {
  children?: React.ReactNode;
  onCreate?: (
    name: string,
    webhookUrl: string,
    clientSecret: string
  ) => Promise<void>;
}

export default function PaymentButtonModal({
  children,
  onCreate
}: PaymentButtonModalProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [webhookUrl, setWebhookUrl] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<'form' | 'confirmation'>('form');

  const handleCreate = async () => {
    if (!name || !webhookUrl || !clientSecret) {
      toast.error('Preencha todos os campos obrigatórios');
      return;
    }

    try {
      setIsProcessing(true);
      await onCreate?.(name, webhookUrl, clientSecret);
      setStep('confirmation');
    } catch (error) {
      toast.error('Falha ao criar botão de pagamento');
    } finally {
      setIsProcessing(false);
    }
  };

  const resetForm = () => {
    setName('');
    setWebhookUrl('');
    setClientSecret('');
    setStep('form');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) resetForm();
      setOpen(isOpen);
    }}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <IconPlus className='mr-2 h-4 w-4' />
            Criar Botão
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        {step === 'form' ? (
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <IconLink className='h-5 w-5' />
                Criar Novo Botão de Pagamento
              </DialogTitle>
            </DialogHeader>

            <div className='space-y-4 py-4'>
              {/* Nome do Botão */}
              <div className='space-y-2'>
                <Label htmlFor='name'>Nome do Botão*</Label>
                <Input
                  id='name'
                  placeholder='Ex: Pagamento de Serviços'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <p className='text-muted-foreground text-xs'>
                  Este nome será exibido para seus clientes
                </p>
              </div>

              {/* Webhook URL */}
              <div className='space-y-2'>
                <Label htmlFor='webhook'>URL de Webhook*</Label>
                <Input
                  id='webhook'
                  placeholder='https://seusite.com/webhook'
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                <p className='text-muted-foreground text-xs'>
                  Receberemos notificações de pagamento nesta URL
                </p>
              </div>

              {/* Client Secret */}
              <div className='space-y-2'>
                <Label htmlFor='secret'>Client Secret*</Label>
                <Input
                  id='secret'
                  type='password'
                  placeholder='Insira sua chave secreta'
                  value={clientSecret}
                  onChange={(e) => setClientSecret(e.target.value)}

                />
                <p className='text-muted-foreground text-xs'>
                  Chave de segurança para autenticação
                </p>
              </div>

              {/* Warning */}
              <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200'>
                <p className='font-medium flex items-center gap-2'>
                  <IconShieldLock className='h-4 w-4' />
                  Atenção
                </p>
                <ul className='mt-2 list-disc pl-5 space-y-1'>
                  <li>Não feche esta página durante a criação</li>
                  <li>Verifique os dados antes de confirmar</li>
                  <li>Você receberá um email para ativação</li>
                </ul>
              </div>

              <Button
                className='w-full mt-4'
                disabled={!name || !webhookUrl || !clientSecret || isProcessing}
                onClick={handleCreate}
              >
                {isProcessing ? (
                  <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  <IconPlus className='mr-2 h-4 w-4' />
                )}
                {isProcessing ? 'Criando...' : 'Criar Botão'}
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className='flex items-center gap-2'>
                <IconMail className='h-5 w-5 text-green-600' />
                Botão Criado com Sucesso!
              </DialogTitle>
            </DialogHeader>

            <div className='space-y-4 py-4'>
              <div className='rounded-lg border border-green-200 bg-green-50 p-4 text-center dark:border-green-800 dark:bg-green-900/20'>
                <p className='font-medium text-green-900 dark:text-green-200'>
                  Seu botão de pagamento foi criado com sucesso!
                </p>
                <p className='mt-2 text-sm text-green-800 dark:text-green-300'>
                  Um email de confirmação foi enviado para sua caixa de entrada.
                </p>
              </div>

              <div className='space-y-2'>
                <Label>Próximos passos:</Label>
                <ol className='list-decimal pl-5 space-y-2 text-sm'>
                  <li>Verifique sua caixa de email</li>
                  <li>Clique no link de ativação</li>
                  <li>Configure as opções adicionais do botão</li>
                  <li>Comece a receber pagamentos!</li>
                </ol>
              </div>

              <div className='pt-2'>
                <Button
                  variant='outline'
                  className='w-full'
                  onClick={resetForm}
                >
                  Fechar
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
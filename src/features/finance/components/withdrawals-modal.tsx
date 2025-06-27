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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import {
  IconPlus,
  IconSettingsAutomation,
  IconMoneybag
} from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface WithdrawalModalProps {
  balance?: number;
  accounts?: { id: string; name: string }[];
  children?: React.ReactNode;
  onWithdraw?: (
    amount: number,
    accountId: string,
    reference?: string
  ) => Promise<void>;
}

export default function WithdrawalModal({
  balance = 0,
  accounts = [],
  children,
  onWithdraw
}: WithdrawalModalProps) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [selectedAccount, setSelectedAccount] = useState('');
  const [reference, setReference] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const calculateFee = (value: number) => value * 0.01;
  const calculateNetValue = (value: number) => value - calculateFee(value);

  const handleWithdraw = async () => {
    if (!amount || !selectedAccount) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    if (numericAmount > balance) {
      toast.error('Saldo insuficiente para este saque');
      return;
    }

    if (numericAmount < 500) {
      toast.error('O valor mínimo para saque é MZN 500.00');
      return;
    }

    if (numericAmount > 100000) {
      toast.error('O valor máximo por saque é MZN 100,000.00');
      return;
    }

    try {
      setIsProcessing(true);
      await onWithdraw?.(numericAmount, selectedAccount, reference);
      toast.success('Saque solicitado com sucesso');
      setOpen(false);
      setAmount('');
      setSelectedAccount('');
      setReference('');
    } catch (error) {
      toast.error('Falha ao processar saque');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline'>
            <IconMoneybag className='mr-2 h-4 w-4' />
            Solicitar Saque
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <IconMoneybag className='h-5 w-5' />
              Novo Saque
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Saldo disponível */}
          <div className='rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20'>
            <p className='text-sm font-medium text-blue-900 dark:text-blue-200'>
              Saldo disponível: MZN{' '}
              {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>

          {/* Valor do saque */}
          <div className='space-y-2'>
            <Label htmlFor='amount'>Valor (MZN)</Label>
            <Input
              id='amount'
              type='number'
              placeholder='0.00'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {/* Conta destino */}
          <div className='space-y-2'>
            <Label htmlFor='account'>Conta Destino</Label>
            <Select onValueChange={setSelectedAccount} value={selectedAccount}>
              <SelectTrigger>
                <SelectValue placeholder='Selecione uma conta' />
              </SelectTrigger>
              <SelectContent>
                {accounts.map((account) => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Referência */}
          <div className='space-y-2'>
            <Label htmlFor='reference'>Referência (Opcional)</Label>
            <Input
              id='reference'
              placeholder='Ex: Pagamento fornecedor'
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </div>

          {/* Resumo */}
          <div className='pt-2'>
            <div className='mb-2 flex justify-between text-sm'>
              <span className='text-muted-foreground'>Taxa:</span>
              <span>MZN {calculateFee(Number(amount || 0)).toFixed(2)}</span>
            </div>
            <div className='mb-2 flex justify-between text-sm'>
              <span className='text-muted-foreground'>Valor líquido:</span>
              <span className='font-medium'>
                MZN {calculateNetValue(Number(amount || 0)).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Limites */}
          <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200'>
            <p className='font-medium'>Limites de Saque</p>
            <div className='mt-2 grid grid-cols-2 gap-2'>
              <div>
                <span className='text-muted-foreground'>Mínimo:</span>
                <span> MZN 500.00</span>
              </div>
              <div>
                <span className='text-muted-foreground'>Máximo:</span>
                <span> MZN 100,000.00</span>
              </div>
            </div>
          </div>

          {/* Botão de confirmação */}
          <Button
            className='mt-4 w-full'
            disabled={!amount || !selectedAccount || isProcessing}
            onClick={handleWithdraw}
          >
            <IconPlus className='mr-2 h-4 w-4' />
            {isProcessing ? 'Processando...' : 'Solicitar Saque'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

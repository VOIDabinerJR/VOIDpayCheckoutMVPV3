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
  IconReceiptRefund,
  IconCreditCardRefund
} from '@tabler/icons-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface RefundModalProps {
  transactions?: { id: string; reference: string; amount: number }[];
  children?: React.ReactNode;
  onRefund?: (
    transactionId: string,
    amount: number,
    reason?: string
  ) => Promise<void>;
}

export default function RefundModal({
  transactions = [],
  children,
  onRefund
}: RefundModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const selectedTransactionData = transactions.find(
    (t) => t.id === selectedTransaction
  );

  const handleRefund = async () => {
    if (!selectedTransaction || !amount) return;

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount)) {
      toast.error('Por favor, insira um valor válido');
      return;
    }

    if (numericAmount <= 0) {
      toast.error('O valor do reembolso deve ser positivo');
      return;
    }

    if (
      selectedTransactionData &&
      numericAmount > selectedTransactionData.amount
    ) {
      toast.error('O valor não pode exceder o valor original da transação');
      return;
    }

    try {
      setIsProcessing(true);
      await onRefund?.(selectedTransaction, numericAmount, reason);
      toast.success('Reembolso solicitado com sucesso');
      setOpen(false);
      setSelectedTransaction('');
      setAmount('');
      setReason('');
    } catch (error) {
      toast.error('Falha ao processar reembolso');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant='outline'>
            <IconReceiptRefund className='mr-2 h-4 w-4' />
            Solicitar Reembolso
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className='sm:max-w-[600px]'>
        <DialogHeader>
          <DialogTitle>
            <div className='flex items-center gap-2'>
              <IconReceiptRefund className='h-5 w-5' />
              Novo Reembolso
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className='space-y-4 py-4'>
          {/* Seleção de transação */}
          <div className='space-y-2'>
            <Label htmlFor='transaction'>Transação Original</Label>
            <Select
              onValueChange={(value) => {
                setSelectedTransaction(value);
                const transaction = transactions.find((t) => t.id === value);
                if (transaction) {
                  setAmount(transaction.amount.toString());
                }
              }}
              value={selectedTransaction}
            >
              <SelectTrigger>
                <SelectValue placeholder='Selecione uma transação' />
              </SelectTrigger>
              <SelectContent>
                {transactions.map((transaction) => (
                  <SelectItem key={transaction.id} value={transaction.id}>
                    {transaction.reference} - MZN{' '}
                    {transaction.amount.toLocaleString('pt-BR', {
                      minimumFractionDigits: 2
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Valor do reembolso */}
          <div className='space-y-2'>
            <Label htmlFor='amount'>Valor (MZN)</Label>
            <Input
              id='amount'
              type='number'
              placeholder='0.00'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={!selectedTransaction}
            />
            {selectedTransactionData && (
              <p className='text-muted-foreground text-xs'>
                Valor máximo disponível: MZN{' '}
                {selectedTransactionData.amount.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2
                })}
              </p>
            )}
          </div>

          {/* Motivo do reembolso */}
          <div className='space-y-2'>
            <Label htmlFor='reason'>Motivo (Opcional)</Label>
            <Input
              id='reason'
              placeholder='Ex: Produto não entregue'
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          {/* Informações importantes */}
          <div className='rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-200'>
            <p className='font-medium'>Informações Importantes</p>
            <ul className='mt-2 list-disc space-y-1 pl-5'>
              <li>
                Reembolsos podem levar até 5 dias úteis para serem processados
              </li>
              <li>O valor será devolvido ao método de pagamento original</li>
              <li>Taxas de processamento não são reembolsáveis</li>
            </ul>
          </div>

          {/* Botão de confirmação */}
          <Button
            className='mt-4 w-full'
            disabled={!selectedTransaction || !amount || isProcessing}
            onClick={handleRefund}
          >
            <IconCreditCardRefund className='mr-2 h-4 w-4' />
            {isProcessing ? 'Processando...' : 'Solicitar Reembolso'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Refund } from '@/constants/data'; // Tipo Refund definido
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  IconCheck,
  IconX,
  IconClock,
  IconReceiptRefund,
  IconCreditCard,
  IconCash,
  IconExchange
} from '@tabler/icons-react';
import { ReactNode } from 'react';

export const columns: ColumnDef<Refund>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-sm'>#{row.getValue('id')}</div>
    ),
    meta: {
      label: 'ID',
      placeholder: 'Search by ID...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'amount',
    accessorKey: 'amount',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Amount' />
    ),
    cell: ({ row }) => (
      <div className='font-medium'>
        MZN{' '}
        {Number(row.getValue('amount')).toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        })}
      </div>
    ),
    meta: {
      label: 'Amount',
      placeholder: 'Filter by amount...',
      variant: 'number'
    },
    enableColumnFilter: true
  },
  {
    id: 'transaction_id',
    accessorKey: 'transaction_id',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Transaction ID' />
    ),
    cell: ({ row }) => (
      <div className='font-mono text-sm'>#{row.getValue('transaction_id')}</div>
    ),
    meta: {
      label: 'Transaction ID',
      placeholder: 'Search by transaction ID...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ row }) => {
      const type = row.getValue('type');
      return (
        <Badge variant='outline' className='flex items-center gap-1'>
          {type === 'full' && <IconReceiptRefund className='h-3 w-3' />}
          {type === 'partial' && <IconExchange className='h-3 w-3' />}
          {type as ReactNode}
        </Badge>
      );
    },
    meta: {
      label: 'Type',
      variant: 'select',
      options: [
        { label: 'Full Refund', value: 'full' },
        { label: 'Partial Refund', value: 'partial' }
      ]
    },
    enableColumnFilter: true
  },
  {
    id: 'payment_method',
    accessorKey: 'payment_method',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Payment Method' />
    ),
    cell: ({ row }) => {
      const method = row.getValue('payment_method');
      return (
        <Badge variant='outline' className='flex items-center gap-1'>
          {method === 'credit_card' && <IconCreditCard className='h-3 w-3' />}
          {method === 'debit_card' && <IconCreditCard className='h-3 w-3' />}
          {method === 'pix' && <IconCash className='h-3 w-3' />}
          {method === 'bank_transfer' && <IconCash className='h-3 w-3' />}
          {method as ReactNode}
        </Badge>
      );
    },
    meta: {
      label: 'Payment Method',
      variant: 'select',
      options: [
        { label: 'Credit Card', value: 'credit_card' },
        { label: 'Debit Card', value: 'debit_card' },
        { label: 'PIX', value: 'pix' },
        { label: 'Bank Transfer', value: 'bank_transfer' }
      ]
    },
    enableColumnFilter: true
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      const variant =
        status === 'completed'
          ? 'default'
          : status === 'failed'
            ? 'destructive'
            : status === 'processing'
              ? 'secondary'
              : status === 'pending_approval'
                ? 'outline'
                : 'outline';

      return (
        <Badge variant={variant} className='flex items-center gap-1'>
          {status === 'completed' && <IconCheck className='h-3 w-3' />}
          {status === 'failed' && <IconX className='h-3 w-3' />}
          {status === 'processing' && <IconClock className='h-3 w-3' />}
          {status === 'pending_approval' && <IconClock className='h-3 w-3' />}
          {status as ReactNode}
        </Badge>
      );
    },
    meta: {
      label: 'Status',
      variant: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'Processing', value: 'processing' },
        { label: 'Pending Approval', value: 'pending_approval' },
        { label: 'Failed', value: 'failed' }
      ]
    },
    enableColumnFilter: true
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Date' />
    ),
    cell: ({ row }) => (
      <div className='text-sm'>
        {new Date(row.getValue('created_at')).toLocaleString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    ),
    meta: {
      label: 'Date',
      variant: 'date'
    }
  },
  {
    id: 'reason',
    accessorKey: 'reason',
    header: ({ column }: { column: Column<Refund, unknown> }) => (
      <DataTableColumnHeader column={column} title='Reason' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {row.getValue('reason') || '-'}
      </div>
    ),
    meta: {
      label: 'Reason',
      placeholder: 'Filter by reason...',
      variant: 'text'
    },
    enableColumnFilter: true
  }
];

'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { Withdrawal } from '@/constants/data'; // Supondo que temos um tipo Withdrawal definido
import { Column, ColumnDef } from '@tanstack/react-table';
import {
  IconCheck,
  IconX,
  IconClock,
  IconMoneybag,
  IconBan,
  IconMovie
} from '@tabler/icons-react';
import { ReactNode } from 'react';

export const columns: ColumnDef<Withdrawal>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
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
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
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
    id: 'method',
    accessorKey: 'method',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
      <DataTableColumnHeader column={column} title='Method' />
    ),
    cell: ({ row }) => {
      const method = row.getValue('method');
      return (
        <Badge variant='outline' className='flex items-center gap-1'>
          {method === 'mpesa' && <IconMoneybag className='h-3 w-3' />}
          {method === 'bank' && <IconBan className='h-3 w-3' />}
          {method === 'pix' && <IconMoneybag className='h-3 w-3' />}
          {method === 'emola' && <IconMoneybag className='h-3 w-3' />}
          {method as ReactNode}
        </Badge>
      );
    },
    meta: {
      label: 'Method',
      variant: 'select',
      options: [
        { label: 'M-Pesa', value: 'mpesa' },
        { label: 'Bank Transfer', value: 'bank' },
        { label: 'PIX', value: 'pix' },
        { label: 'Emola', value: 'emola' }
      ]
    },
    enableColumnFilter: true
  },
  {
    id: 'destination',
    accessorKey: 'destination',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
      <DataTableColumnHeader column={column} title='Destination' />
    ),
    cell: ({ row }) => (
      <div className='text-sm'>
        {row.original.destination_name && (
          <div className='font-medium'>{row.original.destination_name}</div>
        )}
        <div className='text-muted-foreground text-xs'>
          {row.getValue('destination')}
        </div>
      </div>
    ),
    meta: {
      label: 'Destination',
      placeholder: 'Filter by destination...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
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
              : 'outline';

      return (
        <Badge variant={variant} className='flex items-center gap-1'>
          {status === 'completed' && <IconCheck className='h-3 w-3' />}
          {status === 'failed' && <IconX className='h-3 w-3' />}
          {status === 'processing' && <IconClock className='h-3 w-3' />}
          {status === 'pending' && <IconClock className='h-3 w-3' />}
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
        { label: 'Pending', value: 'pending' },
        { label: 'Failed', value: 'failed' }
      ]
    },
    enableColumnFilter: true
  },
  {
    id: 'created_at',
    accessorKey: 'created_at',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
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
    id: 'reference',
    accessorKey: 'reference',
    header: ({ column }: { column: Column<Withdrawal, unknown> }) => (
      <DataTableColumnHeader column={column} title='Reference' />
    ),
    cell: ({ row }) => (
      <div className='text-muted-foreground text-sm'>
        {row.getValue('reference') || '-'}
      </div>
    ),
    meta: {
      label: 'Reference',
      placeholder: 'Filter by reference...',
      variant: 'text'
    },
    enableColumnFilter: true
  }
  // Coluna de ações pode ser descomentada quando necessário
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];

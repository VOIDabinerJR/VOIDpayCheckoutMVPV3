'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { PaymentButton } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { IconLink, IconCopy, IconMail, IconShieldLock, IconCalendar } from '@tabler/icons-react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const columns: ColumnDef<PaymentButton>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Button Name" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <IconLink className="h-4 w-4 text-primary" />
        <span className="font-medium">{row.getValue('name') || 'Unnamed'}</span>
      </div>
    ),
    meta: {
      label: 'Name',
      placeholder: 'Filter by name...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'buttonToken',
    accessorKey: 'buttonToken',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Button Token" />
    ),
    cell: ({ row }) => {
      const token = row.getValue('buttonToken') as string;
      return (
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm truncate max-w-[180px]">
            {token}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={() => {
              navigator.clipboard.writeText(token);
              toast('Button token copied to clipboard');
            }}
          >
            <IconCopy className="h-3 w-3" />
          </Button>
        </div>
      );
    },
    meta: {
      label: 'Token',
      placeholder: 'Filter by token...',
      variant: 'text'
    },
    enableColumnFilter: true
  },
  {
    id: 'destination',
    accessorKey: 'destination',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Destination" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {row.getValue('destination') ? (
          <Badge variant="outline">{row.getValue('destination')}</Badge>
        ) : (
          <span className="text-muted-foreground">Not configured</span>
        )}
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
    id: 'createdAt',
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created Date" />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2 text-sm">
        <IconCalendar className="h-4 w-4 text-muted-foreground" />
        {new Date(row.getValue('createdAt')).toLocaleDateString('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    ),
    meta: {
      label: 'Created',
      variant: 'date'
    },
    sortingFn: 'datetime'
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      const needsActivation = row.original.needsActivation;
      
      return (
        <div className="flex items-center gap-2">
          {needsActivation ? (
            <Badge variant="secondary" className="flex items-center gap-1">
              <IconMail className="h-3 w-3" />
              Pending Activation
            </Badge>
          ) : status === 'active' ? (
            <Badge variant="default">Active</Badge>
          ) : (
            <Badge variant="destructive">Inactive</Badge>
          )}
        </div>
      );
    },
    meta: {
      label: 'Status',
      variant: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Pending Activation', value: 'pending' },
        { label: 'Inactive', value: 'inactive' }
      ]
    },
    filterFn: (row, id, value) => {
      const status = row.getValue(id);
      const needsActivation = row.original.needsActivation;
      
      if (value === 'pending') {
        return needsActivation;
      }
      return value.includes(status);
    },
    enableColumnFilter: true
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const needsActivation = row.original.needsActivation;
      
      return (
        <div className="flex justify-end">
          {needsActivation ? (
            <Button variant="ghost" size="sm" disabled>
              <IconShieldLock className="mr-2 h-4 w-4" />
              Awaiting Activation
            </Button>
          ) : (
            <Button variant="outline" size="sm">
              Manage
            </Button>
          )}
        </div>
      );
    }
  }
];
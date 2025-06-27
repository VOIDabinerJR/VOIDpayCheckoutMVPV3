'use client';

import { Badge } from '@/components/ui/badge';
import { DataTableColumnHeader } from '@/components/ui/table/data-table-column-header';
import { App } from '@/constants/data';
import { Column, ColumnDef } from '@tanstack/react-table';
import { IconCheck, IconX, IconClock, IconWorld } from '@tabler/icons-react';
import { ReactNode } from 'react';

export const columns: ColumnDef<App>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Application" />
    ),
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.getValue('name')}</span>
        <span className="text-muted-foreground text-xs">
          {row.original.description}
        </span>
      </div>
    ),
    meta: {
      label: 'Application',
      placeholder: 'Search applications...',
      variant: 'text',
    },
    enableColumnFilter: true,
  },
  {
    id: 'client_id',
    accessorKey: 'client_id',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Client ID" />
    ),
    cell: ({ row }) => (
      <div className="font-mono text-sm">{row.getValue('client_id')}</div>
    ),
    meta: {
      label: 'Client ID',
      placeholder: 'Search client IDs...',
      variant: 'text',
    },
    enableColumnFilter: true,
  },
  {
    id: 'environment',
    accessorKey: 'environment',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Environment" />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.getValue('environment') === 'production' ? 'default' : 'secondary'
        }
        className="flex items-center gap-1"
      >
        {row.getValue('environment') === 'production' ? (
          <IconWorld className="h-3 w-3" />
        ) : (
          <IconClock className="h-3 w-3" />
        )}
        {row.getValue('environment')}
      </Badge>
    ),
    meta: {
      label: 'Environment',
      variant: 'select',
      options: [
        { label: 'Production', value: 'production' },
        { label: 'Sandbox', value: 'sandbox' },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue('status');
      const variant =
        status === 'active'
          ? 'default'
          : status === 'suspended'
            ? 'destructive'
            : 'secondary';

      return (
        <Badge variant={variant} className="flex items-center gap-1">
          {status === 'active' && <IconCheck className="h-3 w-3" />}
          {status === 'suspended' && <IconX className="h-3 w-3" />}
          {status === 'inactive' && <IconClock className="h-3 w-3" />}
          {status as ReactNode}
        </Badge>
      );
    },
    meta: {
      label: 'Status',
      variant: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'Suspended', value: 'suspended' },
      ],
    },
    enableColumnFilter: true,
  },
  {
    id: 'last_used',
    accessorKey: 'last_used',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Last Used" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.last_used
          ? new Date(row.original.last_used).toLocaleDateString()
          : 'Never'}
      </div>
    ),
    meta: {
      label: 'Last Used',
      variant: 'date',
    },
  },
  {
    id: 'permissions',
    accessorKey: 'permissions',
    header: ({ column }: { column: Column<App, unknown> }) => (
      <DataTableColumnHeader column={column} title="Permissions" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">
        {row.original.permissions.join(', ')}
      </div>
    ),
    meta: {
      label: 'Permissions',
      placeholder: 'Filter permissions...',
      variant: 'text',
    },
    enableColumnFilter: true,
  },
  // Uncomment if you need actions column
  // {
  //   id: 'actions',
  //   cell: ({ row }) => <CellAction data={row.original} />
  // }
];
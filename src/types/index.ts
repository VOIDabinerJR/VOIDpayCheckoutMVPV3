import { Icons } from '@/components/icons';

// types.ts
export interface InvoiceItem {
  description: string;
  quantity: number;
  price: number;
}

export interface InvoiceCustomField {
  name: string;
  value: string;
}

export interface InvoiceData {
  client: string;
  currency: string;
  items: InvoiceItem[];
  total?: number;
  paymentMethod?: 'request' | 'auto';
  notes?: string;
  footer?: string;
  customFields?: InvoiceCustomField[] | undefined;
  taxId?: string;
  invoiceNumber?: string;
  date?: string;
  dueDate?: string;
  status?: 'draft' | 'sent' | 'paid' | 'overdue';
}

export interface NavItem {
  title: string;
  url: string;
  disabled?: boolean;
  external?: boolean;
  shortcut?: [string, string];
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
  isActive?: boolean;
  items?: NavItem[];
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;

// src/features/apps/api.ts
import { Icons } from '@/components/icons';

export interface App {
  id: string;
  name: string;
  domain: string;
  plan: string;
  environment: 'development' | 'production' | null;
  updatedAt: string;
  status?: string;
}

export async function getApplications(): Promise<App[]> {
  return [
    {
      id: '1',
      name: 'Void Pay',
      domain: 'romantic-monitor-64.clerk.accounts.dev',
      plan: 'Free Plan',
      environment: null,
      updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      name: 'Muffins AI',
      domain: 'www.muffinscorp.com',
      plan: 'Free Plan',
      environment: 'production',
      status: 'complete',
      updatedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '3',
      name: 'Muffins e-Commerce Platform',
      domain: 'together-mouse-13.clerk.accounts.dev',
      plan: 'Free Plan',
      environment: null,
      updatedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '4',
      name: 'TaskFlow',
      domain: 'taskflow.example.com',
      plan: 'Pro Plan',
      environment: 'production',
      status: 'active',
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '5',
      name: 'HealthTrack',
      domain: 'healthtrack.dev',
      plan: 'Free Plan',
      environment: 'development',
      updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];
}

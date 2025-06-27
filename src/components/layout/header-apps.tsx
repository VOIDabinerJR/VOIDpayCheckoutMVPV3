// components/header.tsx
'use client';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { UserNav } from './user-nav';
import { ThemeSelector } from '@/components/theme-selector';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import AppSwitcher from './app-selector';

// Dados fictícios de aplicativos
const apps = [
  {
    id: '1',
    name: 'Void Pay',
    plan: 'Free',
    environment: 'development',
    logo: '/logos/void-pay.png'
  },
  {
    id: '2',
    name: 'Muffins AI',
    plan: 'Pro',
    environment: 'production',
    logo: '/logos/muffins-ai.png'
  },
  {
    id: '3',
    name: 'E-Commerce Platform',
    plan: 'Free',
    environment: 'development',
    logo: '/logos/ecommerce.png'
  }
];

export default function Header() {
  const [currentAppId, setCurrentAppId] = React.useState(apps[0].id);

  const handleCreateNewApp = () => {
    // Lógica para criar novo app
    console.log('Create new app clicked');
  };

  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <Separator orientation='vertical' className='mr-2 h-4' />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <AppSwitcher
          apps={apps}
          currentAppId={currentAppId}
          onAppSelect={setCurrentAppId}
          onCreateNewApp={handleCreateNewApp}
        />
        <ThemeSelector />
        <ModeToggle />
        <UserNav />
      </div>
    </header>
  );
}

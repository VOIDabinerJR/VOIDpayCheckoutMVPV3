import React from 'react';
import { SidebarTrigger } from '../ui/sidebar';
import { Separator } from '../ui/separator';
import { Breadcrumbs } from '../breadcrumbs';
import SearchInput from '../search-input';
import { UserNav } from './user-nav';
import { ThemeSelector } from '../theme-selector';
import { ModeToggle } from './ThemeToggle/theme-toggle';
import CtaGithub from './cta-github';
import { IconBell } from '@tabler/icons-react';

export default function Header() {
    const notifications = [
    { id: 1, text: 'Novo pedido recebido', time: '10 min atrás' },
    { id: 2, text: 'Pagamento confirmado', time: '1 hora atrás' }
  ];
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <CtaGithub />
        <div className='hidden md:flex'>
          <SearchInput />
        </div>
        <UserNav />
        <ModeToggle />
        <ThemeSelector />
           <div className='relative'>
            <button className='rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800'>
              <IconBell className='size-5' />
              <span className='absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                {notifications.length}
              </span>
            </button>
          </div>
      </div>
    </header>
  );
}

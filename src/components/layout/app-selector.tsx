// components/app-switcher.tsx
'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { IconChevronDown } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface AppSwitcherProps extends PopoverTriggerProps {
  apps: {
    id: string;
    name: string;
    plan: string;
    environment: string;
    logo: string;
  }[];
  currentAppId?: string;
  onAppSelect: (appId: string) => void;
  onCreateNewApp: () => void;
}

const truncateTextByChars = (text: string, maxChars: number) => {
  if (!text || maxChars <= 0) return '';
  return text.length > maxChars ? text.slice(0, maxChars) + '...' : text;
};

export default function AppSwitcher({
  className,
  apps = [],
  currentAppId,
  onAppSelect,
  onCreateNewApp
}: AppSwitcherProps) {
  const [open, setOpen] = React.useState(false);

  const currentApp = apps.find((app) => app.id === currentAppId) || apps[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          role='combobox'
          aria-expanded={open}
          aria-label='Select an app'
          className={cn('w-[220px] justify-between', className)}
        >
          <div className='flex items-center gap-2 truncate'>
            <Avatar className='h-5 w-5 flex-shrink-0'>
              <AvatarImage src={currentApp.logo} />
              <AvatarFallback>{currentApp.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className='truncate'>
              {truncateTextByChars(currentApp.name, 16)}
            </span>
          </div>
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[220px] p-0'>
        <Command>
          <CommandList>
            <CommandInput placeholder='Search app...' />
            <CommandEmpty>No app found</CommandEmpty>
            <CommandGroup heading='Applications'>
              {apps.map((app) => (
                <CommandItem
                  key={app.id}
                  onSelect={() => {
                    onAppSelect(app.id);
                    setOpen(false);
                  }}
                  className='text-sm'
                >
                  <div className='flex items-center gap-2'>
                    <Avatar className='h-5 w-5 flex-shrink-0'>
                      <AvatarImage src={app.logo} />
                      <AvatarFallback>{app.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span>{truncateTextByChars(app.name, 16)}</span>
                      <span className='text-muted-foreground text-xs'>
                        {app.plan} • {app.environment}
                      </span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      currentApp.id === app.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onCreateNewApp();
                }}
              >
                <PlusCircle className='mr-2 h-5 w-5' />
                Create new app
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

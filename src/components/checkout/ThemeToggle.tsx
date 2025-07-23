// components/checkout/ThemeToggle.tsx
'use client';
import { Button } from '@/components/ui/button';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTheme } from './useTheme';

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Button
      onClick={toggleTheme}
      variant="ghost"
      className=" border-muted-foreground shadow-inner hover:shadow-md transition-all"
    >
      {theme === 'light' ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
    </Button>
  );
};
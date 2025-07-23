// components/checkout/Header.tsx
'use client';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  storeName: string;
};

export const Header = ({ storeName = "Muffins AI" }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl text-muted-foreground font-bold">
        {storeName}  {/* <span>{<ThemeToggle />}</span> */}
      </h1>
      <p className="text-sm text-green-400 flex items-center gap-1">
        <ShieldCheck className="h-4 w-4" />
        <span>Este Ambiente é Seguro e Criptografado</span>
      </p>
    </div>
  );
};
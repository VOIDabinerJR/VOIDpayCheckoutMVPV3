// components/checkout/Header.tsx
'use client';
import { ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

type HeaderProps = {
  storeName: string;
};

export const Header = ({ storeName}: HeaderProps) => {
  const hasStoreName = storeName?.trim();
  return (
    <div className="flex justify-between items-center">
      {hasStoreName ? (
        <h1 className="text-2xl font-bold text-white">{storeName}</h1>
      ) : (
        <div className="h-8 w-auto">
          <img
            src="/img/logo2.png"
            alt="VOIDpay Logo"
            width={120}  // Ajuste conforme necessário
            height={36}   // Ajuste conforme necessário
            className="h-full w-auto object-contain"
          />
        </div>
      )}
      <p className="text-sm text-green-400 flex items-center gap-1">
        <ShieldCheck className="h-4 w-4" />
        <span>Este Ambiente é Seguro e Criptografado</span>
      </p>
    </div>
  );
};
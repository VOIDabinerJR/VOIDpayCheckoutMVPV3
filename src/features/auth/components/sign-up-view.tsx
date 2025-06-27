'use client';

import { SignUp as ClerkSignUpForm } from '@clerk/nextjs';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.',
};

export default function SignUpViewPage() {
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    const generateStars = () => {
      const newStars: React.ReactNode[] = [];
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        newStars.push(
          <div
            key={i}
            className="star absolute h-1 w-1 rounded-full bg-white opacity-70"
            style={{
              top: `${y}%`,
              left: `${x}%`,
            }}
          />
        );
      }
      setStars(newStars);
    };

    generateStars();
  }, []);

  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-black">
      {/* Estrelas no fundo */}
      <div className="absolute inset-0 z-0">{stars}</div>

      {/* Fundo escuro com opacidade extra */}
      <div className="absolute inset-0 bg-black opacity-80" />

      {/* Conteúdo centralizado */}
      <div className="relative z-20 flex w-full max-w-md flex-col items-center justify-center space-y-6 p-6">
        {/* Logo acima do formulário */}
        <div className="flex items-center space-x-3 mb-4">
          <Image
            src="/img/Logo.svg"
            alt="Logo da Plataforma Muffins AI"
            width={65}
            height={65}
            className="rounded-full shadow-lg"
          />
          
        </div>

        {/* Formulário de cadastro */}
        <ClerkSignUpForm
          initialValues={{
            emailAddress: 'john@example.com',
          }}
        />

        {/* Termos e política */}
        <p className="px-8 text-center text-sm text-gray-400">
          Ao clicar em continuar, você concorda com nossos{' '}
          <Link
            href="https://www.voidpay.online/terms"
            className="underline underline-offset-4 hover:text-yellow-400"
          >
            Termos de Serviço
          </Link>{' '}
          e nossa{' '}
          <Link
            href="https://www.voidpay.online/privacy"
            className="underline underline-offset-4 hover:text-yellow-400"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

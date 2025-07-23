// components/checkout/Footer.tsx
'use client';

export const Footer = () => {
  return (
    <footer className="text-center py-6 text-sm text-muted-foreground border-t">
      <p>© {new Date().getFullYear()} VOIDpay. Todos os direitos reservados.</p>
      <div className="flex justify-center gap-4 mt-2">
        <a href="#" className="hover:underline">
          Termos de Serviço
        </a>
        <a href="#" className="hover:underline">
          Política de Privacidade
        </a>
        <a href="#" className="hover:underline">
          Suporte
        </a>
      </div>
    </footer>
  );
};
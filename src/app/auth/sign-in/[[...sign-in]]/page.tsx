import { Metadata } from 'next';
import SignInViewPage from '@/features/auth/components/sign-in-view';

export const metadata: Metadata = {
  title: 'VoidPay ',
  description:
    'Crie sua conta gratuita na Muffins AI e comece a desenvolver com nossos modelos de linguagem. Acesso instantâneo à API + créditos de teste gratuitos.',
  keywords: [
    'Muffins AI login',
    'AI platform sign in',
    'Secure AI access',
    'MFA authentication',
    'Developer portal',
    'API dashboard',
    'Account security',
    'Cloud AI login',
    'Enterprise sign in',
    'Session management'
  ],
  alternates: {
    canonical: 'https://platform.muffinscorp.com'
  },
  openGraph: {
    images: [
      {
        url: '/og-platform.png',
        width: 1200,
        height: 630,
        alt: 'Muffins AI dashboard showing multiple model performance metrics'
      }
    ]
  }
};

export default async function Page() {
  return <SignInViewPage />;
}

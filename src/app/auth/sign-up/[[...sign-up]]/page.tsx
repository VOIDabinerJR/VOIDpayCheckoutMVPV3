import { Metadata } from 'next';
import SignUpViewPage from '@/features/auth/components/sign-up-view';

export const metadata: Metadata = {
  title: 'VoidPay Platform',
  description:
    'Crie sua conta gratuita na Muffins AI e comece a desenvolver com nossos modelos de linguagem. Acesso instantâneo à API + créditos de teste gratuitos.',
  keywords: [
    'Muffins AI signup',
    'Free AI account',
    'API registration',
    'LLM trial',
    'Developer onboarding',
    'Cloud AI platform',
    'Instant access',
    'AI sandbox',
    'Enterprise trial',
    'No credit card'
  ],
  alternates: {
    canonical: 'https://platform.muffinscorp.com'
  },
  openGraph: {
    images: [
      {
        url: 'https://platform.muffinscorp.com/og-platform.png',
        alt: 'Muffins AI dashboard showing multiple model performance metrics'
      }
    ]
  }
}; 

export default async function Page() {
  return <SignUpViewPage />;
}

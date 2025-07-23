'use client';
import AppCardSkeleton from '@/components/app-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense, useEffect, useState } from 'react';
import AppViewPage from '@/features/apps/components/app-view-page';

export const metadata = {
  title: 'Dashboard : App Details'
};



type PageProps = { params: Promise<{ appId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  const [stars, setStars] = useState<React.ReactNode[]>([]);

  useEffect(() => {
      const newStars = Array.from({ length: 100 }, (_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        return (
          <div key={i} className="star" style={{ top: `${y}%`, left: `${x}%`, position: 'absolute' }} />
        );
      });
      setStars(newStars);
    }, []);
  return (
    <PageContainer scrollable>
        {stars}
      <div className='flex flex-1 flex-col space-y-4'>
        <Suspense fallback={<AppCardSkeleton />}>
          <AppViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}
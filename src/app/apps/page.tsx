import AppCardSkeleton from '@/components/app-card-skeleton';
import PageContainer from '@/components/layout/page-container';
import { Suspense } from 'react';
import AppViewPage from '@/features/apps/components/app-view-page';

export const metadata = {
  title: 'Dashboard : App Details'
};

type PageProps = { params: Promise<{ appId: string }> };

export default async function Page(props: PageProps) {
  const params = await props.params;
  return (
    <PageContainer scrollable>
      <div className='flex flex-1 flex-col space-y-4'>
        <Suspense fallback={<AppCardSkeleton />}>
          <AppViewPage />
        </Suspense>
      </div>
    </PageContainer>
  );
}

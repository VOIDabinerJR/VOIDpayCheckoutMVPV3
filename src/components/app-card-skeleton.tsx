// src/components/app-card-skeleton.tsx
import { Skeleton } from '@/components/ui/skeleton';

export default function AppCardSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <Skeleton className='h-8 w-[200px]' />
        <div className='flex space-x-2'>
          <Skeleton className='h-9 w-[100px]' />
          <Skeleton className='h-9 w-[120px]' />
        </div>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='space-y-2 rounded-lg border p-4'>
            <div className='flex justify-between'>
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-4 w-4' />
            </div>
            <Skeleton className='h-6 w-[80px]' />
          </div>
        ))}
      </div>

      <div className='space-y-4 rounded-lg border p-6'>
        <Skeleton className='h-6 w-[150px]' />
        <div className='grid gap-4 md:grid-cols-2'>
          {[...Array(4)].map((_, i) => (
            <div key={i} className='space-y-2'>
              <Skeleton className='h-5 w-[100px]' />
              <Skeleton className='h-4 w-[200px]' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { delay } from '@/constants/mock-api';
import { RecentPaymentsTable } from '@/features/overview/components/last-payments';

export default async function Sales() {
  await delay(3000);
  return <RecentPaymentsTable />;
}

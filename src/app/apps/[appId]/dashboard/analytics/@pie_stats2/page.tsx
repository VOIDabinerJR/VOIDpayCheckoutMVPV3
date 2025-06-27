import { delay } from '@/constants/mock-api';
import { PieGraph2 } from '@/features/overview/components/pie-graph2';

export default async function Stats() {
  await delay(1000);
  return <PieGraph2 />;
}

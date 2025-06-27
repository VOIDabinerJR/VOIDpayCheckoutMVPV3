import { PaymentButton } from '@/constants/data';
import { mockPaymentButtons } from '@/constants/mock-api'; // You'll need to create this mock
import { searchParamsCache } from '@/lib/searchparams';
import { PaymentButtonsTable } from './payment';
import { columns } from './payment/columns';

interface PaymentButtonsListingPageProps {
  searchParams?: {
    page?: string;
    perPage?: string;
    status?: string;
    search?: string;
  };
}

export default async function PaymentButtonsListingPage({
  searchParams
}: PaymentButtonsListingPageProps) {
  // Extract and validate search parameters
  const page = searchParams?.page || '1';
  const perPage = searchParams?.perPage || '5';
  const status = searchParams?.status;
  const search = searchParams?.search;

  // Build filters for API
  const filters = {
    page: Number(page),
    limit: Number(perPage),
    ...(status && { status }),
    ...(search && { search })
  };

  // Simulate API call with filters (using mock data)
  const data = await mockPaymentButtons.getPaymentButtons(filters);
  const totalButtons = data.total_buttons;
  const buttons: PaymentButton[] = data.buttons;
  console.log('Payment Buttons:', buttons);

  return (
    <PaymentButtonsTable
      data={buttons}
      totalItems={totalButtons}
      columns={columns}
    />
  );
}
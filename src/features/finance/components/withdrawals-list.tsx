import { Withdrawal } from '@/constants/data';
import { mockWithdrawals } from '@/constants/mock-api'; // Você precisará criar este mock
import { searchParamsCache } from '@/lib/searchparams';
import { WithDrawalsTable } from './withdrawals';
import { columns } from './withdrawals/columns';

interface WithdrawalsListingPageProps {
  searchParams?: {
    page?: string;
    perPage?: string;
    status?: string;
    method?: string;
    search?: string;
  };
}

export default async function WithdrawalsListingPage({
  searchParams
}: WithdrawalsListingPageProps) {
  // Extrai e valida os parâmetros de busca
  const page = searchParams?.page || '1';
  const perPage = searchParams?.perPage || '10';
  const status = searchParams?.status;
  const method = searchParams?.method;
  const search = searchParams?.search;

  // Constrói os filtros para a API
  const filters = {
    page: Number(page),
    limit: Number(perPage),
    ...(status && { status }),
    ...(method && { method }),
    ...(search && { search })
  };

  // Simula a chamada à API com os filtros
  const data = await mockWithdrawals.getWithdrawals(filters);
  const totalWithdrawals = data.total_withdrawals;
  const withdrawals: Withdrawal[] = data.withdrawals;

  return (
    <WithDrawalsTable
      data={withdrawals}
      totalItems={totalWithdrawals}
      columns={columns}
    />
  );
}

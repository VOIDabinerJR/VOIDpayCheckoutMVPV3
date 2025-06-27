import { Refund } from '@/constants/data';
import { mockRefunds } from '@/constants/mock-api'; // Você precisará criar este mock
import { searchParamsCache } from '@/lib/searchparams';
import { RefundsTable } from './refunds';
import { columns } from './refunds/columns';

interface RefundsListingPageProps {
  searchParams?: {
    page?: string;
    perPage?: string;
    status?: string;
    type?: string;
    search?: string;
  };
}

export default async function RefundsListingPage({
  searchParams
}: RefundsListingPageProps) {
  // Extrai e valida os parâmetros de busca
  const page = searchParams?.page || '1';
  const perPage = searchParams?.perPage || '10';
  const status = searchParams?.status;
  const type = searchParams?.type;
  const search = searchParams?.search;

  // Constrói os filtros para a API
  const filters = {
    page: Number(page),
    limit: Number(perPage),
    ...(status && { status }),
    ...(type && { type }),
    ...(search && { search })
  };

  // Simula a chamada à API com os filtros
  const data = await mockRefunds.getRefunds(filters);
  const totalRefunds = data.total_refunds;
  const refunds: Refund[] = data.refunds;

  return (
    <RefundsTable data={refunds} totalItems={totalRefunds} columns={columns} />
  );
}

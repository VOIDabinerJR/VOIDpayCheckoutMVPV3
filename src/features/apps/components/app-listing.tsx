import { App } from '@/constants/data';
import { mockApps } from '@/constants/mock-api';
import { searchParamsCache } from '@/lib/searchparams';
import { AppsTable } from './apps-tables';
import { columns } from './apps-tables/columns';

type AppsListingPage = {};

export default async function AppsListingPage({}: AppsListingPage) {
  const page = searchParamsCache.get('page') || 1;
  const search = searchParamsCache.get('name');
  const pageLimit = searchParamsCache.get('perPage') || 10;

  const filters = {
    page: Number(page),
    limit: Number(pageLimit),
    ...(search && { search })
  };

  const data = await mockApps.getApps(filters);
  const totalApps = data.total_apps;
  const apps: App[] = data.apps;

  return <AppsTable data={apps} totalItems={totalApps} columns={columns} />;
}

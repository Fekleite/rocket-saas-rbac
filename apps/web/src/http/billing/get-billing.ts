import { api } from '@/http/api-client';

interface GetBillingParams {
  org: string;
}

interface GetBillingResponse {
  billing: {
    seats: {
      amount: number;
      unit: number;
      price: number;
    };
    projects: {
      amount: number;
      unit: number;
      price: number;
    };
    total: number;
  };
}

export async function getBilling({ org }: GetBillingParams) {
  const response = await api
    .get<GetBillingResponse>(`organizations/${org}/billing`)
    .json();

  return response;
}

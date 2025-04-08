import { getCurrentOrg } from '@/auth/auth';
import { getBilling } from '@/http/billing/get-billing';

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableRow,
  TableHead,
} from '@/components/ui/table';

export async function BillingTable() {
  const currentOrg = await getCurrentOrg();
  const { billing } = await getBilling({ org: currentOrg! });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Cost type</TableHead>

          <TableHead className="text-right" style={{ width: 120 }}>
            Quantity
          </TableHead>

          <TableHead className="text-right" style={{ width: 200 }}>
            Subtotal
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>Amount of projects</TableCell>

          <TableCell className="text-right">
            {billing.projects.amount}
          </TableCell>

          <TableCell className="text-right">
            {billing.projects.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            (
            {billing.projects.unit.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            each)
          </TableCell>
        </TableRow>

        <TableRow>
          <TableCell>Amount of seats</TableCell>

          <TableCell className="text-right">{billing.seats.amount}</TableCell>

          <TableCell className="text-right">
            {billing.seats.price.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            (
            {billing.seats.unit.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}{' '}
            each)
          </TableCell>
        </TableRow>
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell />

          <TableCell className="text-right">Total</TableCell>

          <TableCell className="text-right">
            {billing.total.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

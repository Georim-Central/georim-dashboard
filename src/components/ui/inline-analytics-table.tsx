"use client";

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Progress } from '@/components/ui/progress';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type InlineAnalyticsItem = {
  id: string;
  region: string;
  sales: number;
  revenue: number;
  growth: number;
};

const defaultItems: InlineAnalyticsItem[] = [
  { id: '1', region: 'North America', sales: 1200, revenue: 25000, growth: 12 },
  { id: '2', region: 'Europe', sales: 900, revenue: 18000, growth: -5 },
  { id: '3', region: 'Asia', sales: 1500, revenue: 30000, growth: 20 },
  { id: '4', region: 'South America', sales: 600, revenue: 10000, growth: 8 },
  { id: '5', region: 'Africa', sales: 400, revenue: 7000, growth: -3 },
];

function GrowthIcon({ growth }: { growth: number }) {
  return growth >= 0 ? (
    <TrendingUp className="h-4 w-4 text-green-500" />
  ) : (
    <TrendingDown className="h-4 w-4 text-red-500" />
  );
}

interface InlineAnalyticsTableProps {
  items?: InlineAnalyticsItem[];
  caption?: string;
  title?: string;
  subtitle?: string;
}

export default function InlineAnalyticsTable({
  items = defaultItems,
  caption = 'Wide inline analytics table with balanced spacing',
  title = 'Regional Breakdown',
  subtitle = 'Compare sales momentum, revenue, and growth by region.',
}: InlineAnalyticsTableProps) {
  const maxSales = Math.max(...items.map((item) => item.sales));
  const maxRevenue = Math.max(...items.map((item) => item.revenue));
  const maxGrowth = Math.max(...items.map((item) => Math.abs(item.growth)));

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white p-4 sm:p-5">
      <div className="mb-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>

      <Table className="min-w-[640px]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[25%]">Region</TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Sales</span>
                <Progress value={(items.reduce((sum, item) => sum + item.sales, 0) / (items.length * maxSales)) * 100} className="mt-1 h-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Revenue</span>
                <Progress value={(items.reduce((sum, item) => sum + item.revenue, 0) / (items.length * maxRevenue)) * 100} className="mt-1 h-1" />
              </div>
            </TableHead>
            <TableHead className="w-[20%]">
              <div className="flex flex-col">
                <span>Growth</span>
                <Progress value={(items.reduce((sum, item) => sum + Math.abs(item.growth), 0) / (items.length * maxGrowth)) * 100} className="mt-1 h-1" />
              </div>
            </TableHead>
            <TableHead className="w-[15%] text-left">Trend</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium text-gray-900">{item.region}</TableCell>
              <TableCell>{item.sales.toLocaleString()}</TableCell>
              <TableCell>${item.revenue.toLocaleString()}</TableCell>
              <TableCell className={item.growth >= 0 ? 'text-green-600' : 'text-red-600'}>
                {item.growth}%
              </TableCell>
              <TableCell className="text-left">
                <GrowthIcon growth={item.growth} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>${items.reduce((acc, cur) => acc + cur.revenue, 0).toLocaleString()}</TableCell>
            <TableCell colSpan={2} />
          </TableRow>
        </TableFooter>
      </Table>

      <p className="mt-4 text-center text-sm text-gray-500">{caption}</p>
    </div>
  );
}

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

import { client } from "@/lib/hono";
import { convertAmmountFromMiliunits } from "@/lib/utils";

export const useGetSummary = () => {
  const params = useSearchParams();
  const from = params.get("from") || "";
  const to = params.get("to") || "";
  const accountId = params.get("accountId") || "";

  const query = useQuery({
    queryKey: ["summary", { from, to, accountId }],
    queryFn: async () => {
      const response = await client.api.summary.$get({
        query: { from, to, accountId },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch summary data");
      }

      const { data } = await response.json();
      return {
        ...data,
        incomeAmount: convertAmmountFromMiliunits(data.incomeAmount),
        expenseAmount: convertAmmountFromMiliunits(data.expensesAmount),
        remainingAmount: convertAmmountFromMiliunits(data.remainingAmount),
        categories: data.categories.map((category) => ({
          ...category,
          value: convertAmmountFromMiliunits(category.value),
        })),
        days: data.days.map((day) => ({
          ...day,
          income: convertAmmountFromMiliunits(Number(day.income)),
          expenses: convertAmmountFromMiliunits(Number(day.expenses)),
        })),
      };
    },
  });
  return query;
};

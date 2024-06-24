import { TriangleAlert } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";

import { cn } from "@/lib/utils";
import { useOpenTransaction } from "@/features/transactions/hooks/use-open-transaction";

type Props = {
  id: string;
  category: string | null;
  categoryId: string | null;
};

export const CategoryColumn = ({ id, category, categoryId }: Props) => {
  const { onOpen: openAccount } = useOpenCategory();
  const { onOpen: onOpenTransaction } = useOpenTransaction();

  const onClick = () => {
    if (categoryId) {
      openAccount(categoryId);
    } else {
      onOpenTransaction(id);
    }
  };
  return (
    <div
      onClick={onClick}
      className={cn(
        "flex items-center cursor-pointer hover:underline",
        !category && "text-red-500"
      )}
    >
      {!category && <TriangleAlert className="sizr-4 mr-2 shrink-0" />}
      {category || "Uncategorized"}
    </div>
  );
};

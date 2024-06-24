import { z } from "zod";

import { insertCategorySchema } from "@/db/schema";
import { useNewCategory } from "@/features/categories/hooks/use-new-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useCreateCategory } from "@/features/categories/api/use-create-category";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const FromSchema = insertCategorySchema.pick({ name: true });

type FromValues = z.input<typeof FromSchema>;

export const NewCategorySheet = () => {
  const { isOpen, onClose } = useNewCategory();
  const mutation = useCreateCategory();
  const onSubmit = (values: FromValues) => {
    mutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };
  return (
    <Sheet
      open={isOpen}
      onOpenChange={onClose}
    >
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>Create a new Category</SheetTitle>
          <SheetDescription>
            Categories are used to organize transactions
          </SheetDescription>
        </SheetHeader>
        <CategoryForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

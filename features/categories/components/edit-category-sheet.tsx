import { z } from "zod";
import { Loader2 } from "lucide-react";

import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useEditCategory } from "@/features/categories/api/use-edit-category";
import { useDeleteCategory } from "@/features/categories/api/use-delete-category";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";

import { useConfirm } from "@/hooks/use-confirm";
import { insertCategorySchema } from "@/db/schema";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const FromSchema = insertCategorySchema.pick({ name: true });

type FromValues = z.input<typeof FromSchema>;

export const EditCategorySheet = () => {
  const { isOpen, onClose, id } = useOpenCategory();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure you want to delete this category?",
    "This action cannot be undone."
  );

  const categoryQuery = useGetCategory(id);
  const categoriesQuery = useGetCategories();

  const editMutation = useEditCategory(id);
  const deleteMutation = useDeleteCategory(id);

  const categoryMutation = useCreateCategory();

  const onCreateCategory = (name: string) => categoryMutation.mutate({ name });

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = categoryQuery.isLoading;

  const onSubmit = (values: FromValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const confirmed = await confirm();

    if (confirmed) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : { name: "" };

  const categoriesOptions = (categoriesQuery.data ?? []).map((category) => ({
    label: category.name,
    value: category.id,
  }));

  return (
    <>
      <ConfirmDialog />
      <Sheet
        open={isOpen}
        onOpenChange={onClose}
      >
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Category</SheetTitle>
            <SheetDescription>Update the category details.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <CategoryForm
              id={id}
              categoriesOptions={categoriesOptions}
              onCreateCategory={onCreateCategory}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

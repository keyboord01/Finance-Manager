import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Select } from "@/components/select";
import { Button } from "@/components/ui/button";
import { insertCategorySchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FromSchema = insertCategorySchema.pick({ name: true });

type FromValues = z.input<typeof FromSchema>;

type Props = {
  id?: string;
  defaultValues?: FromValues;
  onSubmit: (values: FromValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  categoriesOptions: { label: string; value: string }[];
  onCreateCategory: (name: string) => void;
};

export const CategoryForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  categoriesOptions,
  onCreateCategory,
}: Props) => {
  const form = useForm<FromValues>({
    resolver: zodResolver(FromSchema),
    defaultValues,
  });

  const handleSubmit = (values: FromValues) => {
    onSubmit(values);
  };
  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-4 pt-4"
      >
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Edit Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="e.g. Food, Travel, etc."
                  options={categoriesOptions}
                  onCreate={onCreateCategory}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          className="w-full"
          disabled={disabled}
        >
          {id ? "Save" : "Create"}
        </Button>
        {!!id && (
          <Button
            type="button"
            className="w-full"
            disabled={disabled}
            onClick={handleDelete}
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete
          </Button>
        )}
      </form>
    </Form>
  );
};

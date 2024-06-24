import { z } from "zod";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Select } from "@/components/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertAccountSchema, insertTransactionSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

const FromSchema = z.object({
  date: z.coerce.date(),
  accountId: z.string(),
  categoryId: z.string().nullable().optional(),
  payee: z.string(),
  ammount: z.string(),
  notes: z.string().nullable().optional(),
});

const apiSchema = insertTransactionSchema.omit({ id: true });

type FromValues = z.input<typeof FromSchema>;
type APIFormValues = z.input<typeof apiSchema>;

type Props = {
  id?: string;
  defaultValues?: FromValues;
  onSubmit: (values: APIFormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
  accountOptions: { label: string; value: string }[];
  categoryOptions: { label: string; value: string }[];
  onCreateCategory: (name: string) => void;
  onCreateAccount: (name: string) => void;
};

export const TransactionForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
  accountOptions,
  categoryOptions,
  onCreateCategory,
  onCreateAccount,
}: Props) => {
  const form = useForm<FromValues>({
    resolver: zodResolver(FromSchema),
    defaultValues,
  });

  const handleSubmit = (values: FromValues) => {
    // onSubmit(values);
    console.log({ values });
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
          name="accountId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select an account"
                  options={accountOptions}
                  onCreate={onCreateAccount}
                  value={field.value}
                  onChange={field.onChange}
                  disabled={disabled}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          name="categoryId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select
                  placeholder="Select a category"
                  options={categoryOptions}
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

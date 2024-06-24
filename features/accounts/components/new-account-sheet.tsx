import { z } from "zod";

import { insertAccountSchema } from "@/db/schema";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { AccountForm } from "@/features/accounts/components/account-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

const FromSchema = insertAccountSchema.pick({ name: true });

type FromValues = z.input<typeof FromSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const mutation = useCreateAccount();
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
          <SheetTitle>Create a new account</SheetTitle>
          <SheetDescription>
            Accounts are used to track your spending and saving.
          </SheetDescription>
        </SheetHeader>
        <AccountForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};

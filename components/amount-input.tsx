import CurrencyInput from "react-currency-input-field";
import { Info, MinusCircle, PlusCircle } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type Props = {
  value: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
};

export const AmountInput = ({
  value,
  onChange,
  placeholder,
  disabled,
}: Props) => {
  const parsedValue = parseFloat(value);
  const isIncome = parsedValue > 0;
  const isExpense = parsedValue < 0;

  const onReverseValue = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent default form behavior
    if (!value) return;
    const newValue = (parseFloat(value) * -1).toString();
    onChange(newValue);
  };

  return (
    <div className="relative">
      <div className="absolute">
        <TooltipProvider>
          <Tooltip delayDuration={100}>
            <TooltipTrigger>
              <button
                type="button"
                onClick={onReverseValue}
                className={cn(
                  "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                  isIncome && "bg-emerald-500 hover:bg-emerald-600",
                  isExpense && "bg-rose-500 hover:bg-rose-600"
                )}
              >
                {!parsedValue && <Info className="size-3 text-white" />}
                {isIncome && parsedValue && (
                  <PlusCircle className="size-3 text-white" />
                )}
                {isExpense && <MinusCircle className="size-3 text-white" />}
              </button>
              <TooltipContent>
                use [+] to add income and [-] to add expenses
              </TooltipContent>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>

      <CurrencyInput
        prefix="$"
        className="pl-10 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        value={value}
        decimalsLimit={2}
        decimalScale={2}
        onValueChange={onChange}
        disabled={disabled}
      />
      <p className="text-xs text-muted-foreground mt-2">
        {isIncome && "Income"}
        {isExpense && "Expense"}
      </p>
    </div>
  );
};

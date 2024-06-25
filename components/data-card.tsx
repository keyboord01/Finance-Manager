import { IconType } from "react-icons";
import { VariantProps, cva } from "class-variance-authority";

import { Skeleton } from "@/components/ui/skeleton";

import { CountUp } from "@/components/count-up";
import { cn, formatCurrency, formatPercentage } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const boxVariant = cva("rounded-md p-3 shrink-0", {
  variants: {
    variant: {
      default: "bg-blue-500/20 ",
      success: "bg-green-500/20",
      danger: "bg-red-500/20",
      warning: "bg-yellow-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const IconVariant = cva("size-6", {
  variants: {
    variant: {
      default: "fill-blue-500 ",
      success: "fill-green-500",
      danger: "fill-red-500",
      warning: "fill-yellow-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type BoxVariants = VariantProps<typeof boxVariant>;
type IconVariants = VariantProps<typeof IconVariant>;

interface DataCardProps extends BoxVariants, IconVariants {
  icon: IconType;
  title: string;
  value?: number;
  dateRange: string;
  percentageChange?: number;
}

export const DataCard = ({
  icon: Icon,
  title,
  value = 0,
  dateRange,
  variant,
  percentageChange = 0,
}: DataCardProps) => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <CardTitle className="text-2xl line-clamp-1">{title}</CardTitle>
          <CardDescription className="line-clamp-1">
            {dateRange}
          </CardDescription>
        </div>
        <div className={cn(boxVariant({ variant }))}>
          <Icon className={IconVariant({ variant })} />
        </div>
      </CardHeader>
      <CardContent>
        {/* <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start">
            <span className="text-3xl font-bold">
              <CountUp end={value} />
            </span>
            <span className="text-xs text-gray-500">
              {percentageChange > 0 ? "+" : ""}
              <CountUp
                end={percentageChange}
                suffix="%"
              />
            </span>
          </div>
        </div> */}
        <h1 className="font-bold text-2xl mb-2 line-clamp-1 break-all">
          <CountUp
            preserveValue
            start={0}
            end={value}
            decimal="2"
            decimalPlaces={2}
            formattingFn={formatCurrency}
          />
        </h1>
        <p
          className={cn(
            "text-muted-foreground text-sm line-clamp-1 font-medium",
            percentageChange > 0 ? "text-green-500" : "text-red-500"
          )}
        >
          {formatPercentage(percentageChange)} from last period
        </p>
      </CardContent>
    </Card>
  );
};

export const DataCardSkeleton = () => {
  return (
    <Card className="border-none drop-shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between gap-x-4">
        <div className="space-y-2">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-40 h-4" />
        </div>
        <Skeleton className="size-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="shrink-0 h-10 w-24 mb-2" />
        <Skeleton className="shrink-0 w-40 h-4" />
      </CardContent>
    </Card>
  );
};

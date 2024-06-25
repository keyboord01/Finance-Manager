import {
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { formatPercentage } from "@/lib/utils";
import { format } from "path";
import { CategoryTooltip } from "@/components/category-tooltip";

const COLORS = ["#F16982", "#10C0EC", "#EA4696", "#00C48C"];

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const PieVariant = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <PieChart>
        <Legend
          layout="horizontal"
          align="center"
          verticalAlign="bottom"
          iconType="circle"
          content={({ payload }: any) => {
            return (
              <ul className="flex flex-col space-y-2">
                {payload.map((entery: any, index: number) => (
                  <li
                    key={`item-${index}`}
                    className="flex items-center space-x-2"
                  >
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: entery.color }}
                    />
                    <div className="space-x-1">
                      <span className="text-sm text-muted-foreground">
                        {entery.value}
                      </span>
                      <span className="text-sm">
                        {formatPercentage(entery.payload.percent * 100)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            );
          }}
        />
        <Tooltip content={<CategoryTooltip />} />
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={2}
          dataKey="value"
          labelLine={false}
          fill="#8884d8"
        >
          {data.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

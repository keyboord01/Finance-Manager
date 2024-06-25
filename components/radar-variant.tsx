import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  PolarRadiusAxis,
} from "recharts";

type Props = {
  data?: {
    name: string;
    value: number;
  }[];
};

export const RadarVariant = ({ data = [] }: Props) => {
  return (
    <ResponsiveContainer
      width="100%"
      height={350}
    >
      <RadarChart
        cx="50%"
        cy="50%"
        outerRadius="60%"
        data={data}
      >
        <PolarGrid />
        <PolarAngleAxis
          style={{ fontSize: "12px" }}
          dataKey="name"
        />
        <PolarRadiusAxis style={{ fontSize: "12px" }} />
        <Radar
          dataKey="value"
          stroke="#C9266C"
          fill="#C9266C"
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

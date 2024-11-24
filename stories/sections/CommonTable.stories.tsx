import type { Meta, StoryObj } from "@storybook/react";
import CommonTable from "@/components/sections/CommonTable";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
const meta = {
  title: "sections/CommonTable",
  component: CommonTable,
  tags: ["autodocs"],
} satisfies Meta<typeof CommonTable>;

export default meta;
type Story = StoryObj<typeof meta>;

const commonArray = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 33.0],
];

const elementArray = [
  [
    <Box>test</Box>,
    <TextField fullWidth />,
    <TextField fullWidth />,
    <TextField fullWidth />,
    <TextField fullWidth />,
  ],
  [<Box>test</Box>, <TextField />, 2, 18, "He"],
  [<Box>test</Box>, <TextField />, 3, 1, "Li"],
];

interface AAAModel {
  topic: string;
  calories: number;
  fat: number;
  carbs: number;
  protein: number;
}
å;

const rows: AAAModel[] = [
  {
    topic: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    topic: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    topic: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 24,
    protein: 33.0,
  },
];

// AAAModel配列からcellValuesを生成
const cellCommonValues = rows.map((row) => {
  return Object.values(row);
});

const cellElementValues = rows.map((row) => {
  // AAAModelの各プロパティについて、DessertはBox、CaloriesはTextField、その他は数値で表示
  return [
    <TextField key={row.topic} value={row.topic} />,
    <TextField key={row.topic} />,
    row.calories,
    row.fat,
    row.carbs,
  ];
});

const header = [
  "Dessert (100g serving)",
  "Calories",
  "Fat (g)",
  "Carbs (g)",
  "Protein (g)",
];

export const Ver1: Story = {
  args: {
    cellValues: commonArray,
    header: header,
  },
};

export const Ver2: Story = {
  args: {
    cellValues: elementArray,
    header: header,
  },
};

export const Ver3: Story = {
  args: {
    cellValues: cellCommonValues,
    header: header,
  },
};

export const Ver4: Story = {
  args: {
    cellValues: cellElementValues,
    header: header,
  },
};

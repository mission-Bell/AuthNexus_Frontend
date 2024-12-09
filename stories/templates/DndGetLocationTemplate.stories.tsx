import type { Meta, StoryObj } from "@storybook/react";


import DndGetLocationTemplate from "@/components/templates/DndGetLocationTemplate";

const meta = {
  title: "templates/DndGetLocationTemplate",
  component: DndGetLocationTemplate,
} satisfies Meta<typeof DndGetLocationTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

const initNumberList = [
  { id: 1, x: 10, y: 20 },
  { id: 2, x: 30, y: 40 },
  { id: 3, x: 50, y: 60 },
];




export const Image: Story = {
  args: {
    isPdf: false,
    numberList: initNumberList
  },
};

export const Pdf: Story = {
  args: {
    isPdf: true,
    numberList: initNumberList
  },
};
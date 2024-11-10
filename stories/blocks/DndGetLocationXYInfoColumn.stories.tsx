import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuButton from "@/components/blocks/MenuButton";
import BuildIcon from "@mui/icons-material/Build";
import DndGetLocationXYInfoColumn from "@/components/blocks/DndGetLocationXYInfoColumn";

const meta = {
  title: "blocks/DndGetLocationXYInfoColumn",
  component: DndGetLocationXYInfoColumn,
  tags: ["autodocs"],
} satisfies Meta<typeof DndGetLocationXYInfoColumn>;

export default meta;
type Story = StoryObj<typeof meta>;

export const titleColumn: Story = {
  args: {
    index: "No.",
    x: "x",
    y: "y",
  },
};

export const dataColumn: Story = {
  args: {
    index: "[1]",
    x: "10",
    y: "20",
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import DndGetLocationCommonButton from "@/components/blocks/DndGetLocationCommonButton";

const meta = {
  title: "blocks/DndGetLocationCommonButton",
  component: DndGetLocationCommonButton,
  tags: ["autodocs"],
} satisfies Meta<typeof DndGetLocationCommonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Delivary: Story = {
  args: {
    icon: <LocalShippingIcon />,
    label: "Delivary",
    onClick: () => {
      console.log("test");
    },
  },
};

export const Maintenance: Story = {
  args: {
    icon: <BuildIcon />,
    label: "Maintenance",
    onClick: () => {
      console.log("test");
    },
  },
};

import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MenuButton from "@/components/blocks/MenuButton";
import BuildIcon from "@mui/icons-material/Build";

const meta = {
  title: "blocks/MenuButton",
  component: MenuButton,
  tags: ["autodocs"],
} satisfies Meta<typeof MenuButton>;

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

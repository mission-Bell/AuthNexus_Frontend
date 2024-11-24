import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import DndGetLocationTemplate from "@/components/templates/DndGetLocationTemplate";
import MenuTemplate from "@/components/templates/MenuTemplate";

const meta = {
  title: "templates/MenuTemplate",
  component: MenuTemplate,
} satisfies Meta<typeof MenuTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {},
};

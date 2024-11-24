import type { Meta, StoryObj } from "@storybook/react";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import BuildIcon from "@mui/icons-material/Build";
import LocalPizzaIcon from "@mui/icons-material/LocalPizza";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

import DndGetLocationTemplate from "@/components/templates/DndGetLocationTemplate";
import MenuTemplate from "@/components/templates/MenuTemplate";
import { L } from "vitest/dist/chunks/reporters.C4ZHgdxQ.js";
import LoginTemplate from "@/components/templates/LoginTemplate";

const meta = {
  title: "templates/LoginTemplate",
  component: LoginTemplate,
} satisfies Meta<typeof LoginTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {},
};

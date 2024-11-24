import type { Meta, StoryObj } from "@storybook/react";

import CommonButton from "@/components/elements/CommonButton";

const meta = {
  title: "elements/CommonButton",
  component: CommonButton,
  tags: ["autodocs"],
} satisfies Meta<typeof CommonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ver1: Story = {
  args: {
    label: "Button",
    onClick: () => {
      console.log("Button clicked");
    },
  },
};

export const LoginButton: Story = {
  args: {
    label: "Login",
    onClick: () => {
      console.log("Login clicked");
    },
  },
};

export const LogoutButton: Story = {
  args: {
    label: "Logout",
    onClick: () => {
      console.log("Logout clicked");
    },
  },
};

export const RegisterButton: Story = {
  args: {
    label: "Register",
    onClick: () => {
      console.log("Register clicked");
    },
  },
};

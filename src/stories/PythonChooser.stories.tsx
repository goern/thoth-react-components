import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PythonChooser } from "./PythonChooser";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ThothStation/PythonChooser",
  component: PythonChooser,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof PythonChooser>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PythonChooser> = (args) => (
  <PythonChooser {...args} />
);

export const Small = Template.bind({});
Small.args = {
  size: "small",
  label: "PythonChooser",
};

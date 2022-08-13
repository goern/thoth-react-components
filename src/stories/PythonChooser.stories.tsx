import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { PythonChooser } from "./PythonChooser";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "ThothStation/PythonChooser",
  component: PythonChooser,
} as ComponentMeta<typeof PythonChooser>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PythonChooser> = (args) => (
  <PythonChooser {...args} />
);

export const ThreeEight = Template.bind({});
ThreeEight.args = {
  versions: ["3.8"],
};

export const ThreeEightAndThreeSeven = Template.bind({});
ThreeEightAndThreeSeven.args = {
  versions: ["3.8", "3.7"],
};

export const Zero = Template.bind({});
Zero.args = {
  versions: [],
};

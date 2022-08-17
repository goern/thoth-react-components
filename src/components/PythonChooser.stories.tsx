import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { screen, userEvent, within } from "@storybook/testing-library";

import { PythonChooser } from "./PythonChooser";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Thoth React/PythonChooser",
  component: PythonChooser,
} as ComponentMeta<typeof PythonChooser>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof PythonChooser> = (args) => {
  return <PythonChooser {...args} />;
};

export const ThreeEight = Template.bind({});
ThreeEight.args = {
  versions: ["3.8"],
};

export const ThreeEightAndThreeSeven = Template.bind({});
ThreeEightAndThreeSeven.args = {
  versions: ["3.8", "3.7"],
};

export const ThreeEightSelected = Template.bind({});
ThreeEightSelected.args = {
  versions: ["3.8", "3.7"],
};
ThreeEightSelected.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement);
  userEvent.click(canvas.getByRole("button"));
  // FIXME the next line drops a `Unable to find an accessible element with the role "menuitem"` error
  // the cancas does not have an accessible element with the role "menuitem"
  userEvent.click(canvas.getByRole("menuitem"));
};

export const NoVersionProdived = Template.bind({});
NoVersionProdived.args = {
  versions: [],
};

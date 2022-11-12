import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import AddItemForm from "../AddItemForm/AddItemForm";
import { action } from "@storybook/addon-actions";
import { EditableSpan } from "./EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
   title: "TodoList/EditableSpan",
   component: EditableSpan,
   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   argTypes: {
      onChangeTitle: {
         description: "Clicked",
      },
   },
} as ComponentMeta<typeof EditableSpan>;

// More on components templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanStory.args = {
   onChangeTitle: action("Change Span"),
};

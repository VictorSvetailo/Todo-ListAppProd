import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import {AddItemForm} from "./AddItemForm";
import { action } from "@storybook/addon-actions";
import styles from "../../features/TodoListsList/TodoList/ToDoLIst.module.scss";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
   title: "TodoList/AddItemForm",
   component: AddItemForm,
   // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   argTypes: {
      addItem: {
         description: "Clicked",
      },
   },
} as ComponentMeta<typeof AddItemForm>;

// More on components templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;



const asyncCaB = async (...params: any[]) =>{
   action('Button inside form clicked')(...params)
}

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
   addItem: asyncCaB,
};

export const AddItemFormDisabledExample = (props: any) => {
   return <AddItemForm  placeholder={'Todo List'} disabled={true} addItem={asyncCaB}/>;
};
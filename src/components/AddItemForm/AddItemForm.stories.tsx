import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddItemForm from './AddItemForm';
import {action} from '@storybook/addon-actions';
import styles from '../../features/TodoListsList/TodoList/ToDoLIst.module.css';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    addItem: {
      description: 'Clicked'
    }
  },
} as ComponentMeta<typeof AddItemForm>;

// More on components templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormStory.args = {
  addItem: action('Clicked Button')
};

export const AddItemFormDisabledExample = (props: any) => {
  return (<AddItemForm disabled={true} addItem={action('Button inside form clicked')}/>)
}



//
// export const Template1: ComponentStory<typeof AddItemForm> = (args) => {
//   console.log("AddItemForm is called")
//
//   const [title, setTitle] = useState<string>('')
//   const [error, setError] = useState<string | null>(null)
//   const onClickAddTask = () => {
//     if (title.trim()) {
//       args.addItem(title)
//     } else {
//       setError('Title is required')
//     }
//     setTitle('')
//   }
//   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
//     if (setError !== null) {
//       setError(null)
//     }
//     setTitle(e.currentTarget.value)
//   }
//   const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
//   //const interErrorClass = error ? 'error' : ''
//   //const errorMessage = <div style={{color: 'hotpink'}}>Title is required!</div>
//   return (
//       <div>
//         <input value={title}
//                onChange={onChangeSetTitle}
//                onKeyDown={onKeyDownAddTask}
//                className={error ? `${styles.error}` : ''}
//         />
//         <button onClick={onClickAddTask}>Add</button>
//         {error && <div className={styles.error_message}>*Field is required bro</div>}
//       </div>
//   );
// });
//
//
// export const AddItemFormWithErrorStory = Template.bind({});
// AddItemFormStory.args = {
//   addItem: action('Clicked Button')
// };
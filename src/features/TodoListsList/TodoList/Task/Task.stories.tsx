import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import {Button} from '../../../../stories/Button';
import AddItemForm from '../../../../components/AddItemForm/AddItemForm';
import {action} from '@storybook/addon-actions';
import styles from '../ToDoLIst.module.css';
import {Tasks} from './Tasks';
import {v1} from 'uuid';

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
// export default {
//     title: 'TodoList/Task',
//     components: Tasks,
//     // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
//     args: {
//         addItem: {
//             description: 'Clicked'
//         }
//     },
// } as ComponentMeta<typeof Tasks>;

// More on components templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// const Template: ComponentStory<typeof Tasks> = (args) => <Tasks {...args} />;
//
// export const TasksIsDone = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TasksIsDone.args = {
//
// };
//
// export const TasksIsNotDone = Template.bind({});
// // More on args: https://storybook.js.org/docs/react/writing-stories/args
// TasksIsNotDone.args = {
//
// };


// const Template: ComponentStory<typeof Tasks> = (args) => {
//     const [task, setState] = useState({id: v1(), title: action.title, isDone: false})
//     const changeTaskStatus = () => setTask({...task, isDone: false})
// }
//

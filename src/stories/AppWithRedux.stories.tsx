import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import AddItemForm from '../component/AddItemForm/AddItemForm';
import {action} from '@storybook/addon-actions';
import styles from '../component/ToDoList/ToDoLIst.module.css';
import {AppWithRedux} from '../AppWithRedux';
import {Provider} from 'react-redux';
import {store} from '../component/state/store';
import {ReduxStoreProviderDecorator} from '../component/state/ReduxStoreProviderDecorator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ToDoList/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <AppWithRedux/> ;

export const AppWithReduxStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// AppWithReduxStory.args = {
//   addItem: action('Clicked Button')
// };

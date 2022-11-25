import React from "react";

import { App } from "../app/App";

import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from './ReduxStoreProviderDecorator';


//StoryRouter

export default {
   title: "TodoList/App",
   component: App,
   decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator],
};
//as ComponentMeta<typeof App>;

export const AppBaseExample = (props: any) => {
   return <App demo={true} />;
};

// const Template: ComponentStory<typeof App> = (args) => <App/> ;
//
// export const AppWithReduxStory = Template.bind({});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
// AppWithReduxStory.args = {
//   addItem: action('Clicked Button')
// };

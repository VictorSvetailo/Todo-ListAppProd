import {store} from './store';
import {Provider} from 'react-redux';

export const ReduxStoreProviderDecorator = (storyFn: ()=> JSX.Element) => {
    return <Provider store={store}>{storyFn()}</Provider>
}


// React.ReactNode



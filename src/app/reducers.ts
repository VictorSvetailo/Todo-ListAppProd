import {combineReducers} from 'redux';
import {todoListsReducer} from '../features/TodoListsList';
import {tasksReducer} from '../features/TodoListsList/TodoList/Task';
import {appReducer} from '../features/Apllication';
import {authReducer} from '../features/Auth';
import {galleryReducer} from '../BLL/gallery-reducer';
import {applicationReducer} from '../BLL/application-reducer';
import {socialNetworkReducer} from '../BLL/social-network-reducer';


// important! I took out the creation of root Reducer from the store in order for Hot Module Replacement to work correctly
// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния

export const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
    gallery: galleryReducer,
    application: applicationReducer,
    socialNetwork: socialNetworkReducer
});
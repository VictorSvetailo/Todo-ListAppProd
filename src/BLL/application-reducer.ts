import {TodoListType} from '../DAL/Todo-List-DAL/types';
import {AppRootStateType} from '../app/store';
import {TodoListDomainType} from '../features/TodoListsList/todoLists-reducer';
import {todoListsAPI} from '../DAL/Todo-List-DAL/todoLists-api';

export const initialState: InitialStateType = {
    currentWindow: '/',
    applicationChangingTheme: false,
};

export type InitialStateType = {
    applicationChangingTheme: boolean,
    currentWindow: string
}

export const applicationReducer = (state: InitialStateType = initialState, action: AppActionsType,): InitialStateType => {
    switch (action.type) {
        case 'APP_CHANGING_THEME':
            return {...state, applicationChangingTheme: !state.applicationChangingTheme};
        case 'CURRENT_WINDOW':
            return {...state, currentWindow: action.value};
        default:
            return state;
    }
};

export const applicationChangingThemeAC = () =>
    ({ type: 'APP_CHANGING_THEME'} as const);
export const currentWindowAC = (value: string) =>
    ({ type: 'CURRENT_WINDOW', value} as const);


export const currentWindowTC = () => (dispatch: any) => {
    let location = document.location.pathname;
    console.log('/'+ location.split('/')[1])
    dispatch(currentWindowAC('/'+ location.split('/')[1]))
}


// important! Archive code. Do not delete
// export const changeTodoListOrderTC = (todoList: any, toDoListID1: string, putAfterItemId: string) => (dispatch: any) => {
//     // console.log(todoList)
//     // console.log(toDoListID1)
//     // console.log(putAfterItemId)
//     todoListsAPI.updateReorderTodoLists(toDoListID1, putAfterItemId)
//         .then(res => {
//             if(res.data.resultCode === 0){
//                 console.log(res.data.resultCode === 0)
//             }
//         })
// }

// const sortCards = (a: any, b: any) => {
//     if (a.order > b.order){
//         console.log('hello')
//         return -1
//     } else {
//         return 1
//     }
// }


    // function correctArr(_arr, _param){
    //     /*
    //         коррекция  элементов массива по паре индекса
    //         *    _arr -- массив требующий коррекции
    //         *   _param -- пара [n1,n2] -- индексы массива для взаимной  перестановки
    //     */
    //     _arr[_param[1]] = _arr.splice(_param[0],1, _arr[_param[1]])[0]
    //     return _arr
    // }


// console.log(toDoListID1 === toDoListID2)
// console.log(toDoListID1, toDoListID2)
// let index1 = todoList.findIndex((el: any) => el.id === toDoListID1)
// let index2 = todoList.findIndex((el: any) => el.id === toDoListID2)
// // console.log(index1)
// // console.log(index2)
//
// const copyTodoList = [...todoList]
// // console.log(toDoListID1, toDoListID2)
// console.log(copyTodoList[index2] = copyTodoList.splice(index1,1, copyTodoList[index2])[0])
// console.log(copyTodoList)




export type AppActionsType =
    | ReturnType<typeof applicationChangingThemeAC>
    | ReturnType<typeof currentWindowAC>
    // | ReturnType<typeof applicationChangingThemeLocalStorageAC>


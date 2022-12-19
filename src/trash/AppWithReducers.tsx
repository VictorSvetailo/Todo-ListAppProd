import React from 'react'
// import stales from './app.module.css';
// import {TaskType, TodoList} from './components/TodoList/TodoList';
// import {v1} from 'uuid';
// import AddItemForm from './components/AddItemForm/AddItemForm';
// import {
//     addTodolistsAC,
//     changeTodolistFilter,
//     changeTodolistTitleAC,
//     removeTodoListAC,
//     todolistsReducer
// } from './components/state/todolists-reducer';
// import {
//     addTaskAC,
//     changeTaskStatusAC,
//     changeTaskTitleAC,
//     removeTaskAC,
//     tasksReducer
// } from './components/state/tasks-reducer';
//
// export type FilterValuesType = 'all' | 'completed' | 'active';
//
// export type ToDoListType = {
//     title: string
//     filter: FilterValuesType
//     id: string
// }
//
// export type TasksStateType = {
//     [toDoList_ID: string]: Array<TaskType>
// }
//
// function AppWithReducers() {
//     const toDoListID_1 = v1()
//     const toDoListID_2 = v1()
//     const toDoListID_3 = v1()
//
//     // Array toDoList--------------------------------------------------
//     const [toDoList, dispatchToDoListsReducer] = useReducer(todolistsReducer, [
//         {id: toDoListID_1, title: 'What to learn?', filter: 'all'},
//         {id: toDoListID_2, title: 'What to buy?', filter: 'all'},
//         {id: toDoListID_3, title: 'Hello Victor?', filter: 'all'},
//     ])
//
//     const removeToDoList = (toDoListID: string) => {
//         const action = removeTodoListAC(toDoListID)
//         dispatchToDoListsReducer(action)
//         dispatchToTasksReducer(action)
//     }
//
//     function changeToDoListFilter(toDoListID: string, filter: FilterValuesType) {
//         dispatchToDoListsReducer(changeTodolistFilter(toDoListID, filter))
//     }
//
//     const changeToDoListTitle = (toDoListID: string, newTitle: string) => {
//         dispatchToDoListsReducer(changeTodolistTitleAC(toDoListID, newTitle))
//     }
//
//     // Task--------------------------------------------------
//     const [tasks, dispatchToTasksReducer] = useReducer(tasksReducer, {
//         [toDoListID_1]: [
//             {id: v1(), title: 'HTML', isDone: false},
//             {id: v1(), title: 'CSS ', isDone: false},
//             {id: v1(), title: 'JS/TS ', isDone: false},
//         ],
//         [toDoListID_2]: [
//             {id: v1(), title: 'Milk', isDone: false},
//             {id: v1(), title: 'Bread', isDone: false},
//             {id: v1(), title: 'Apple', isDone: false},
//         ],
//         [toDoListID_3]: [
//             {id: v1(), title: 'Milk', isDone: false},
//             {id: v1(), title: 'Bread', isDone: false},
//             {id: v1(), title: 'Apple', isDone: false},
//         ]
//     })
//
//     // Add Task
//     const addTask = (toDoListID: string, title: string) => {
//         dispatchToTasksReducer(addTaskAC(toDoListID, title))
//     }
//     // Remove--------------------------------------------------
//     const removeTask = (toDoListID: string, taskID: string) => {
//         const action = removeTaskAC(toDoListID, taskID)
//         dispatchToTasksReducer(action)
//     }
//     // Change status
//     const changeTaskStatus = (toDoListID: string, taskId: string, status: TaskStatuses) => {
//         dispatchToTasksReducer(changeTaskStatusAC(toDoListID, taskId, isDone))
//     }
//     const changeTaskTitle = (toDoListID: string, idTask: string, newTitle: string) => {
//         dispatchToTasksReducer(changeTaskTitleAC(toDoListID, idTask, newTitle))
//     }
//
//     // Component --------------------------------------------------
//     const todoListComponents = toDoList.map(tl => {
//         let tasksForTodolist;
//         switch (tl.filter) {
//             case 'completed':
//                 tasksForTodolist = tasks[tl.id].filter(task => task.isDone)
//                 break
//             case 'active':
//                 tasksForTodolist = tasks[tl.id].filter(task => !task.isDone)
//                 break
//             default:
//                 tasksForTodolist = tasks[tl.id]
//         }
//         return <TodoList
//             toDoListID={tl.id}
//             title={tl.title}
//             tasks={tasksForTodolist}
//             removeTask={removeTask}
//             changeToDoListFilter={changeToDoListFilter}
//             addTask={addTask}
//             changeStatus={changeTaskStatus}
//             filter={tl.filter}
//             removeToDoList={removeToDoList}
//             changeTaskTitle={changeTaskTitle}
//             changeToDoListTitle={changeToDoListTitle}
//         />
//     })
//     const addTodoList = (title: string) => {
//         const action = addTodolistsAC(title)
//         dispatchToDoListsReducer(action)
//         dispatchToTasksReducer(action)
//     }
//
//     return (
//         <div className={stales.app}>
//             <div className={stales.wrapper}>
//                 <h1 className={stales.appTitle}>To-Do List for Svetailo</h1>
//                 <button className={stales.button_addTasks}>Add new task</button>
//                 <div className={stales.wrap}>
//                     <AddItemForm addItem={addTodoList}/>
//                     {todoListComponents}
//                 </div>
//             </div>
//
//         </div>
//     );
// }
//
// export default AppWithReducers;

import { addTodoListsAC, changeTodolistEntityStatusAC, changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodoListAC, setToDoListsAC, TodoListDomainType, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";
import { TodoListType } from "../../api/todoLists-api";
import { RequestStatusType } from "../../app/app-reduser";

let todolistId1 = v1();
let todolistId2 = v1();

let startState: Array<TodoListDomainType> = [];
beforeEach(() => {
   startState = [
      {
         id: todolistId1,
         title: "What to learn",
         filter: "all",
         entityStatus: "idle",
         addedDate: "",
         order: 0,
      },
      {
         id: todolistId2,
         title: "What to buy",
         filter: "all",
         entityStatus: "idle",
         addedDate: "",
         order: 0,
      },
   ];
});

test("correct todolist should be removed", () => {
   const endState = todolistsReducer(startState, removeTodoListAC(todolistId1));

   expect(endState.length).toBe(1);
   expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
   const todoList: TodoListType = {
      id: "testID",
      title: "New Todolist",
      order: 0,
      addedDate: "",
   };

   const endState = todolistsReducer(startState, addTodoListsAC(todoList));

   expect(endState.length).toBe(3);
   expect(endState[0].title).toBe(todoList.title);
   expect(endState[0].filter).toBe("all");
});

test("correct todolist should change its name", () => {
   let newTodolistTitle = "New Todolist";

   const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId2, newTodolistTitle));

   expect(endState[0].title).toBe("What to learn");
   expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
   let newFilter: FilterValuesType = "completed";

   const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId2, newFilter));

   expect(endState[0].filter).toBe("all");
   expect(endState[1].filter).toBe(newFilter);
});

test("todolist should be set to the state", () => {
   const action = setToDoListsAC(startState);
   const endState = todolistsReducer([], action);
   expect(endState.length).toBe(2);
});

test("correct entity Status of todolist should be changed", () => {
   let newStatus: RequestStatusType = "loading";

   const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todolistId2, newStatus));

   expect(endState[0].entityStatus).toBe("idle");
   expect(endState[1].entityStatus).toBe(newStatus);
});

import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reduser";

let startState: InitialStateType;
beforeEach(() => {
   startState = {
      error: null,
      status: "idle",
      isInitialized: false,
   };
});

test("correct error message should be set", () => {
   const endState = appReducer(startState, setAppErrorAC("Some error"));
   expect(endState.error).toBe("Some error");
});

test("correct status message should be set", () => {
   const endState = appReducer(startState, setAppStatusAC("loading"));
   expect(endState.status).toBe("loading");
});

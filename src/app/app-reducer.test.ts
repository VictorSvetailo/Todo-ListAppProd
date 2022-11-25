import { appReducer, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer";

let startState: InitialStateType;
beforeEach(() => {
   startState = {
      error: null,
      status: "idle",
      isInitialized: false,
   };
});

test("correct error message should be set", () => {
   // @ts-ignore
   const endState = appReducer(startState, setAppErrorAC({ error: "Some error" }));
   expect(endState.error).toBe("Some error");
});

test("correct status message should be set", () => {
   // @ts-ignore
   const endState = appReducer(startState, setAppStatusAC({ status: "loading" }));
   expect(endState.status).toBe("loading");
});

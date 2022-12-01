import {InitialStateType, slice} from "./application-reducer";
import {appActions} from '../CommanActions/AppActions';
const {reducer: appReducer} = slice

let startState: InitialStateType;
beforeEach(() => {
   startState = {
      error: null,
      status: "idle",
      isInitialized: false,
   };
});

const {setAppStatus, setAppError} = appActions

test("correct error message should be set", () => {
   // @ts-ignore
   const endState = appReducer(startState, setAppError({ error: "Some error" }));
   expect(endState.error).toBe("Some error");
});

test("correct status message should be set", () => {
   // @ts-ignore
   const endState = appReducer(startState, setAppStatus({ status: "loading" }));
   expect(endState.status).toBe("loading");
});


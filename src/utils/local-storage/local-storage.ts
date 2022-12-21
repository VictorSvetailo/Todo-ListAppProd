import {AppStateType} from '../../BLL/application-reducer';
//
// export const loadState = () => {
//     try {
//         const serializedState = localStorage.getItem('application-state');
//         if (serializedState === null) {
//             return undefined;
//         }
//         return JSON.parse(serializedState);
//     } catch (err) {
//         return undefined;
//     }
// }
//
//
// export const saveState = (state: AppStateType) => {
//     try {
//         const serializedState = JSON.stringify(state);
//         localStorage.setItem('application-state', serializedState);
//     } catch {
//         // ignore write errors
//     }
// };
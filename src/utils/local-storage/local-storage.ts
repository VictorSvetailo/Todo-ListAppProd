import {AppRootStateType} from '../../app/store';

export const loadState1 = () => {
    try {
        const serializedState = localStorage.getItem('application-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const loadState2 = () => {
    try {
        const serializedState = sessionStorage.getItem('application-current-window');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState1 = (state: AppRootStateType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('application-state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const saveState2 = (state: AppRootStateType) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('application-current-window', serializedState);
    } catch {
        // ignore write errors
    }
};
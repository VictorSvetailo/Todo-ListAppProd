

type StateType = {
    age: number
    childrenCount: number
    name: string
}
type ActionType = {
    type: string
    [key: string]: any
}



export const userReducer = (state: StateType, action: ActionType): StateType => {
    switch(action.type){
        case 'INCREMENT-AGE':
            return { ...state, age: state.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return { ...state, childrenCount: state.childrenCount + 7}
        case 'CHANGE-NAME':
            return { ...state, name: action.newName}
        default:
            throw new Error('I don\'t understand this type')

    }
}



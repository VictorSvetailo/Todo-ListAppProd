import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import styles from '../ToDoList/ToDoLIst.module.css';


type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const  AddItemForm: FC<AddItemFormPropsType> = React.memo( (props) => {
    console.log("AddItemForm is called")

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onClickAddTask = () => {
        if (title.trim()) {
             props.addItem(title)
        } else {
            setError('Title is required')
        }
        setTitle('')
    }
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (setError !== null) {
            setError(null)
        }
        setTitle(e.currentTarget.value)
    }
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask()
    //const interErrorClass = error ? 'error' : ''
    //const errorMessage = <div style={{color: 'hotpink'}}>Title is required!</div>
    return (
        <div>
            <input value={title}
                   onChange={onChangeSetTitle}
                   onKeyDown={onKeyDownAddTask}
                   className={error ? `${styles.error}` : ''}
            />
            <button onClick={onClickAddTask}>Add</button>
            {error && <div className={styles.error_message}>*Field is required bro</div>}
        </div>
    );
});

export default AddItemForm;
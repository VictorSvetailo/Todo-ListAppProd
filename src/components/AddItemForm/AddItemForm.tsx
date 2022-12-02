import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import styles from '../../features/TodoListsList/TodoList/ToDoLIst.module.css';
import {IconButton, InputAdornment} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {AccountCircle} from '@mui/icons-material';

export type AssItemFormSubmitHelperType = {
    setError: (error: string) => void,
    setTitle: (title: string) => void,
}

type AddItemFormPropsType = {
    addItem: (title: string, helper: AssItemFormSubmitHelperType) => void;
    disabled?: boolean;
    colorButton?: any
    sizeButton?: any
    stylesInput?: any
    stylesButton?: any
    sizeInput?: any
    placeholder: string
};


export const AddItemForm: FC<AddItemFormPropsType> = React.memo(({
                                                                     addItem,
                                                                     sizeButton,
                                                                     sizeInput,
                                                                     stylesInput,
                                                                     stylesButton,
                                                                     colorButton,
                                                                     placeholder,
                                                                     disabled = false
                                                                 }) => {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    const onClickAddTask = async () => {
        if (title.trim() !== '') {
            addItem(title, {setError, setTitle});
        } else {
            setError('Title is required');
        }
    };
    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        if (setError !== null) {
            setError(null);
        }
        setTitle(e.currentTarget.value);
    };
    const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && onClickAddTask();


    // const [value, setValue] = React.useState('Controlled');


    return (
        <div style={{position: 'relative'}}>
            <Box component="form" sx={{'& .MuiTextField-root': {m: 0.1, width: stylesInput.width},}} noValidate
                 autoComplete="off">
                <div style={{paddingRight: '20px'}}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label={placeholder}
                        multiline
                        variant={stylesInput.variant}
                        size={sizeInput}
                        maxRows={4}
                        disabled={disabled}
                        value={title}
                        onChange={onChangeSetTitle}
                        onKeyDown={onKeyDownAddTask}
                        className={error ? `${styles.error}` : ''}
                    />
                </div>
            </Box>
            <IconButton style={{
                transform: stylesButton.transform,
                position: stylesButton.position,
                top: stylesButton.top,
                left: stylesButton.left,
                right: stylesButton.right,
            }} size={sizeButton} color={colorButton} disabled={disabled} onClick={onClickAddTask}>
                <AddCircleOutlineIcon fontSize={sizeButton}/>
            </IconButton>
            {error && <div className={styles.error_message}>{error}</div>}
        </div>
    );
});
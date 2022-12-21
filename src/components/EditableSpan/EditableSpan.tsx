import React, { ChangeEvent, KeyboardEvent, FC, useState } from "react";
import { log } from "util";
import {TextField} from '@mui/material';
import styles from '../../features/TodoListsList/TodoList/ToDoLIst.module.scss';

type EditableSpanType = {
   title: string;
   onChangeTitle: (title: string) => void;
};

export const EditableSpan: FC<EditableSpanType> = React.memo((props) => {
   const [editMode, setEditMode] = useState<boolean>(false);
   const [title, setTitle] = useState<string>("");

   const offEditMode = () => {
      setEditMode(true);
      setTitle(props.title);
   };

   const onEditMode = () => {
      setEditMode(false);
      props.onChangeTitle(title);
   };

   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
   };

   const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === "Enter" && offEditMode();
   };

   return <span >{editMode
       ? <TextField
           style={{marginTop: '15px'}}
           id="outlined-multiline-flexible"
                     label="Print text"
                     multiline
                     size={'small'}
                     variant={'outlined'}
                     maxRows={8}
                     onChange={onChangeSetTitle}
                     onKeyDown={onKeyDownOffEditMode}
                     value={title}
                     autoFocus
                     onBlur={onEditMode}/>
       : <span onDoubleClick={offEditMode}>{props.title}</span>}</span>;
});


// <input value={title} autoFocus onBlur={onEditMode} onChange={onChangeSetTitle} onKeyDown={onKeyDownOffEditMode} />
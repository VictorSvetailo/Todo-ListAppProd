import React, { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import styles from "../../features/TodoListsList/TodoList/ToDoLIst.module.css";
import {AxiosError} from 'axios';

type AddItemFormPropsType = {
   addItem: (title: string) => Promise<any>;
   disabled?: boolean;
};


const AddItemForm: FC<AddItemFormPropsType> = React.memo(({ addItem, disabled = false }) => {
   const [title, setTitle] = useState<string>("");
   const [error, setError] = useState<string | null>(null);

   const onClickAddTask = async () => {
      if (title.trim() !=='') {
         try {
            await addItem(title);
            setTitle("");
         } catch (err){
            const error = err as AxiosError
            setError(error.message)
         }
      } else {
         setError("Title is required");
      }
   };
   const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
      if (setError !== null) {
         setError(null);
      }
      setTitle(e.currentTarget.value);
   };
   const onKeyDownAddTask = (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && onClickAddTask();

   return (
      <div>
         <input disabled={disabled} value={title} onChange={onChangeSetTitle} onKeyDown={onKeyDownAddTask} className={error ? `${styles.error}` : ""} />
         <button disabled={disabled} onClick={onClickAddTask}>
            Add List
         </button>
         {error && <div className={styles.error_message}>{error}</div>}
      </div>
   );
});

export default AddItemForm;

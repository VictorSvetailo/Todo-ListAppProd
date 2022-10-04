import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';
import {log} from 'util';

type EditableSpanType = {
    title: string
    onChangeTitle: (title: string) => void
}


export const EditableSpan: FC<EditableSpanType> = React.memo((props) => {
    console.log('EditableSpan VS')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')


    const offEditMode = () => {
        setEditMode(true)
        setTitle(props.title)

    }

    const onEditMode = () => {
        setEditMode(false)
        props.onChangeTitle(title)

    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
         e.key === 'Enter' && offEditMode()
    }

    return (
        <span>
            {editMode
                ? <input
                value={title}
                autoFocus
                onBlur={onEditMode}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownOffEditMode}
            />
            : <span onDoubleClick={offEditMode}>{props.title}</span>}
        </span>
    );
});

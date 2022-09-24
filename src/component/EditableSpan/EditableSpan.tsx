import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';

type EditableSpanType = {
    title: string
    changeTitle: (title: string) => void
}


export const EditableSpan: FC<EditableSpanType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState<string>(props.title)
    const onEditMode = () => {
        setEditMode(false)
        props.changeTitle(title)
    }
    const offEditMode = () => {
        setEditMode(true)
            props.changeTitle(title)
    }

    const onChangeSetTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }



    const onKeyDownOffEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
         e.key === 'Enter' && offEditMode()
    }

    return (
        <div>
            {editMode ? <input
                value={title}
                autoFocus
                onBlur={onEditMode}
                onChange={onChangeSetTitle}
                onKeyDown={onKeyDownOffEditMode}
            />
            : <span onDoubleClick={offEditMode}>{props.title}</span>
            }
        </div>
    );
};

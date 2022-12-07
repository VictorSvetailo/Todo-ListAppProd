import React, { ChangeEvent, FC, MouseEvent, useCallback } from 'react'
import { EditableSpan } from '../../../../components/EditableSpan/EditableSpan'
import { tasksActions } from './index'
import { useActions } from '../../../../utils/redux-utils'
import { TaskStatuses, TaskType } from '../../../../api/types'
import { Box, Checkbox, Grid, IconButton } from '@mui/material'
import ClearIcon from '@mui/icons-material/Clear'

export type TaskPropsType = {
    todoListId: string
    task: TaskType
}

export const Task: FC<TaskPropsType> = React.memo(({ todoListId, task }) => {
    const { removeTask, updateTask } = useActions(tasksActions)

    const removeTaskHandler = (e: MouseEvent<HTMLButtonElement>) => {
        removeTask({ todoListId: todoListId, taskID: task.id })
    }
    const onChangeStatus = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            updateTask({
                todoListId: todoListId,
                taskID: task.id,
                model: {
                    status: e.currentTarget.checked
                        ? TaskStatuses.Completed
                        : TaskStatuses.New
                }
            })
        },
        [todoListId, task.id]
    )

    const onChangeTitle = useCallback(
        (newTitle: string) => {
            updateTask({
                todoListId: todoListId,
                taskID: task.id,
                model: { title: newTitle }
            })
        },
        [todoListId, task.id]
    )

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

    return (
        <div
            key={task.id}
            className={task.status === TaskStatuses.Completed ? 'is_done' : ''}
        >
            <Box sx={{ width: '100%' }}>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    rowSpacing={0}
                    columnSpacing={{ xs: 0.1, sm: 0.1, md: 0.1 }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        item
                        xs={2}
                    >
                        <Checkbox
                            onChange={onChangeStatus}
                            checked={task.status === TaskStatuses.Completed}
                            {...label}
                            sx={{
                                color: '#1977d2',
                                '&.Mui-checked': {
                                    color: '#1977d2'
                                }
                            }}
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <div
                            style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}
                        >
                            <EditableSpan
                                title={task.title}
                                onChangeTitle={onChangeTitle}
                            />
                        </div>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="flex-end"
                        item
                        xs={2}
                    >
                        <IconButton
                            onClick={removeTaskHandler}
                            aria-label="delete"
                            color="default"
                        >
                            <ClearIcon
                                style={{ color: '#fe0100' }}
                                fontSize="small"
                            />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </div>
    )
})

//Archive
// <input type="checkbox" onChange={onChangeStatus} checked={task.status === TaskStatuses.Completed}/>
// <EditableSpan title={task.title} onChangeTitle={onChangeTitle}/>
// <button onClick={removeTaskHandler}>Delete</button>

//className={task.status === TaskStatuses.Completed ? 'is_done' : ''}

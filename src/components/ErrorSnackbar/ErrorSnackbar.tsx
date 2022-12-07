import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert, { AlertProps } from '@mui/material/Alert'
import { useSelector } from 'react-redux'
import { AppRootStateType } from '../../app/store'
import { appActions } from '../../features/CommanActions/AppActions'
import { useActions } from '../../utils/redux-utils'

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function ErrorSnackbar() {
    const error = useSelector<AppRootStateType, string | null>(
        (state) => state.app.error
    )
    const { setAppError } = useActions(appActions)

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string
    ) => {
        if (reason === 'clickaway') {
            return
        }
        setAppError({ error: null })
    }

    const isOpen = error !== null
    return (
        <Stack
            spacing={2}
            sx={{
                width: '100%'
            }}
        >
            <Snackbar
                open={isOpen}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{
                        width: '100%'
                    }}
                >
                    {error}
                </Alert>
            </Snackbar>
            {/*<Alert severity="error">This is an error message!</Alert>*/}
            {/*<Alert severity="warning">This is a warning message!</Alert>*/}
            {/*<Alert severity="info">This is an information message!</Alert>*/}
            {/*<Alert severity="success">This is a success message!</Alert>*/}
        </Stack>
    )
}

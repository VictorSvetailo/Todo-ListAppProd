import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {FormikHelpers, useFormik} from 'formik';
import {useActions, useAppDispatch} from '../../app/store';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';
import {selectIsLoggedIn} from './selectors';
import {authActions} from './index';

type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch();

    const {loginTC} = useActions(authActions)

    const isLoggedIn = useSelector(selectIsLoggedIn);

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {
                    email: 'Email is required',
                };
            }
            if (!values.password) {
                return {
                    password: 'Password is required',
                };
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: async (values: FormikValuesType, formikHelpers: FormikHelpers<FormikValuesType>) => {
            const action = await dispatch(authActions.loginTC(values))

            if (loginTC.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    //@ts-ignore
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    });
    if (isLoggedIn) {
        return <Navigate to={'/'}/>;
    }

    return (
        <>
            <Grid container justifyContent={'center'}>
                <Grid item xs={4}>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FormLabel>
                                <p>
                                    <b>Test Label</b>
                                </p>
                            </FormLabel>
                            <FormGroup>
                                <TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
                                {formik.errors.email ? (
                                    <div
                                        style={{
                                            color: 'red',
                                        }}
                                    >
                                        {formik.errors.email}
                                    </div>
                                ) : null}
                                <TextField type="password" label="Password"
                                           margin="normal" {...formik.getFieldProps('password')} />
                                {formik.errors.password ? (
                                    <div style={{color: 'red',}}>{formik.errors.password}</div>) : null}
                                <FormControlLabel label={'Remember me'}
                                                  control={<Checkbox {...formik.getFieldProps('rememberMe')}
                                                                     checked={formik.values.rememberMe}/>}/>
                                <Button type={'submit'} variant={'contained'} color={'primary'}>
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </form>
                </Grid>
            </Grid>
        </>
    );
};

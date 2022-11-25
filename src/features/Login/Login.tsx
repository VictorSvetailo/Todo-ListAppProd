import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';
import {AppRootStateType, useAppDispatch} from '../../app/store';
import {loginTC} from './auth-reducer';
import {useSelector} from 'react-redux';
import {Navigate} from 'react-router-dom';

export const Login = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector<AppRootStateType>((state) => state.auth.isLoggedIn);

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

        onSubmit: (values) => {
            dispatch(loginTC(values));
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

import React from 'react';
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {useFormik} from 'formik';

export const Login = () => {

    const formik = useFormik({
        validate: (values) => {
            if (!values.email) {
                return {email: 'Email is required'};
            }
            if (!values.password) {
                return {password: 'Password is required'};
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });


    return <>
        <Grid container justifyContent={'center'}>
            <Grid item xs={4}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <div><b>Test Label</b></div>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                            <TextField type="password"
                                       label="Password"
                                       margin="normal"
                                       {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe}/>
                            }/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    </>
};


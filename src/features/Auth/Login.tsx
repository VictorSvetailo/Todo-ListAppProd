import React, {useState} from 'react'
import {Button, Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField,} from '@mui/material'
import {FormikHelpers, useFormik} from 'formik'
import {useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {selectIsLoggedIn} from './selectors'
import {authActions} from './index'
import {useActions, useAppDispatch} from '../../utils/redux-utils'
import style from './Login.module.scss'
import copyIcon from '../../assets/icons/copy-symbol.png'

type FormikValuesType = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login = () => {
    const dispatch = useAppDispatch()

    const {login} = useActions(authActions)

    const isLoggedIn = useSelector(selectIsLoggedIn)

    const [isCopied, setIsCopied] = useState('')

    const copyText = (value: string) => {
        navigator.clipboard.writeText(value)
        setIsCopied(value)
        setTimeout(() => {
            setIsCopied('')
        }, 2000)
    }

    const formik = useFormik({
        validate: values => {
            if (!values.email) {
                return {
                    email: 'Email is required',
                }
            }
            if (!values.password) {
                return {
                    password: 'Password is required',
                }
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },

        onSubmit: async (
            values: FormikValuesType,
            formikHelpers: FormikHelpers<FormikValuesType>
        ) => {
            const action = await dispatch(authActions.login(values))

            if (login.rejected.match(action)) {
                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    //@ts-ignore
                    formikHelpers.setFieldError(error.field, error.error)
                }
            }
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return (
        <div className={style.form_wrap}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <div className={style.form__body}>
                            <div>
                                <h2 className={style.form__title}>To-do List App</h2>
                                <h4 className={style.form__text_developer}>
                                    Developer <a href="https://svetailo.com">Svetailo</a>
                                </h4>
                            </div>
                            <div>
                                <b>Application login details.</b>
                            </div>
                            <div>
                                <div>
                                    Email:
                                    <button
                                        className={style.form__text_button}
                                        onClick={e => copyText('free@samuraijs.com')}>
                                        free@samuraijs.com
                                        <span>
                                 <img src={copyIcon} alt=""/>
                              </span>
                                        {isCopied === 'free@samuraijs.com' && (
                                            <span className={style.form__text_copy}>copied</span>
                                        )}
                                    </button>
                                </div>
                                <div>
                                    Password:
                                    <button
                                        className={style.form__text_button}
                                        onClick={e => copyText('free')}>
                                        free
                                        <span>
                                 <img src={copyIcon} alt=""/>
                              </span>
                                        {isCopied === 'free' && (
                                            <span className={style.form__text_copy}>copied</span>
                                        )}
                                    </button>
                                </div>
                            </div>
                            <div>
                                <b>Use this data to test my application.</b>
                            </div>
                        </div>
                    </FormLabel>
                    <FormGroup>
                        <div className={style.login__block}>
                            <TextField
                                color={'secondary'}
                                error={!!formik.errors.email}
                                className={style.login__input}
                                label="Email"
                                margin="normal"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.errors.email ? (
                                <div className={style.form__error}>{formik.errors.email}</div>
                            ) : null}
                        </div>
                        <div className={style.login__block}>
                            <TextField
                                color={'secondary'}
                                error={!!formik.errors.password}
                                className={style.login__input}
                                type="password"
                                label="Password"
                                margin="normal"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.errors.password ? (
                                <div className={style.form__error}>{formik.errors.password}</div>
                            ) : null}
                        </div>
                        <div className={style.login__checkbox}>
                            <FormControlLabel
                                color={'secondary'}
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        color={'secondary'}
                                        {...formik.getFieldProps('rememberMe')}
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                        </div>
                        <Button type={'submit'} variant={'contained'} color={'secondary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </div>
    )
}

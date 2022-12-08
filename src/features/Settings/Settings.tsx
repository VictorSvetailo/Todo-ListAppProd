import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../Auth/selectors'
import { Navigate, NavLink } from 'react-router-dom'

export const Settings = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }

    return (
        <div>
            <h2>Settings</h2>
            <NavLink to={'/settings/background'}>
                <button>Background</button>
            </NavLink>
        </div>
    )
}

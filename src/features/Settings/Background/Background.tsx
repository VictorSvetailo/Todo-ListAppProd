import React from 'react'
import { useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../Auth/selectors'
import { Navigate } from 'react-router-dom'

export const Background = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn)
    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return (
        <div>
            <button>white</button>
            <button>black</button>
            <button>green</button>
        </div>
    )
}

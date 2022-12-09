import React from 'react'
import {useNavigate} from 'react-router-dom'

export const Templates = () => {
    const navigate = useNavigate()

    return (
        <div>
            <button
                onClick={() => {
                    navigate(-1)
                }}>{'<-'}</button>
            <h2>Templates</h2>
        </div>
    )
}

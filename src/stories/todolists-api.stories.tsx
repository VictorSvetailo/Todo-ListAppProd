import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todoListsAPI} from '../api/todoLists-api';
import {string} from 'prop-types';

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': 'c6150b07-be78-48c2-be1a-83b0f879593c'
    }
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        //эта конструкция превращается в promise
        todoListsAPI.getTodoLists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        todoListsAPI.createTodoLists('dscsdcs')
            .then((res) => {
                // debugger
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodoList = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        const id = 'c5fbed42-840e-4e89-861b-2d5ede9f819d'
        todoListsAPI.deleteTodoLists(id)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodoListTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывая в state
        // который в виде строки будем отображать в div
        const id = 'c5fbed42-840e-4e89-861b-2d5ede9f819d'
        todoListsAPI.updateTodoLists(id,'Test')
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
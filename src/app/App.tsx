import React, { useEffect } from 'react'
import stales from './app.module.css'
import { TodoListsList } from '../features/TodoListsList'
import { Box, CircularProgress, Grid, LinearProgress } from '@mui/material'
import { ErrorSnackbar } from '../components/ErrorSnackbar/ErrorSnackbar'
import { useSelector } from 'react-redux'
import { authSelectors, Login } from '../features/Auth'
import { Outlet, Route, Routes } from 'react-router-dom'
import { selectIsInitialized, selectStatus } from '../features/Apllication/selectors'
import { appActions } from '../features/Apllication'
import { useActions } from '../utils/redux-utils'
import { TaskType } from '../api/types'
import { AppMenuBar } from '../components/Menu/MenuBar'
import { MenuPage } from '../components/Menu/MenuPage/MenuPage'
import { Error } from '../components/Error/Error'
import { Settings } from '../features/Settings/Settings'
import { Background } from '../features/Settings/Background/Background'
import { Templates } from '../components/Menu/Templates/Templates'

export type TasksStateType = {
   [toDoList_ID: string]: Array<TaskType>
}

type PropsType = {
   // demo?: boolean
}

export const App: React.FC<PropsType> = React.memo(props => {
   const status = useSelector(selectStatus)
   const isInitialized = useSelector(selectIsInitialized)
   const isLoggedIn = useSelector(authSelectors.selectIsLoggedIn)
   // const {logout} = useActions(authActions)
   const { isInitializeApp } = useActions(appActions)

   useEffect(() => {
      if (!isInitialized) {
         isInitializeApp()
      }
   }, [])

   if (!isInitialized) {
      return (
         <>
            <div
               style={{
                  position: 'absolute',
                  top: '48%',
                  left: '48%',
               }}>
               <CircularProgress />
            </div>
         </>
      )
   }

   return (
      <div>
         <div className={stales.app}>
            <div className={!isLoggedIn ? stales.back : ''}>
               <ErrorSnackbar />
               <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <div
                           style={{
                              position: 'relative',
                              width: '100%',
                           }}>
                           {isLoggedIn && <AppMenuBar />}
                           <div
                              style={{
                                 position: 'absolute',
                                 bottom: '-3px',
                                 left: '0',
                                 width: '100%',
                                 height: '5px',
                              }}>
                              {status === 'loading' && <LinearProgress color="primary" />}
                           </div>
                        </div>
                     </Grid>
                     <Grid item xs={12}>
                        <div>
                           <div>
                              <Routes>
                                 <Route path={'/*'} element={<Error />} />
                                 <Route
                                    path={'/settings'}
                                    element={
                                       <div>
                                          <Settings />
                                          <Outlet />
                                       </div>
                                    }>
                                    <Route
                                       path={'*'}
                                       element={
                                          <div>
                                             <Error />
                                          </div>
                                       }
                                    />
                                    <Route path={':id'} element={<div>iD</div>} />
                                    <Route index element={<div>check iD</div>} />
                                    <Route
                                       path={'/settings/background'}
                                       element={
                                          <div>
                                             <Background />
                                          </div>
                                       }
                                    />
                                 </Route>
                                 <Route path={'/menupage/*'} element={<MenuPage />} />
                                 <Route path={'/templates'} element={<Templates />} />
                                 <Route path={'/'} element={<TodoListsList demo={false} />} />

                                 <Route path={'/login'} element={<Login />} />
                              </Routes>
                           </div>
                        </div>
                     </Grid>
                  </Grid>
               </Box>
            </div>
         </div>
      </div>
   )
})

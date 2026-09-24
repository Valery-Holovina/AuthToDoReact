//npm create vite@latest todos-auth-api -- --template react
// npm install
//npm i react-router-dom

import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { NotFound } from './pages/NotFound'
import { Home } from './pages/Home'
import './App.css'
import { AppLayout } from './components/AppLayout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { Login } from './pages/Login'
import { Account } from './pages/AccountPage'
import { Tasks } from './pages/TasksPage'
import { Help } from './pages/Help'

function App() {

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />}/>
         <Route path="/login" element={<Login />} />
         <Route path="/help" element={<Help />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/account" element={<Account />} />
          <Route path="/taskpage" element={<Tasks />} />
        </Route>
        <Route path="*" element={<NotFound />}/>

      </Route>
    </Routes>
    
  )
}

export default App

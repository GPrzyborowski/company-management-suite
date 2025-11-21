import { useState } from 'react'
import './App.css'
import ApiTester from './components/ApiTester'
import EmployeeList from './components/EmployeeList'

function App() {
  return (
    <>
        <ApiTester></ApiTester>
        <EmployeeList></EmployeeList>
    </>
  )
}

export default App
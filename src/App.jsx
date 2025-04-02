import React from 'react'
import UserRouter from './Routing/UserRouter'
import HospitalContextProvider from './Context/HospitalContextProvider'

function App() {
  return (
    <div>
      <HospitalContextProvider>
      <UserRouter/>
      </HospitalContextProvider>
    </div>
  )
}

export default App

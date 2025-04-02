import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LandingPage from '../Pages/LandingPage'
import Nav from '../Components/Nav'
// import Admin from '../Pages/Admin'
import Login from '../Pages/Login/Login'
import DonerRegistration from '../Pages/Registration/DonerRegistration'
import DonnerRegister from '../Pages/Registration/DonnerRegister'
import OrganizationRegister from '../Pages/Registration/OrganizationRegister'
import HospitalRegistration from '../Pages/Registration/HospitalRegister'
import Footer from '../Components/Footer'
import Dashboard from '../Pages/Dashboard/Dashboard'
import HospitalLogin from '../Pages/Login/HospitalLogin'
import OrganizationLogin from '../Pages/Login/OrganizationLogin'
// import OrganizationDashboard from '../Pages/Dashboard/OrganizationDashboard'
import HospitalDashboard from '../Pages/Dashboard/HospitalDash/HospitalDashboard'

function UserRouter() {
  return (
    <div>
      <BrowserRouter>
     
        <Routes>
            <Route path='/' element={<> <Nav/><LandingPage/>          <Footer/>  </>}/>
            <Route path='/register' element={<> <Nav/><DonnerRegister/>         <Footer/>  </>}/>
            <Route path='//donner/login' element={<> <Nav/><Login/>         <Footer/>  </>}/>
            <Route path='/ts' element={<> <Nav/><DonerRegistration/>         <Footer/>  </>}/>

            <Route path='/org' element={<> <Nav/><OrganizationRegister/>         <Footer/>  </>}/>
            <Route path='/org/login' element={<> <Nav/><OrganizationLogin/>         <Footer/>  </>}/>

            <Route path='/hospital' element={<> <Nav/><HospitalRegistration/>         <Footer/>  </>}/>
            <Route path='/hospital/login' element={<> <Nav/><HospitalLogin/>         <Footer/>  </>}/>

            
            <Route path='/Dashboard' element={<Dashboard/>}/>
            <Route path='/hospital/das' element={<HospitalDashboard/>}/>

            {/* <Route path='/org/Dashboard' element={<OrganizationDashboard/>}/> */}


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default UserRouter

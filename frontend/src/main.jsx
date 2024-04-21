import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'
import LibrarianDashboard from './pages/Librarian/LibrarianDashboard.jsx'
import UserDashboard from './pages/User/UserDashboard.jsx'
import ProtectedRoute from './auth/ProtectedRoute.jsx'
import UserProfile from './pages/User/UserProfile.jsx'
import LibrarianProfile from './pages/Librarian/LibrarianProfile.jsx'
import AdminProfile from './pages/Admin/AdminProfile.jsx'
import Test from './Test.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      <Route exact path='/' component={Test} />
      <Route path='/LoginPage' component={LoginPage} />
      <Route path='/RegisterPage' component={RegisterPage} />

      <ProtectedRoute path='/AdminDashboard' component={AdminDashboard} role='admin'/>
      <ProtectedRoute path='/AdminProfile' component={AdminProfile} role='admin'/>

      <ProtectedRoute path='/LibrarianDashboard' component={LibrarianDashboard} role='librarian'/>
      <ProtectedRoute path='/LibrarianProfile' component={LibrarianProfile} role='librarian'/>

      <ProtectedRoute path='/UserDashboard' component={UserDashboard} role='user'/>
      <ProtectedRoute path='/UserProfile' component={UserProfile} role='user' />
      
    </Router>
  </div>
)

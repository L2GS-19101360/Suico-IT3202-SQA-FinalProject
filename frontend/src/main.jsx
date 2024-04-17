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

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Router>
      <Route exact path='/' component={App} />
      <Route path='/LoginPage' component={LoginPage} />
      <Route path='/RegisterPage' component={RegisterPage} />

      <ProtectedRoute path='/AdminDashboard' component={AdminDashboard} role='admin'/>

      <ProtectedRoute path='/LibrarianDashboard' component={LibrarianDashboard} role='librarian'/>

      <ProtectedRoute path='/UserDashboard' component={UserDashboard} role='user'/>
      
    </Router>
  </div>
)

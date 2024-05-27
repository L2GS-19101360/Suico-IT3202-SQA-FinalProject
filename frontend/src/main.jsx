import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import AdminDashboard from './pages/Admin/AdminDashboard.jsx';
import LibrarianDashboard from './pages/Librarian/LibrarianDashboard.jsx';
import UserDashboard from './pages/User/UserDashboard.jsx';
import ProtectedRoute from './auth/ProtectedRoute.jsx';
import UserProfile from './pages/User/UserProfile.jsx';
import LibrarianProfile from './pages/Librarian/LibrarianProfile.jsx';
import AdminProfile from './pages/Admin/AdminProfile.jsx';
import ManageUsers from './pages/Admin/ManageUsers.jsx';
import ManageBooks from './pages/Admin/ManageBooks.jsx';
import Test from './Test.jsx';
import LibrarianBorrowBooks from './pages/Librarian/LibrarianBorrowBooks.jsx';
import LibrarianReturnBooks from './pages/Librarian/LibrarianReturnBooks.jsx';
import UserBookShelf from './pages/User/UserBookShelf.jsx';
import ViewBorrowedBooks from './pages/Admin/ViewBorrowedBooks.jsx';
import ViewReturnedBooks from './pages/Admin/ViewReturnedBooks.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/LoginPage' component={LoginPage} />
      <Route path='/RegisterPage' component={RegisterPage} />

      <ProtectedRoute path='/AdminDashboard' component={AdminDashboard} role='admin'/>
      <ProtectedRoute path='/AdminProfile' component={AdminProfile} role='admin'/>
      <ProtectedRoute path='/ManageUsers' component={ManageUsers} role='admin'/>
      <ProtectedRoute path='/ManageBooks' component={ManageBooks} role='admin'/>
      <ProtectedRoute path='/ViewBorrowedBooks' component={ViewBorrowedBooks} role='admin'/>
      <ProtectedRoute path='/ViewReturnedBooks' component={ViewReturnedBooks} role='admin'/>

      <ProtectedRoute path='/LibrarianDashboard' component={LibrarianDashboard} role='librarian'/>
      <ProtectedRoute path='/LibrarianBorrowBooks' component={LibrarianBorrowBooks} role='librarian'/>
      <ProtectedRoute path='/LibrarianReturnBooks' component={LibrarianReturnBooks} role='librarian'/>
      <ProtectedRoute path='/LibrarianProfile' component={LibrarianProfile} role='librarian'/>

      <ProtectedRoute path='/UserDashboard' component={UserDashboard} role='user'/>
      <ProtectedRoute path='/UserBookShelf' component={UserBookShelf} role='user'/>
      <ProtectedRoute path='/UserProfile' component={UserProfile} role='user' />
    </Switch>
  </Router>
);

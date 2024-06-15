import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';

import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Routes>
          {/* Redirect to home */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public routes */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={user.id ? <Navigate to="/user" /> : <LoginPage />} />
          <Route path="/registration" element={user.id ? <Navigate to="/user" /> : <RegisterPage />} />
          <Route path="/home" element={user.id ? <Navigate to="/user" /> : <LandingPage />} />

          {/* Protected routes */}
          <Route path="/user" element={<ProtectedRoute user={user}><UserPage /></ProtectedRoute>} />
          <Route path="/info" element={<ProtectedRoute user={user}><InfoPage /></ProtectedRoute>} />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<h1>404 - Not Found</h1>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

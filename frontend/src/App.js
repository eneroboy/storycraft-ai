import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BooksPage from "./components/BooksPage";
import HomePage from "./components/HomePage";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from './components/ProtectedRoute';

//import './css/template.css';  // Global CSS for the whole app

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route index element={<Navigate to="/home" />} />
                <Route path="home" element={<HomePage />} />
                <Route path="/*" element={
                <MainLayout>
                  <Routes>
                    <Route path="books" element={
                      <ProtectedRoute>
                        <BooksPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </MainLayout>
                } 
                />
                </Routes>
        </Router>
    );
}

export default App;

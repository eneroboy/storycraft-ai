import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import BooksPage from "./components/BooksPage";
import HomePage from "./components/HomePage";
import MainLayout from "./components/MainLayout";
import ProtectedRoute from './components/ProtectedRoute';
import ListenPage from "./components/ListenPage";
import ProfilePage from "./components/ProfilePage";
import AddBookPage from "./components/AddBookPage";
import EditBookPage from "./components/EditBookPage";
import ModelsPage from "./components/ModelsPage";
import AddPage from "./components/AddPage";
import RecordPage from "./components/RecordPage";
import AddVoiceModelPage from "./components/AddVoiceModelPage";
import AddSuccessfulPage from "./components/AddSuccessfulPage";


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
                    <Route path="add" element={
                      <ProtectedRoute>
                        <AddPage />
                      </ProtectedRoute>
                    } />
                    <Route path="add-record-voice/:id" element={
                      <ProtectedRoute>
                        <RecordPage />
                      </ProtectedRoute>
                    } />
                    <Route path="add-successful" element={
                      <ProtectedRoute>
                        <AddSuccessfulPage />
                      </ProtectedRoute>
                    } />
                    <Route path="add-voice-model" element={
                      <ProtectedRoute>
                        <AddVoiceModelPage />
                      </ProtectedRoute>
                    } />
                    <Route path="listen" element={
                      <ProtectedRoute>
                        <ListenPage />
                      </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } />
                    <Route path="add-book" element={
                      <ProtectedRoute>
                        <AddBookPage />
                      </ProtectedRoute>
                    } />
                    <Route path="edit-book/:id" element={
                      <ProtectedRoute>
                        <EditBookPage />
                      </ProtectedRoute>
                    } />
                    <Route path="models" element={
                      <ProtectedRoute>
                        <ModelsPage />
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

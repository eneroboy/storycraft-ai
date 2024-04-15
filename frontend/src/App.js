// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
//import BooksPage from "./components/BooksPage";
import HomePage from "./components/HomePage";
import MainLayout from "./components/MainLayout";

//import './css/template.css';  // Global CSS for the whole app

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                
                <Route path="/*" element={
                <MainLayout>
                  <Routes>
                    <Route index element={<Navigate to="/home" />} />
                    <Route path="home" element={<HomePage />} />
                    {/* <Route path="books" element={<BooksPage />} /> */}
                  </Routes>
                </MainLayout>
                } 
                />
                </Routes>
        </Router>
    );
}

export default App;

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/global.css';
import './services/api'; // Import your API services

// Lazy load components for better performance
const Home = lazy(() => import('./components/Home'));
const About = lazy(() => import('./components/About'));
const Courses = lazy(() => import('./components/Courses'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Profile = lazy(() => import('./components/Profile'));
const AdminPanel = lazy(() => import('./components/AdminPanel'));
const JoinUs = lazy(() => import('./components/JoinUs')); // Lazy loading JoinUs component

// Loading fallback component
const Loading = () => <div>Loading...</div>;

const App = () => {
    return (
        <Router>
            <div className="container">
                {/* Suspense provides fallback while components are being loaded */}
                <Suspense fallback={<Loading />}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/join-us" element={<JoinUs />} /> {/* Add JoinUs route */}
                        {/* Add a 404 Not Found route */}
                        <Route path="*" element={<div>404 - Page Not Found</div>} />
                    </Routes>
                </Suspense>
            </div>
        </Router>
    );
};

export default App;

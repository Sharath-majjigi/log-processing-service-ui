"use client"; 

import './globals.css'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Layout = ({ children }) => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access_token');
            setIsAuthenticated(!!token);
        };

        checkAuth();

        const interval = setInterval(checkAuth, 1000); 

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false); 
        router.push('/');
    };

    return (
        <html lang="en">
            <body>
                <nav className="navbar">
                    <div className="navbar-brand">
                        <Link href="/">Log Processor</Link>
                    </div>
                    <div className="navbar-links">
                        <Link href="/">Home</Link>
                        <Link href="/upload">Upload</Link>
                        <Link href="/stats">Stats</Link>
                        <Link href="/queue">Queue Status</Link>
                        {isAuthenticated ? (
                            <button onClick={handleLogout} className="logout-button">Logout</button>
                        ) : (
                            <>
                                <Link href="/signup">Signup</Link>
                                <Link href="/login">Login</Link>
                            </>
                        )}
                    </div>
                </nav>
                <main>{children}</main>
            </body>
        </html>
    );
};

export default Layout;
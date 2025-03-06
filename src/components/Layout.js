   "use client"; 

   import './globals.css';
   import Link from 'next/link';

   const Layout = ({ children }) => {
       const isAuthenticated = !!localStorage.getItem('access_token');

       return (
           <html lang="en">
               <body>
                   <nav>
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
                   </nav>
                   <main>{children}</main>
               </body>
           </html>
       );
   };

   export default Layout;
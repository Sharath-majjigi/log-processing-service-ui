  "use client";

   import { useState } from 'react';
   import { login } from '../../services/api';
   import { useRouter } from 'next/navigation';

   const Login = () => {
       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [error, setError] = useState(null);
       const [success, setSuccess] = useState(null);
       const router = useRouter();

       const handleSubmit = async (e) => {
           e.preventDefault();
           setError(null);
           setSuccess(null);
           try {
               await login(email, password);
               setSuccess('Login successful! Redirecting to home...');
               setTimeout(() => {
                   router.push('/'); // Redirect to home after 2 seconds
               }, 2000);
           } catch (err) {
               console.log(err)
               setError(err.response.data.error);
           }
       };

       return (
           <div className="form-container">
               <h1>Login</h1>
               <form onSubmit={handleSubmit}>
                   <input
                       type="email"
                       placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       required
                   />
                   <input
                       type="password"
                       placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       required
                   />
                   <button type="submit">Login</button>
               </form>
               {error && <p className="error">{error}</p>}
               {success && <p className="success">{success}</p>}
           </div>
       );
   };

   export default Login;
   // src/app/signup/page.js
   "use client"; // Mark as a client component

   import { useState } from 'react';
   import { signup } from '../../services/api';
   import { useRouter } from 'next/navigation';

   const Signup = () => {
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
               await signup(email, password);
               setSuccess('Signup successful! Redirecting to login...');
               setTimeout(() => {
                   router.push('/login'); // Redirect to login after 2 seconds
               }, 2000);
           } catch (err) {
               setError(err.response.data.error);
           }
       };

       return (
           <div className="form-container">
               <h1>Signup</h1>
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
                   <button type="submit">Signup</button>
               </form>
               {error && <p className="error">{error}</p>}
               {success && <p className="success">{success}</p>}
           </div>
       );
   };

   export default Signup;
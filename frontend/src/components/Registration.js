import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';

const Registration = ({addUser}) => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState(
        {
            username: "", 
            email: "",
            password:"",
            confirmPassword:""
        }
        );

        const [match, setMatch] = useState(false);

        const handleChange = event => {
            const name = event.target.name;
            const updatedUser = {...newUser}
            updatedUser[name] = event.target.value;
            setNewUser(updatedUser);          
        }

        const handleSubmit = event => {
            event.preventDefault();
            if (match){
                addUser(newUser);
                setMatch(false);          
                setNewUser({
                    username: "", 
                    email: "",
                    password:"",
                    confirmPassword:""    
                })
                navigate('/')
            }
        }

        const checkPassword = event =>{
            if (newUser.password === event.target.value){
                setMatch(true);
            }else{
                setMatch(false)
            }
        }

     return (
       <div className="flex items-center justify-center min-h-screen min-w-[80vw] bg-gray-100">
         <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
           <form onSubmit={handleSubmit} className="space-y-6">
             <h2 className="text-2xl font-semibold text-center text-gray-700">
               Sign Up
             </h2>

             <div>
               <label
                 htmlFor="email"
                 className="block text-sm font-medium text-gray-600"
               >
                 Email:
               </label>
               <input
                 id="email"
                 type="email"
                 name="email"
                 placeholder="Email"
                 value={newUser.email}
                 required
                 onChange={handleChange}
                 className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             <div>
               <label
                 htmlFor="username"
                 className="block text-sm font-medium text-gray-600"
               >
                 Username:
               </label>
               <input
                 id="username"
                 type="text"
                 name="username"
                 placeholder="Username"
                 value={newUser.username}
                 required
                 onChange={handleChange}
                 className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             <div>
               <label
                 htmlFor="password"
                 className="block text-sm font-medium text-gray-600"
               >
                 Password (minimum 1 character):
               </label>
               <input
                 id="password"
                 type="password"
                 name="password"
                 placeholder="Password"
                 value={newUser.password}
                 minLength="1"
                 required
                 onChange={handleChange}
                 className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             <div>
               <label
                 htmlFor="confirm_password"
                 className="block text-sm font-medium text-gray-600"
               >
                 Confirm Password:
               </label>
               <input
                 id="confirm_password"
                 type="password"
                 name="confirmPassword"
                 placeholder="Confirm Password"
                 value={newUser.confirmPassword}
                 minLength="1"
                 required
                 onChange={handleChange}
                 onKeyUp={checkPassword}
                 className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
               />
             </div>

             {newUser.confirmPassword !== "" && (
               <div className="text-sm text-center">
                 {match ? (
                   <p className="text-green-600">Passwords match ✅</p>
                 ) : (
                   <p className="text-red-600">Passwords don't match ❌</p>
                 )}
               </div>
             )}

             <button
               type="submit"
               disabled={newUser.confirmPassword !== "" && match ? false : true}
               className={`w-full py-2 rounded ${
                 match ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"
               } transition-colors duration-200`}
             >
               Create Account
             </button>

             <div className="text-center">
               <Link to="/" className="text-blue-500 hover:underline">
                 <p>Log in</p>
               </Link>
             </div>
           </form>
         </div>
       </div>
     );

}

export default Registration;
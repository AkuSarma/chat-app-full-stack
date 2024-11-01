import { useState, useContext } from "react"
import UserContext from "../UserContext";
import { Link, useNavigate } from 'react-router-dom'
// import './Login.css'

const Login = ({fetchLogIn}) => {
    const navigate = useNavigate()
    const {loggedInUser} = useContext(UserContext);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = event => {
        const propertyName = event.target.name
        const copiedUser = {...user}
        copiedUser[propertyName] = event.target.value
        setUser(copiedUser)
    }

    const handleSubmit = event => {
        event.preventDefault()
        fetchLogIn(user).then(savedUser => {
            if(savedUser !== undefined && savedUser.username) {
                setUser({
                    username: "",
                    password: ""
                })
                navigate('/chat')
            }
        })
    }

    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-700">
              Log In
            </h2>

            {loggedInUser !== undefined && loggedInUser.message ? (
              <p className="text-red-500 text-sm text-center">
                {loggedInUser.message}
              </p>
            ) : (
              <p className="hidden"></p>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username or Email:
              </label>
              <input
                type="text"
                id="login-username"
                name="username"
                placeholder="Username or Email"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password:
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200"
            >
              Log in
            </button>

            <div className="text-center">
              <Link to="signup" className="text-blue-500 hover:underline">
                <p>Sign up</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
}

export default Login
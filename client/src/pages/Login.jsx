import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { voteActions } from '../store/vote-slice'

const Login = () => {
  const [userData, setUserData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const changeInputHandler = (e) => {
    setUserData(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
}

const loginVoter = async (e) => {
  e.preventDefault()
  try {
    const response = await axios.post(`http://localhost:4000/api/voters/login`, userData)
    const newVoter = await response.data
    //save new voter data to local storage
    localStorage.setItem('currentUser', JSON.stringify(newVoter))
    dispatch(voteActions.changeCurrentVoter(newVoter))
    navigate("/results")
  } catch (error) {
    setError(error.response.data.message )
  }
}
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login to Your Account</h2>
        <form onSubmit={loginVoter}>
          {error && 
          <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              onChange={changeInputHandler}
              autoComplete="on"
              autoFocus
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter your password"
              onChange={changeInputHandler}
              autoComplete="on"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition mb-4"
            type="submit"
          >
            Login
          </button>
          <p className="text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-500 hover:underline font-medium">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  )
}

export default Login
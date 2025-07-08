import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const registerVoter = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post(`http://localhost:4000/api/voters/register`,userData);
      navigate('/login');
      
    } catch (error) {
      setError(error.rsponse.data.message);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Sign Up</h2>
        <form onSubmit={registerVoter} className="space-y-4">
          {error && (
            <p className="bg-red-500 text-black text-sm p-3 rounded text-center">{error}</p>
          )}

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={userData.fullName}
            onChange={changeInputHandler}
            autoFocus
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={userData.email}
            onChange={changeInputHandler}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userData.password}
            onChange={changeInputHandler}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={userData.confirmPassword}
            onChange={changeInputHandler}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition"
          >
            Register
          </button>

          <p className="text-sm text-center mt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;

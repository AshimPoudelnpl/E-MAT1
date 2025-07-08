import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Congrats = () => {
  const token = useSelector(state => state.vote.currentVoter?.token); // ✅ Fixed typo
  const navigate = useNavigate();

  // ✅ Redirect if user accesses this without voting
  useEffect(() => {
    if (!token) {
      navigate('/');
    }

  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Thanks for your Vote</h2>
        <p className="mb-6 text-gray-700">
          Your vote is now added to your candidate's vote count. You will be redirected shortly to see the new result.
        </p>
        <Link
          to="/results"
          className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded transition"
        >
          See Results
        </Link>
      </div>
    </section>
  );
};

export default Congrats;

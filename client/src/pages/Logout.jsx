import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { voteActions } from '../store/vote-slice';

const Logout = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()

  useEffect(() => {
  dispatch(voteActions.changeCurrentVoter(null))
  localStorage.removeItem("currentUser")   
  navigate("/login") 
  }, []);

  return null; // Or show a spinner/message if you want
};

export default Logout;
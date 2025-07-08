import Image from '../assets/header_img.png'
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center text-gray-800'>
        <img src={Image} alt="" className='w-36 h-36 rounded-full mb-6' />
        <h1 className='flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2'>Hey Developer</h1>
        <h2 className='text-3xl sm:text-5xl font-semibold mb-4'>Welcome to E-MAT App</h2>
        <p className='mb-8 max-w-md'> Voting is a process where individuals express their choice or opinion, usually in an election or decision-making process. Each person casts a vote, and the option with the most votes typically wins. Voting ensures that decisions are made democratically and fairly.</p>
        <button
          onClick={() => navigate('/login')}
          className='border border-gray-200 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'
        >
          Get Started
        </button>
    </div>
  )
}


export default Header
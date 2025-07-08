import { useState ,useEffect} from 'react';
import { IoMdTrash } from 'react-icons/io';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ElectionCandidate = ({ fullName, image, motto ,_id:id}) => {
    const token = useSelector(state => state.vote.currrentVoter?.token);
    const isAdmin = useSelector(state => state.vote.currrentVoter?.isAdmin);

    const navigate=useNavigate()
    const deleteCandidates = async () => {
        try {
            const response = await axios.delete(
                `http://localhost:4000/api/candidates/${id}`,
                {
                    withCredentials: true,
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            navigate(0)
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, []);
    return (
        <li className="flex items-center gap-4 p-4 bg-white rounded-lg shadow mb-4">
            <div>
                <img
                    src={image}
                    alt={fullName}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                />
            </div>
            <div className="flex-1">
                <h5 className="text-lg font-semibold text-gray-800">{fullName}</h5>
                <small className="block text-gray-500 mt-1">
                   {motto?.length > 70 ? motto.substring(0, 70) + "..." : motto}
                </small>
            </div>
            {isAdmin && (
            <button
                className="p-2 rounded-full hover:bg-red-100 text-red-600 transition-colors"
                aria-label="Delete candidate"
                onClick={handleDeleteElection}
            >
                <IoMdTrash size={20} />
            </button>
            )}
        </li>
    );
};

export default ElectionCandidate;
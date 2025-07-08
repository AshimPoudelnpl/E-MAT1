import React from 'react';
import { useDispatch } from 'react-redux';
import { uiActions } from '../store/ui-slice';
import { voteActions } from '../store/vote-slice';



const Candidate = ({ _id:id , image, fullName, motto }) => {

  const dispatch = useDispatch();
  

  const openVoteCandidateModal = () => {
    dispatch(uiActions.openVoteCandidateModal());
    dispatch(voteActions.changeSelectedVoteCandidate(id));

    
  }

   
  return (
    <article className="candidate bg-white rounded-lg shadow-md p-4 flex flex-col items-center">
      <div className="candidate_image w-24 h-24 mb-4">
        <img
          src={image}
          alt={fullName}
          className="w-full h-full object-cover rounded-full border-2 border-gray-200"
        />
      </div>
      <h5 className="text-lg font-semibold text-gray-800 text-center">
        {fullName?.length > 20 ? fullName.substring(0, 20) + "..." : fullName}
      </h5>
      <small className="text-gray-500 text-center block mb-4">
        {motto?.length > 20 ? motto.substring(0, 20) + "..." : motto}
      </small>
      <button  onClick={openVoteCandidateModal} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Vote
      </button>
    </article>
  )
}

export default Candidate
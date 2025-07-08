import { useEffect, useState } from "react";
// import { candidates } from "../data";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import axios from "axios";
import { voteActions } from "../store/vote-slice";
import { useNavigate } from "react-router-dom";

const ConfirmVote = ({ selectedElection }) => {
  console.log("Selected Election ID:", selectedElection);

  const [modalCandidate, setModalCandidate] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();
  // close confirm vote modal
  const closeCandidateModal = () => {
    dispatch(uiActions.closeVoteCandidateModal()());
  };

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const currentVoter = useSelector((state) => state?.vote?.currentVoter);
  // get selected candidate id from redux store
  const selectedVoteCandidate = useSelector(
    (state) => state?.vote?.selectedVoteCandidate
  );

  //get the selected candidate
  // const fetchCandidate = () => {
  //   candidates.find((candidate) => {
  //     if (candidate.id === selectedVoteCandidate) {
  //       setModalCandidate(candidate);
  //     }
  //   });

  // };

  // Get the candidates selected to be voted for in a chosen election
  const fetchCandidate = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/candidates/${selectedVoteCandidate}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const results = await response.data;
      setModalCandidate(results);
    } catch (error) {
      console.log(error);
    }
  };

  // Confirm Vote for selected candidate
  const confirmVote = async () => {
  try {
    if (!selectedVoteCandidate || !selectedElection) {
      throw new Error("Missing candidate or election ID.");
    }
    const response = await axios.patch(
      `http://localhost:4000/api/candidates/${selectedVoteCandidate}/vote`,
      { selectedElection },
      {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    // Assuming backend just returns a success message, not the updated votedElections array
    dispatch(
      voteActions.changeCurrentVoter({
      ...currentVoter,
      votedElections: [...(currentVoter.votedElections || []), selectedElection],
      })
    );
    window.location.reload();

    closeCandidateModal();
    navigate("/congrats");
  } catch (error) {
    console.error("Error confirming vote.", error.response?.data || error.message);
    alert(error.response?.data?.message || "An error occurred while casting your vote.");
  }
};


  useEffect(() => {
    fetchCandidate();
  }, []);
  return (
    <section className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h5 className="text-lg font-semibold text-blue-700 mb-4">
          Please Confirm Your Vote
        </h5>

        <div className="flex justify-center mb-4">
          <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-blue-100 shadow">
            <img
              src={modalCandidate.image}
              alt={modalCandidate.fullName || "Candidate"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-xl font-bold">{modalCandidate?.fullName?.length > 17
            ? modalCandidate?.fullName.substring(0, 17) + "..."
            : modalCandidate?.fullName}</h2>
        <p className="text-gray-600 my-2">{modalCandidate?.motto?.length > 40
            ? modalCandidate?.motto.substring(0, 40) + "..."
            : modalCandidate?.motto}</p>


        <div className="flex justify-center gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
            onClick={closeCandidateModal}
          >
            Cancel
          </button>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            onClick={confirmVote}
          >
            Confirm
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmVote;

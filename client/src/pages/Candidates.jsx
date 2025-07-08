import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import Candidate from "../components/Candidate";
import ConfirmVote from "../components/ConfirmVote";
import Loader from "../components/Loader";

const Candidates = () => {
  const { id: selectedElection } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [canVote, setCanVote] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);

  const voteCandidateModalShowing = useSelector(
    (state) => state.ui.voteCandidateModalShowing
  );
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const voterId = useSelector((state) => state?.vote?.currentVoter?.id);

  const navigate = useNavigate();

  const getCandidates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/${selectedElection}/candidates`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setError("Failed to load candidates.");
    }
  };

  const getVoter = async () => {
    try {
      if (!voterId || !token) return;
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/voters/${voterId}`,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const votedElections = response.data.votedElections || [];
      if (votedElections.includes(selectedElection)) {
        setCanVote(false);
      }
    } catch (error) {
      console.error("Error fetching voter data:", error.message);
      setError("Failed to load voter data.");
    }
  };

  const handleCloseConfirmVote = () => {
    setSelectedCandidateId(null);
    // Normally you'd dispatch to Redux to close the modal
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getCandidates(), getVoter()]);
      setLoading(false);
    };

    fetchData();
  }, [selectedElection, voterId, token, navigate]);

  if (loading) return <Loader />;

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-blue-50 to-gray-100 min-h-screen">
        {error ? (
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-red-700 tracking-tight drop-shadow">
              Error
            </h1>
            <p className="text-lg text-red-500 mb-8">{error}</p>
          </header>
        ) : !canVote ? (
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800 tracking-tight drop-shadow">
              Already Voted
            </h1>
            <p className="text-lg text-gray-500 mb-8">
              You are only permitted to vote once in this election. Please check
              back later.
            </p>
          </header>
        ) : (
          <>
            {candidates.length > 0 ? (
              <>
                <header className="mb-12 text-center">
                  <h1 className="text-4xl font-extrabold mb-4 text-gray-800 tracking-tight drop-shadow">
                    Vote Your Candidate
                  </h1>
                  <p className="text-lg text-gray-500 mb-8">
                    Select your preferred candidate below and cast your vote.
                  </p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {candidates.map((candidate) => (
                    <Candidate
                      key={candidate._id}
                      {...candidate}
                      onSelect={() => setSelectedCandidateId(candidate._id)}
                    />
                  ))}
                </div>
              </>
            ) : (
              <header className="mb-12 text-center">
                <h1 className="text-4xl font-extrabold mb-4 text-gray-800 tracking-tight drop-shadow">
                  Inactive Election
                </h1>
                <p className="text-lg text-gray-500 mb-8">
                  There are no candidates for this election. Please check back
                  later.
                </p>
              </header>
            )}
          </>
        )}
      </section>

      {voteCandidateModalShowing && (
        <ConfirmVote
          selectedElection={selectedElection}
          selectedCandidateId={selectedCandidateId}
          onClose={handleCloseConfirmVote}
        />
      )}
    </>
  );
};

export default Candidates;

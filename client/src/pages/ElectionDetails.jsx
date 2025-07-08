import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ElectionCandidate from "../components/ElectionCandidate";
// import { elections } from "../data";
// import { candidates } from "../data";
// import { voters } from "../data";
import { IoAddOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice.jsx";
import AddCandidateModal from "../components/AddCandidateModal";
import axios from "axios";
import Loader from "../components/Loader";
import confirmDelete from "../utils/confrimDelete.js";
import { voteActions } from "../store/vote-slice.jsx";

const ElectionDetails = () => {
  const [election, setElection] = useState([]);
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [voters, setVoters] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddCandidateModalShowing = () => {
    dispatch(uiActions.openAddCandidateModal());
    dispatch(voteActions.changeAddCandidateElectionId(id));
  };

  const addCandidateModalShowing = useSelector(
    (state) => state.ui.addCandidateModalShowing
  );
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  const fetchSelectedElection = async () => {
    setIsloading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/${id}`, 
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response) {
        console.log("Err fetching election", response);
      }
      setElection(response.data);
    } catch (error) {
      console.error(error.message);
    }
    setIsloading(false);
  };

  const fetchElectionCandidates = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/${id}/candidates`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response) {
        console.log("Err fetching election", response);
      }
      setElectionCandidates(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchElectionVoters = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/${id}/voters`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (!response) {
        console.log("Err fetching election", response);
      }
      setVoters(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleDeleteElection = async () => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:4000/api/elections/${id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (response) {
          navigate("/elections");
        }
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchSelectedElection();
    fetchElectionCandidates();
    fetchElectionVoters();
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <>
      {isLoading && <Loader />}
      <section className="py-10 bg-gray-50 min-h-screen">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow p-8">
          <h2 className="text-3xl font-bold mb-4">{election.title}</h2>
          <p className="text-gray-700 mb-6">{election.description}</p>
          <div className="flex justify-center mb-8">
            <img
              src={election.thumbnail}
              alt={election.title}
              className="w-64 h-40 object-cover rounded shadow"
            />
          </div>
          <div className="mb-10">
            <h3 className="text-2xl font-semibold mb-4">Candidates</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {electionCandidates.map((candidate) => (
                <ElectionCandidate key={candidate._id} {...candidate} /> 
              ))}
              {isAdmin && (
                <button onClick={handleAddCandidateModalShowing}>
                  <IoAddOutline />
                </button>
              )}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Voters</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200 rounded">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b font-medium text-left">
                      Full Name
                    </th>
                    <th className="px-4 py-2 border-b font-medium text-left">
                      Email Address
                    </th>
                    <th className="px-4 py-2 border-b font-medium text-left">
                      Time
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {voters.map((voter) => (
                    <tr key={voter._id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{voter.fullName}</td>
                      <td className="px-4 py-2 border-b">{voter.email}</td>
                      <td className="px-4 py-2 border-b">
                        {new Date(voter.time).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {isAdmin && (
            <button onClick={handleDeleteElection}>Delete Election</button>
          )}
        </div>
      </section>
      {addCandidateModalShowing && <AddCandidateModal />} {/* ✅ fixed modal */}
    </>
  );
};

export default ElectionDetails;

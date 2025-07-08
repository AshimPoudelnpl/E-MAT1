import React, { useEffect, useState } from "react";
// import { candidates } from "../data";
import CandidateRating from "./CandidateRating";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const ResultElection = ({ _id: id, thumbnail, title }) => {
  const [totalVotes, setTotalVotes] = useState(0);
  const [electionCandidates, setElectionCandidates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const getCandidates = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/${id}/candidates`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const candidates = await response.data;
      setElectionCandidates(candidates);
      for (let i = 0; i < candidates.length; i++) {
        setTotalVotes((prevState) => (prevState += candidates[i].voteCount));
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <>
    <article className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 m-4 border border-gray-100">
      <header className="flex flex-col gap-6 items-start">
        {/* Election Image */}
        <div className="flex-shrink-0 w-full flex justify-center">
          <img
            src={thumbnail || "https://dummyimage.com/128x128/ccc/000&text=No+Image"}
            alt={title}
            className="w-32 h-32 object-cover rounded-xl shadow border border-gray-200 bg-gray-100"
            onError={e => { e.target.onerror = null; e.target.src = "https://dummyimage.com/128x128/ccc/000&text=No+Image"; }}
          />
        </div>

        {/* Election Info & Candidates */}
        <div className="flex-1 w-full flex flex-col">
          <h4 className="text-2xl font-extrabold text-gray-800 mb-2">{title}</h4>
          <ul className="flex flex-col gap-3 mt-3">
            {electionCandidates.map(candidate => (
              <li
                key={candidate._id || candidate.id}
                className="flex items-center bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-sm p-2 hover:shadow-lg transition-shadow"
                role="listitem"
              >
                {/* Candidate image */}
                <img
                  src={candidate.thumbnail || "https://dummyimage.com/40x40/ccc/000&text=No+Img"}
                  alt={candidate.name}
                  className="w-10 h-10 object-cover rounded-full mr-3 border-2 border-blue-300 shadow"
                  onError={e => { e.target.onerror = null; e.target.src = "https://dummyimage.com/40x40/ccc/000&text=No+Img"; }}
                />
                <div className="flex-1">
                  <CandidateRating {...candidate} totalVotes={totalVotes} />
                </div>
              </li>
            ))}
          </ul>
          <Link to={`/elections/${id}/candidates`} className="block mt-5">
            <button className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-800 text-white text-lg font-bold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all">
              Enter Election
            </button>
          </Link>
        </div>
      </header>
    </article>
    </>
  )
}

export default ResultElection;

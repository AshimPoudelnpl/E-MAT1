import { useEffect, useState } from "react";
// import {elections as dummyElections} from "../data";
import ResultElection from "../components/ResultElection";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const [elections, setElections] = useState([]);

  const navigate = useNavigate();

  const token = useSelector((state) => state?.vote?.currentVoter?.token);

  const getElections = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const elections = await response.data;
      setElections(elections);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
    getElections();
  }, [token, navigate]);

  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6 items-center">
          {elections.length === 0 && (
            <p>No elections found.</p>
          )}
          {elections.map(electionItem => (
            <div key={electionItem._id} className="w-full max-w-md">
              <ResultElection {...electionItem} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Results

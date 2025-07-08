import React, { useEffect, useState } from "react";
// import { elections as dummyElections } from "../data";
import Election from "../components/Election";
import AddElectionModal from "../components/AddElectionModal";
import UpdateElectionModal from "../components/UpdateElectionModal";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import Loader from "../components/Loader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Elections = () => {
  const [elections, setElections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // open election modal
  const openAddElectionModal = () => {
    dispatch(uiActions.openElectionModal());
  };

  // set the initial state for election modal showing to false
  const electionModalShowing = useSelector(
    (state) => state.ui.electionModalShowing
  );

  // set the initial state for update election modal showing to false
  const updateElectionModalShowing = useSelector(
    (state) => state.ui.updateElectionModalShowing
  );

  // Get all elections from db
  const getElections = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      const results = await response.data;
      // Set elections collected from DB
      setElections(results);
      //
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    getElections();
    
    // if (!token) {
    //   navigate("/");
    // }
  }, []);
  return (
    <>
      <section className="py-8 bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4">
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Ongoing Elections</h1>
{/* 
            Show button ONLY if user is admin and token exists */} 
           {/* / {token && isAdmin && ( */}
              <button
                onClick={openAddElectionModal}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Create New Election
              </button>
            {/* )} */}
          </header>
        <menu className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {elections.map((election) => (
              <Election key={election._id} {...election} />
               ))}
         </menu>

          
            
          </div>
      
      </section>

      {electionModalShowing && <AddElectionModal />}
      {updateElectionModalShowing && (
        <UpdateElectionModal/>
         )}
        
      
    </>
  );
};

export default Elections;

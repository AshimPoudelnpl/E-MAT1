import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCandidateModal = () => {
  const [fullName, setFullName] = useState("");
  const [motto, setMotto] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  const electionId = useSelector(
    (state) => state?.vote?.addCandidateElectionId
  );

  const handleAddCandidate = async (e) => {
    try {
      e.preventDefault();
      // Log the details to debug
      console.log("API URL:", `http://localhost:4000/api/elections/candidates`);
      console.log("Election ID:", electionId);
      /////////
      const candidateInfo = new FormData();
      candidateInfo.set("fullName", fullName);
      candidateInfo.set("motto", motto);
      candidateInfo.set("image", image);
      candidateInfo.set("currentElection", electionId);
      const response = await axios.post(
        `http://localhost:4000/api/elections/candidates`,
        candidateInfo,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Response adding candidate: ", response.data);
      navigate(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  // function to close add candidate modal showing
  const closeCandidateModal = () => {
    dispatch(uiActions.closeAddCandidateModal());
  };
    return (
        <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
                <header className="flex justify-between items-center mb-4">
                    <h4 className="text-xl font-semibold">Add Candidate</h4>
                    <button className="text-gray-400 hover:text-gray-600" onClick={closeModal}><IoMdClose /></button>
                </header>
                <form
                    className="space-y-4"
                    onSubmit={handleAddCandidate}
                >
                    <div>
                        <h6 className="mb-1 text-sm font-medium">Candidate Name:</h6>
                        <input
                            type="text"
                            value={fullName}
                            name="fullName"
                            onChange={e => setFullName(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <h6 className="mb-1 text-sm font-medium">Candidate Motto:</h6>
                        <input
                            type="text"
                            value={motto}
                            name="motto"
                            onChange={e => setMotto(e.target.value)}
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="file"
                            name="image"
                            onChange={e => setImage(e.target.files[0])}
                            accept="image/png,image/jpg,image/jpeg,image/webp,image/avif"
                            className="w-full border border-gray-300 rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                        {image && (
                            <div className="mt-2 text-xs text-gray-500">
                                Selected: {image.name}
                            </div>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                    >
                        Add Candidate
                    </button>
                </form>
            </div>
        </section>
    )
}

export default AddCandidateModal
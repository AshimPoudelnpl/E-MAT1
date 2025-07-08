import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddElectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  //function to close Election Modal
  const closeElectionModal = () => {
    dispatch(uiActions.closeElectionModal());
  };

  const createElection = async (e) => {
    e.preventDefault();
    const electionData = new FormData();
    electionData.set("title", title);
    electionData.set("description", description);
    electionData.set("thumbnail", thumbnail);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/elections`,
        electionData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("create election response:", response.data);
      closeElectionModal();
      navigate(0);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <section className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <header className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Create new Election</h2>
          <button
            className="text-gray-500 hover:text-gray-700 text-2xl"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            type="button"
            aria-label="Close"
          >
            <IoMdClose />
          </button>
        </header>
        <form onSubmit={createElection}>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Election Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Election Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium">Election Thumbnail:</label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg,.webp"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Election
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddElectionModal;

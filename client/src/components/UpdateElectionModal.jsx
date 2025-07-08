import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UpdateElectionModal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const dispatch = useDispatch();
  const naviagte = useNavigate();

  const idOfElectionToUpdate = useSelector(
    (state) => state?.vote?.idOfElectionToUpdate
  );
  const token = useSelector((state) => state?.vote?.currentVoter?.token);
  console.log("Token:", token);

  //function to close Update Election Modal
  const closeUpdateElectionModal = () => {
    dispatch(uiActions.closeUpdateElectionModal());
  };

  const fetchElection = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/elections/elections/${idOfElectionToUpdate}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("get election to update response: ", response);
      const election = await response.data;
      setTitle(election.title);
      setDescription(election.description);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchElection();
  }, []);

  const updateElection = async (e) => {
    e.preventDefault();
    try {
      const electionData = new FormData();
      electionData.set("title", title);
      electionData.set("description", description);
      if (thumbnail) {
        electionData.set("thumbnail", thumbnail); // Only if there's a file selected
      }
      console.log("Form Data:", {
        title,
        description,
        thumbnail: thumbnail ? thumbnail.name : "No file selected",
      });

      const response = await axios.patch(
        `${process.env.REACT_APP_API_URL}/elections/${idOfElectionToUpdate}`,
        electionData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response for updated election", response.data);
      naviagte(0);
    } catch (error) {
      console.error("Error updating election:", error.message);
    }
  };

  return (
    <section className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <header className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Update Election</h3>
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

        <form onSubmit={updateElection}>
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
            <label className="block mb-1 text-sm font-medium">Thumbnail (optional):</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setThumbnail(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Update Election
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateElectionModal;

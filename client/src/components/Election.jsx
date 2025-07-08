import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { uiActions } from "../store/ui-slice";
import { voteActions } from "../store/vote-slice";

const Election = ({ _id: id, title, description, thumbnail }) => {
  const dispatch = useDispatch();

  const isAdmin = useSelector((state) => state?.vote?.currentVoter?.isAdmin);

  // open update election modal
  const openUpdateElectionModal = () => {
    dispatch(uiActions.openUpdateElectionModal());
    dispatch(voteActions.changeIdOfElectionToUpdate(id));
  };
    return (
        <article className="bg-white p-4 rounded shadow">
            {thumbnail ? (
                <img
                    src={thumbnail}
                    alt={title || 'Election thumbnail'}
                    className="w-full h-48 object-cover rounded"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 rounded">
                    No Image
                </div>
            )}

            <h2 className="text-xl font-semibold mt-3 mb-2">
                <Link to={`/elections/${id}`} className="hover:underline text-blue-600">
                    {title}
                </Link>
            </h2>

            <p className="text-gray-600">
                {description?.length > 200 ? description.slice(0, 200) + '...' : description}
            </p>

            <div className="flex gap-2 mt-4">
                <Link
                    to={`/elections/${id}`}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-center"
                // The Link component itself does not fetch or gather data from data.jsx or any data source.
                // It only navigates to the specified route. To display or use data from data.jsx,
                // you need to import and use that data in the component that renders this Election component,
                // or fetch the data in the route/page you navigate to.
                >
                    View
                </Link>

                {isAdmin && <Link onClick={openModal}
                    to={`/elections/${id}/edit`}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-center"
                >
                    Edit
                </Link>}
            </div>
        </article>
    );
};

export default Election;

const CandidateRating = ({ fullName, image, voteCount, totalVotes }) => {
  const percentage = totalVotes > 0 ? (voteCount / totalVotes) * 100 : 0;

  return (
    <div className="result_candidate">
      <div className="result_candidate-image">
        <img 
          src={image || "https://via.placeholder.com/40?text=No+Image"} 
          alt={fullName || "Candidate"} 
        />
      </div>
      <div className="result_candidate-info">
        <h5>{fullName}</h5>
        <small>{`${voteCount} ${voteCount === 1 ? 'vote' : 'votes'}`}</small>
      </div>
      <div className="result_candidate-rating">
        <div className="result_candidate-loader">
          <span style={{ width: `${voteCount > 0 ? (voteCount / totalVotes) * 100 : 0}%` }}></span>
        </div>
        <small>{`${voteCount > 0 ? ((voteCount / totalVotes) * 100).toFixed(2) : 0}%`}</small>
      </div>
    </div>
  );
};

export default CandidateRating;

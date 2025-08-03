import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCandidates, addNewCandidate, removeCandidate, editCandidate } from '../../app/slices/candidateSlice';

const CandidateList = () => {
  const dispatch = useDispatch();
  const { list: candidates, isLoading, error } = useSelector((state) => state.candidate);

  // Fetch all candidates
  const fetchCandidatesData = () => {
    dispatch(fetchAllCandidates());
  };

  // Add a new candidate
  const addCandidate = (candidateData) => {
    dispatch(addNewCandidate(candidateData));
  };

  // Delete a candidate
  const deleteCandidateById = (id) => {
    dispatch(removeCandidate(id));
  };

  // Update a candidate
  const updateCandidateInfo = (candidateData) => {
    dispatch(editCandidate(candidateData));
  };

  return (
    <div>
      <button onClick={fetchCandidatesData}>Load Candidates</button>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          candidates.map((candidate) => (
            <div key={candidate._id}>
              <p>{candidate.name}</p>
              <button onClick={() => deleteCandidateById(candidate._id)}>Delete</button>
              <button onClick={() => updateCandidateInfo({ ...candidate, name: 'Updated Name' })}>Update</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};


export default CandidateList;
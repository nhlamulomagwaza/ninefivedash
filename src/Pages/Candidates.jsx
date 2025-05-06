import React, { useContext } from 'react'
import Filter from '../components/filter/Filter'
import Candidateslist from '../components/candidateslist/Candidateslist'
import { NineFiveContextAdmin } from '../store/AppContext'
import { MoonLoader } from 'react-spinners'
import './spinner.css';

const Candidates = () => {
  const { filteredCandidates, candidates, loadingCandidates,
    searchCandidateByNames, searchCandidateByIndustry,
    searchCandidateByExperience } = useContext(NineFiveContextAdmin);

  const getNoMatchesMessage = () => {
    let messages = [];

    if (searchCandidateByNames !== '') {
      messages.push(`with the name "${searchCandidateByNames}"`);
    }
    if (searchCandidateByIndustry !== '') {
      messages.push(`in the industry "${searchCandidateByIndustry}"`);
    }
    if (searchCandidateByExperience != 0) {
      messages.push(`with "${searchCandidateByExperience}" years of experience`);
    }

    if (messages.length > 0) {
      return `No candidates found ${messages.join(' and ')}`;
    }
    return null;
  };

  return (
    <section className="candidates">
      <Filter />
  
      {loadingCandidates ? (
        <div className='api-loader'>
          <MoonLoader color='white' size={50} />
        </div>
      ) : (
        candidates && candidates.length === 0 ? (
          <div className='search-not-found'>No candidates yet...</div>
        ) : (
          filteredCandidates.length === 0 && (searchCandidateByNames !== '' || searchCandidateByIndustry !== '' || searchCandidateByExperience !== '') ? (
            <div className='search-not-found'>{getNoMatchesMessage()}</div>
          ) : (
            candidates && filteredCandidates.map((candidate) => (
              <Candidateslist key={candidate._id} candidate={candidate} />
            ))
          )
        )
      )}
    </section>
  );
}

export default Candidates
import React, { useContext } from 'react';
import './filter.css';
import { IoMdSearch } from "react-icons/io";
import { NineFiveContextAdmin } from '../../store/AppContext';

const Filter = ({ originalCandidates }) => { // Pass original candidates as a prop
  const { setSearchCandidateByNames, setSearchCandidateByIndustry,
    setSearchCandidateByExperience,
    searchCandidateByNames, searchCandidateByIndustry,
    searchCandidateByExperience, setFilteredCandidates } = useContext(NineFiveContextAdmin);

  // Function to handle experience change
  const handleExperienceChange = (e) => {
    const selectedValue = e.target.value;

    if (selectedValue === "all") {
      // Refresh the window to reset all filters and show original candidates
      window.location.reload();
    } else {
      const experience = parseInt(selectedValue);
      setSearchCandidateByExperience(experience); // Convert to number
      // Filter candidates based on experience
      const filtered = originalCandidates.filter(candidate => candidate.experience === experience);
      setFilteredCandidates(filtered);
    }
  };

  return (
    <section className="candidates-filter">
      <div className="filter-container">
        <div className="searchby-names">
          <IoMdSearch className='search-icon' />
          <input 
            type="text" 
            placeholder='search candidate by name or surname' 
            value={searchCandidateByNames.trim()} 
            onChange={(e) => setSearchCandidateByNames(e.target.value)}
          />
        </div>

        <div className="searchby-industry">
          <IoMdSearch className='search-icon' />
          <input 
            type="text" 
            placeholder='search candidate by industry' 
            value={searchCandidateByIndustry} 
            onChange={(e) => setSearchCandidateByIndustry(e.target.value)}
          />
        </div>

        <div className="searchby-experience">
          <select id="experience" value={searchCandidateByExperience === null ? "all" : searchCandidateByExperience} onChange={handleExperienceChange}>
            <option value="all">{searchCandidateByExperience > 0? 'All' : 'Filter by years of experience'}</option>
            {Array.from({ length: 50 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
      </div>
    </section>
  )
}

export default Filter;
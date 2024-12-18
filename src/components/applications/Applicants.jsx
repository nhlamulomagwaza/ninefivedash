import React from 'react'
import Filter from '../filter/Filter'
import Candidateslist from '../candidateslist/Candidateslist';
import Candidates from '../../Pages/Candidates';
import CandidatesApplied from '../../Pages/CandidatesApplied';
const Applicants = () => {

  //http://localhost:3500/api/jobsportal/getapplicants/66b37254e236e0204d8686df
  return (
    <section className="applicants">

   <CandidatesApplied/>
    
    </section>
  )
}

export default Applicants
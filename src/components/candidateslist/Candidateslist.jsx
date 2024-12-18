import React from 'react'
import './candidatelist.css';
import { FaDownload } from "react-icons/fa6";


const Candidateslist = ({candidate}) => {

 

  return (
   <section className="candidates-list">
       

       <div className="candidate-info">
                    
                    <div className="candidate-meta-section">
           <p className="candidate-names">
              {candidate.name} {candidate.surname}
           </p>
           <p className="candidate-email">
              {candidate.email}
           </p>
           <p className="candidate-industry">
              {candidate.industry} | {candidate.yearsOfExperience} years
           </p>
           </div>

          

           <div className="cv-resume-section">
            <button className="download-resume" onClick={() => window.open(candidate.resume)}><FaDownload/>Download Resume</button>
           </div>
       </div>
   </section>
  )
}

export default Candidateslist
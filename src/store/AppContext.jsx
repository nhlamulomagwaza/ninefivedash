import React, { useState, useReducer, useEffect } from 'react';
import toast from 'react-hot-toast';
export const NineFiveContextAdmin = React.createContext();

const AppContext = ({ children }) => {
 

  /* SETTING ACTIVE PAGE FOR NAVBAR */

  const initialState = {
    activePage: '',
  };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_ACTIVE_PAGE':
        return { ...state, activePage: action.payload };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);


 /* STORING AUTH DATA */

 const [authUser, setAuthUser] = useState(
  JSON.parse(localStorage.getItem("ninefive-admin-user")) || null
);

const [authUserToken, setAuthUserToken] = useState(JSON.parse(localStorage.getItem('ninefive-admin-accesstoken')) || null
);
 

//This function logouts the user
const logoutUser = () => {

  const confirmLogout= confirm('Are you sure you want to logout?');


  if(confirmLogout){

    localStorage.removeItem("ninefive-admin-user");
    localStorage.removeItem("ninefive-admin-accesstoken");
    
    toast.success("Logged Out Successfully");
  
    setTimeout(() => {
      location.reload(); //The auto reload acts as a crutch to avoid an
      //unnecessary reload
    }, 1000);
  } else{

    return;
  }
};


// This function fetches candidates

const [candidates, setCandidates]=useState([]);
const [candidatesApplied, setCandidatesApplied]=useState([]);
const [loadingCandidates, setLoadingCandidates]=useState(false);



useEffect(() => {
  const fetchCandidates = async () => {
    try {
      setLoadingCandidates(true);
      const response = await fetch(`https://ninefiverecruitment.onrender.com/api/candidates/getCandidates`, {
        method: "GET",
        headers:{
          Authorization: `Bearer ${authUserToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }
      const data = await response.json();
   
      setCandidates(data);
      setLoadingCandidates(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  fetchCandidates();

  const interval = setInterval(fetchCandidates, 30000);

  // Clean up interval when component unmounts
  return () => clearInterval(interval);
 
}, [authUserToken])



//The following stores the global JobId to retrieve applicants based on jobId

const [jobId, setJobId]= useState(null);


const handleJobClick= (jobId)=>{


 setJobId(jobId);
}

useEffect(() => {
  const fetchCandidatesApplied = async () => {
    try {
      setLoadingCandidates(true);
      const response = await fetch(`https://ninefiverecruitment.onrender.com/api/jobsportal/getapplicants/${jobId}
 `, {
        method: "GET",
        headers:{
          Authorization: `Bearer ${authUserToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch candidates");
      }
      const data = await response.json();
      console.log(data)
  
      setCandidatesApplied(data.candidates);
      setLoadingCandidates(false);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };
  fetchCandidatesApplied();

  const interval = setInterval(fetchCandidatesApplied, 30000);

  // Clean up interval when component unmounts
  return () => clearInterval(interval);
 
}, [authUserToken, jobId])



//The following logic filters candidates


const [searchCandidateByNames, setSearchCandidateByNames]= useState('');
const [searchCandidateByIndustry, setSearchCandidateByIndustry]= useState('');
const [searchCandidateByExperience, setSearchCandidateByExperience]= useState(0);



const filteredCandidates = candidates.filter((candidate) => {
  // Convert search terms to lowercase for case-insensitive comparison
  const searchName = searchCandidateByNames.toLowerCase();
  const searchIndustry = searchCandidateByIndustry.toLowerCase();

  // Check if the name search term is provided and matches
  const nameMatch = searchCandidateByNames === '' || candidate.name.toLowerCase().includes(searchName) || candidate.surname.toLowerCase().includes(searchName);

  // Check if the industry search term is provided and matches
  const industryMatch = searchCandidateByIndustry === '' || candidate.industry.toLowerCase().includes(searchIndustry);

  // Check if the experience search term is set to a value greater than 0 and matches
  const experienceMatch = searchCandidateByExperience === 0 || candidate.yearsOfExperience == searchCandidateByExperience;
  // Return true if any of the conditions are met
  return nameMatch && industryMatch && experienceMatch;
});


const filteredCandidatesApplied = candidatesApplied.filter((candidate) => {
  // Convert search terms to lowercase for case-insensitive comparison
  const searchName = searchCandidateByNames.toLowerCase();
  const searchIndustry = searchCandidateByIndustry.toLowerCase();

  // Check if the name search term is provided and matches
  const nameMatch = searchCandidateByNames === '' || candidate.name.toLowerCase().includes(searchName) || candidate.surname.toLowerCase().includes(searchName);

  // Check if the industry search term is provided and matches
  const industryMatch = searchCandidateByIndustry === '' || candidate.industry.toLowerCase().includes(searchIndustry);

  // Check if the experience search term is set to a value greater than 0 and matches
  const experienceMatch = searchCandidateByExperience === 0 || candidate.yearsOfExperience == searchCandidateByExperience;
  // Return true if any of the conditions are met
  return nameMatch && industryMatch && experienceMatch;
});



  
  return (
    <NineFiveContextAdmin.Provider value={{ state, dispatch, authUser,
     setAuthUser, authUserToken, setAuthUserToken, logoutUser,
     candidates, loadingCandidates, filteredCandidates,
     setSearchCandidateByNames, setSearchCandidateByIndustry,
     setSearchCandidateByExperience,
     searchCandidateByNames, searchCandidateByIndustry,
     searchCandidateByExperience, handleJobClick, jobId, filteredCandidatesApplied,
     candidatesApplied
     }}>
      {children}
    </NineFiveContextAdmin.Provider>
  );
};

export default AppContext;
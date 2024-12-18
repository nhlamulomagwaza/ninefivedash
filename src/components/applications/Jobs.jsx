import React, { useContext } from 'react';
import { FaBookmark } from "react-icons/fa";
import { Link } from 'react-router-dom'
import './joblistings.scss';
import { useState, useEffect } from 'react';
import moment from 'moment';
import { MoonLoader } from 'react-spinners';
import JobsFilter from './JobsFilter';
import { NineFiveContextAdmin } from '../../store/AppContext';
import toast from 'react-hot-toast';

const Jobs = () => {




  const {handleJobClick, authUserToken}= useContext(NineFiveContextAdmin);
  const [jobs, setJobs] = useState([]);
  const [loadingJobs, setLoadingJobs] = useState(false);
  
  const handleLoadMore = () => {
    if (jobsPerPage < filteredJobs.length) {
      setJobsPerPage(jobsPerPage + 10); // Increase the number of jobs per page
    }
    // Increase the number of jobs per page
  };

  //The following useEffect will fetch jobs from the server
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoadingJobs(true);
        const response = await fetch(`https://ninefiverecruitment.onrender.com/api/jobsportal/getjobs`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = await response.json();

        setJobs(data.jobs);
        setLoadingJobs(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };
    fetchJobs();


    const interval = setInterval(fetchJobs, 30000);

  // Clean up interval when component unmounts
  return () => clearInterval(interval);
  }, []);

  //The following are the cities which will showup at the filtering system of the jobs portal

  const southAfricanCities = [
    "Cape Town",
    "Johannesburg",
    "Durban",
    "Pretoria",
    "Midrand",
    "Port Elizabeth",
    "Bloemfontein",
    "East London",
    "Mbombela",
    "Kimberley",
    "Umlazi",
    "Vereeniging",
    "Rustenburg",
    "Klerksdorp",
    "Middelburg",
    "Welkom",
    "Bredasdorp",
    "Paarl",
    "Beaufort West",
    "Mthatha",
    "Queenstown",
    "Vryheid",
    "Umtata",
    "Kroonstad",
    "Musina",
    "Upington",
  ];

  //CONSTANTS FOR THE JOBS PORTAL

  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [remoteOnly, setRemoteOnly] = useState(false);
  const [filterJobs, setFilterJobs] = useState([]);
 
 
  const filteredJobs = jobs.filter((job) => {
    return (
      job.location.toLowerCase().includes(selectedCity.toLowerCase()) &&
      (job.title.toLowerCase().includes(search.toLowerCase()) ||
        job.industry.toLowerCase().includes(search.toLowerCase())) &&
      (remoteOnly ? job.remote : true)
    );
  });

  //The function will filter/search jobs based on the selected city
  const handleSelectCity = (event) => {
    /* setSelectedCity(event.target.value); */
    const selectedCity = event.target.value;
    const newJobs = jobs.filter((job) => job.city === selectedCity);
    setSelectedCity(selectedCity);
    setFilterJobs(newJobs);
  };
  const [jobsPerPage, setJobsPerPage] = useState(10);



//The following api function is for deleting a job






const deleteJob = async (jobId) => {
  


  const confirmDelete= confirm('Deleting a job will remove it from the end user portal forever, are you sure?')
    
   if(confirmDelete){

   handleJobClick(jobId)


  try {
    setLoadingJobs(true);
    const response = await fetch(`https://ninefiverecruitment.onrender.com/api/jobsportal/deletejobs/${jobId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${authUserToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete job");
    }
    const data = await response.json();

   console.log(data)
   toast.success('Job deleted successfully')
   setTimeout(() => {
   location.reload();
  }, 1000);
  setLoadingJobs(false);

  
  } catch (error) {
    console.error("Error deleting job:", error);
  }  }else{

    return;
  }


}

  
  return (
       <section className="listings-container">

 <JobsFilter search={search} setSearch={setSearch}
  southAfricanCities={southAfricanCities}
  selectedCity={selectedCity}
  setSelectedCity={setSelectedCity}
  remoteOnly={remoteOnly}
  setRemoteOnly={setRemoteOnly}
  filterJobs={filterJobs}
  setFilterJobs={setFilterJobs}
  handleSelectCity={handleSelectCity}

 
  totalJobs={filteredJobs.length}
  
  />

{loadingJobs ? (
          <div className='api-loader'>
            <MoonLoader color="white" size={35} />
          </div>
        ) : (

   <div className="listings">
   {filteredJobs.slice(0, jobsPerPage).map((job) => (
   <li key={job._id} className="job-card" onClick={()=>handleJobClick(job._id)}>
                  <Link
                    className="links"
                    to={`/applications/applicants`}
                    onClick={()=>handleJobClick(job._id)}
                  >
                    <div className="column1">
                      <p className="company-name">{job.company}</p>
                      <h1 className="job-title">{job.title} ({job.applicants.length} Applicant(s)) </h1>
                      <div className="job-details">
                        <p className="post-date">
                        Posted: {moment(job.createdAt).format("YYYY-MM-DD")}
                        </p>
                        <div className="location">{job.location}</div>
                        <div className="job-type">
                        {job.remote ? "Remote" : "On-Site"}
                        </div>
                      </div>
                    </div>
                  </Link>
                  <div className="column2">
                    <div className="tags">
                      <div className="delete-job" onClick={()=>deleteJob(job._id)}>Delete This Job</div>
                    
                    </div>
                  </div>
                </li>
))} 
   </div>)}
   <div className="matches">
                <p style={{color:'white'}}>
                  {filteredJobs.length == 0 && search.length > 0
                    ? `No Matches For "${search}"`
                    : null}
                </p>
              </div>

              <div className="matches" >
                 <p style={{color:'white'}}>
                  {!loadingJobs && filteredJobs.length == 0 && search.length == 0
                    ? "No jobs to show"
                    : null}
                </p> 
              </div>
              <div className="btn">
              {jobsPerPage < filteredJobs.length ? (
                <button className="load-more" onClick={handleLoadMore}>
                  Load More
                </button>
              ) : null}{" "}
            </div>
       </section>
  )
}

export default Jobs
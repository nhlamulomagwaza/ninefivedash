
import './portalform.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useContext, useState } from 'react';
import './reactQuillToolbar.css';
import toast from 'react-hot-toast';
import  { NineFiveContextAdmin } from '../../store/AppContext';
import { ScaleLoader } from 'react-spinners';
const Portalform = () => {

 const {authUserToken}= useContext(NineFiveContextAdmin);



  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [industry, setIndustry] = useState('');
  const [cityName, setCityName] = useState('');
  const [remote, setRemote] = useState(''); // State for select value
  const [jobDescription, setJobDescription] = useState('Job Description');
  const [loading, setLoading]= useState(false);




  console.log(remote)
  const handleRemoteChange = (e) => {
    setRemote(e.target.value); // Set remote state based on the selected value
  };

  


  const handlePostJob= async (e)=>{
 
 e.preventDefault();

 if(!jobTitle.trim() || !companyName.trim() || !cityName.trim() || !jobDescription.trim() || !industry.trim()){
  return toast.error('All fields are required');
 }



    // If all validations passed, send form data to server.
    try {
    
      setLoading(true);
      const res = await fetch("https://ninefiverecruitment.onrender.com/api/jobsportal/addjobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUserToken}`,
        },
        body: JSON.stringify({ 
          title: jobTitle, 
          description: jobDescription,
          company: companyName,
          industry: industry,
          remote: remote !== 'on-site',  
          
          location:cityName,
          
          
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      if (!res.ok) {
        toast.error(data.message);
      } else if (res.ok) {
        toast.success("Job Added");
        setTimeout(() => {
           setJobTitle('');
           setCompanyName('');
           setIndustry('');
           setCityName('');
           setRemote('');
           setJobDescription('');
           
        }, 1000);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }

  }


  return (
    <form className="portal-form" onSubmit={handlePostJob}>
      <input type="text" placeholder='Job Title' value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
      <input type="text" placeholder='Company Name' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
      <input type="text" placeholder='Industry' value={industry} onChange={(e) => setIndustry(e.target.value)} />
 
      <input type="text" placeholder='Location (City)' value={cityName} onChange={(e) => setCityName(e.target.value)} />
      <select className='remote-onsite' value={remote} onChange={handleRemoteChange}>
  <option value="remote">Remote</option>
  <option value="on-site">On-site</option>
</select>
      <ReactQuill
        theme='snow'
        value={jobDescription}
        onChange={setJobDescription}
        className='react-quill'
      />
      <button className={loading? 'portal-btn2' : 'portal-btn' }>{loading? <ScaleLoader color={loading? 'black' : null } size={10} /> : 'Post Job'}</button>
    </form>
  );
}

export default Portalform;
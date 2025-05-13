import React, { useState } from 'react'
import './auth.css';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader";
const Auth = () => {

   const [email, setEmail]= useState('info@ninefiverecruitment.com');
   const [password, setPassword]= useState('^mgaKTIhNl96Q');
   const [validationErrors, setValidationErrors]= useState(false);
   const [emailValidateErrors, setEmailValidateErrors] = useState(false);
  const [passwordValidateErrors, setPasswordValidateErrors] = useState(false);
 const [loading, setLoading]= useState(false);
 const [isHovered, setIsHovered] = useState(false); // State to track hover

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);



  //THE FOLLOWING FUNCTION VALIDATES THE INPUTS
  function inputsValidation() {

    //USER VALIDATION


    if (!email.trim() && !password.trim()) {
      toast.error('Please fill in all fields');

      if (!email.trim()) {

        setEmailValidateErrors(true)
      }

      if (!password.trim()) {

        setPasswordValidateErrors(true)
      }

      return;


    }



    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');

      if (!email.trim()) {

        setEmailValidateErrors(true)
      }

      if (!password.trim()) {

        setPasswordValidateErrors(true)
      }
      return;

    }




    if (email.length < 3) {

      toast.error('Email should be at least 3 characters');



      setEmailValidateErrors(true);



      return;
    } else {


      setEmailValidateErrors(false);
    }

    if (password.length < 6) {

      toast.error('Password should be at least 6 characters');
      setPasswordValidateErrors(true);
      return;
    } else {


      setPasswordValidateErrors(false);
    }

  }

  //THE USEEEFFECT BELOW TRACKS THE INPUTS AS THEY CHANGE TO UPDATE THE STATE OF THE VALIDATION IN REALTIME
   useEffect(() => {
    if (email.length > 3) {
      setEmailValidateErrors(false);

    }

    if (password.length > 6) {
      setPasswordValidateErrors(false);

    }
  }, [email, password,
    setEmailValidateErrors,
    setPasswordValidateErrors]);

   
   
    const handleSignIn = async (e) => {
     e.preventDefault();

     inputsValidation();



     // IF ALL VALIDATION PASSED, SUBMIT THE FORM TO THE SERVER
    

     try {
      setLoading(true);
      const res = await fetch("https://ninefiverecruitment.onrender.com/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.error) {

        throw new Error(data.error)
      }
      if (!res.ok) {

        toast.error(data.message)
      } else if (res.ok) {

        toast.success('Logged In Successfully');

        setTimeout(() => {
          location.reload();
        }, 1000);

        const existingUser = localStorage.getItem('ninefive-admin-user');
        if (existingUser) {
          // Replace the existing 'abstergo-user' item
          const updatedUser = { ...JSON.parse(existingUser), };
          localStorage.setItem('ninefive-admin-user', JSON.stringify(updatedUser));
        } else {
          // Set a new 'abstergo-user' item
          const newUser = data.user;
          localStorage.setItem('ninefive-admin-user', JSON.stringify(newUser));
        }

        // Check if 'abstergo-accesstoken' exists in local storage
        const existingAccessToken = localStorage.getItem('ninefive-admin-accesstoken');
        if (existingAccessToken) {
          // Replace the existing 'abstergo-accesstoken' item
          const updatedAccessToken = { ...JSON.parse(existingAccessToken), };
          localStorage.setItem('ninefive-admin-accesstoken', JSON.stringify(updatedAccessToken));
        } else {
          // Set a new 'abstergo-accesstoken' item
          const newAccessToken = data.accessToken.token;
          localStorage.setItem('ninefive-admin-accesstoken', JSON.stringify(newAccessToken.trim()));
        }


        setLoading(false)
      }


      //console.log(data)


    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
   
    
   }

  return (
   <section className="auth">
    <form action="" className="sign-in" onSubmit={handleSignIn}>
    {/*   <h1 className="auth-title">Sign In</h1> */}
        <p className="signin-cta">Please sign in with your credentials to continue</p>
      <input type="text" placeholder='email' value={email.trim()} onChange={(e) => setEmail(e.target.value)}
      style={emailValidateErrors ? { backgroundColor: '#ffaea8', border: '1px solid #ff2626' } : { backgroundColor: 'white' }} />
      <input type="password" placeholder='password' value={password.trim()} onChange={(e) => setPassword(e.target.value)}
      style={passwordValidateErrors ? { backgroundColor: '#ffaea8', border: '1px solid #ff2626' } : { backgroundColor: 'white' }}

      />
      <button className="sign-btn"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}

      >{loading ? <ScaleLoader className='loader'         color={isHovered ? 'white' : 'black'}  height={10} /> : 'Sign In'}</button>
      <div className="demo-logins">
        <p className="demo-login">Demo Login</p>
        <div className="demo-credentials">
          <p className="demo-email">Email: info@ninefiverecruitment.com</p>
          <p className="demo-password">Password: ^mgaKTIhNl96Q</p>
      </div>
      </div>
      </form>
   </section>
  )
}

export default Auth
import React, { useContext } from 'react'
import Portalform from '../components/portalform/Portalform'
import { NineFiveContextAdmin } from '../store/AppContext';


const Portal = () => {

  const { } = useContext(NineFiveContextAdmin);


  return (
   <Portalform/>
  )
}

export default Portal
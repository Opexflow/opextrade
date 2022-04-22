// import ChangePassFinam from '../components/changePassword/finamChangePass'
// export default function Changepassword()
// {
//   return (<ChangePassFinam></ChangePassFinam>)
// }

import React, { Component} from 'react';
import dynamic from "next/dynamic";

const ChangeP = dynamic(
  () => {
      return import('../components/changePassword/finamChangePass');
   },{ loading: () => null, ssr: false }
);

const ChangePassword  = () => {
  return <div>
    <ChangeP />
  </div>
}

export default ChangePassword 


import React, { Component} from 'react';
import dynamic from "next/dynamic";

const Finam1 = dynamic(
  () => {
      return import("./finam1");
   },{ loading: () => null, ssr: false }
);

const Finams = () => {
  return <div>
    <Finam1 />
  </div>
}

export default Finams

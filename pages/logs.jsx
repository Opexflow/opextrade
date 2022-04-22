
import React, { Component} from 'react';
import dynamic from "next/dynamic";

const Log1 = dynamic(
  () => {
      return import("./logs1");
   },{ loading: () => null, ssr: false }
);

const Logs = () => {
  return <div>
    <Log1 />
  </div>
}

export default Logs

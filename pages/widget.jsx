
import React, { Component} from 'react';
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => {
      return import("./demo2");
   },{ loading: () => null, ssr: false }
);


const Widget = () => {
  return <div>
    <Editor />
  </div>
}

export default Widget

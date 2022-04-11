
import React, { Component} from 'react';
import dynamic from "next/dynamic";

// const Editor = dynamic(
//   () => {
//       return import("./demo2");
//    },{ loading: () => null, ssr: false }
// );
const Editor = dynamic(
  () => {
      return import("./demo2");
   },{ loading: () => null, ssr: false }
);

const Demo = () => {
  return <div>
    <Editor />
  </div>
}

export default Demo

import React from 'react'
import './App.css'
import DropFileInput from './component/fileUpload'

const onFileChange = (files) => {
  console.log(files);
}

const App = () => {
  return (
    <div className="box">
            <h2 className="header">
                React drop files input
            </h2>
            <DropFileInput
                onFileChange={(files) => onFileChange(files)}
            />
        </div>
  )
}

export default App
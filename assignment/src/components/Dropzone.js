import React from 'react';
import {useDropzone} from 'react-dropzone';
import PropTypes from 'prop-types';


function FileInput({onDropAccepted, onDropRejected, accept}) {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDropAccepted,
    onDropRejected,
    accept,
    multiple: false //only one file allowed
  });
  return (
    <div className={ isDragActive?"dropzone dropzone-active":"dropzone"} {...getRootProps()}>
      <input className="dropzone-input" {...getInputProps()}/>
      <div className="text-center">
        {isDragActive ? (
          <p className="dropzone-content">Release to drop the file here</p>
        ) : (
          <p className="dropzone-content">
            Drop your {accept} or click here to select.
          </p>
        )}
      </div>
    </div>
  )
}

function Dropzone(props){
  return(
    <div style={{display: "flex",alignItems: "center",justifyContent: "center", height: '100%'}}>
      <FileInput {...props} />
    </div>
  )
}

Dropzone.propTypes = {
  //File type
  accept: PropTypes.string.isRequired,
}

export default Dropzone;
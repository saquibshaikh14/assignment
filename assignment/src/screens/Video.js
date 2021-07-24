/*
 * Created on Fri Jul 16 2021
 * Author: Saquib Shaikh
 * Github: https://github.com/saquibshaikh14
 * Email: mdsqb0786@gmail.com
 *
 */
import React, { useRef, useState, useEffect } from 'react';
import RecordRTC from 'recordrtc';

import styles from '../styles/video.module.css';


const Video = () =>{

  const [previewVideo, setPreviewVideo] = useState(null);

  const startWebCam = () => {
    
    if(!!!navigator.getUserMedia)
      return alert('Webcam stream not supported');
    
      //get webcam feed
      getMedia((stream)=>{
        setPreviewVideo(stream);
      });
    
  }

  useEffect(()=>{

    //cleanup
    //stop media
    return ()=> previewVideo?.getTracks().forEach(track=>track.stop());
  }, [previewVideo])

  return (
    <div className="main">
        {/* <div>Start button</div> */}
        {/* vertically center horizontally center */}
        {/* on click start recording
          then show stop recording button
          onClick stop recording show preview button below, on click start video preview
          show record button to record again
        */}
        {previewVideo?(
          <VideoView previewVideo={previewVideo}/>
        ):(
          <div className={`${styles.video} ${styles.beforeCapture}`}>
            <button className={`${styles.btnStart} bg-dark`} onClick={startWebCam}>start recording
            </button>
          </div>
        )}
    </div>
  )
}

export default Video;


const getMedia = (cb) =>{
  navigator.getUserMedia({audio: {echoCancellation: true}, video: true}, cb, (err)=>{
    console.log(err);
    alert(err?.message);
  });
}


var recorder = null;
let cam = null;

const VideoView = (props) =>{

  const videoRef = useRef();
  const [recordedVideo, setRecordedVideo] = useState(null);
  const [recordedPlaying, setRecordedPlaying] = useState(false);


  const playVideo = (attr, data) =>{
    attr==='src'?setRecordedPlaying(true):setRecordedPlaying(false);

    videoRef.current.src="";
    videoRef.current.srcObject=null;
    videoRef.current[attr] = data;
  }

  const startRecording = () =>{
    getMedia((stream)=>{
      recorder = RecordRTC(stream, {type: 'video'});
      recorder.startRecording();
      cam = stream;

    })
  }

  const stopRecording = () => {
    recorder.stopRecording(blob=>setRecordedVideo(blob));
  }

  const playRecording = () => {
    playVideo('src', recordedVideo);
  }

  const restartRecording = () => {
    setRecordedVideo(null);
    recorder.reset();
    recorder.startRecording();
    playVideo('srcObject', props.previewVideo)
  }

  useEffect(()=>{

    // let videoElement = videoRef.current;

    // videoElement.srcObject = props.previewVideo;
    playVideo('srcObject', props.previewVideo);

    //start recording video
    console.log('vidoe recording started');
    startRecording();

    //cleanup
    return ()=>{
      recorder?.destroy();
      cam?.getTracks().forEach(track=>track.stop());
    };

  }, [props.previewVideo]);

  return (
    <div className={styles.videoContainer}>
      <div className="text-center mt-4">
        <video ref={videoRef} autoPlay muted controls={recordedPlaying} className={styles.videoPlayer}></video>
      </div>
      <div  className="text-center">
        <button onClick={restartRecording}>Restart Recording</button>
        <button disabled={!!recordedVideo} onClick={stopRecording}>Stop Recording</button>
        <button disabled={!!!recordedVideo} onClick={playRecording}>Preview Recording</button>
      </div>
    </div>
  )
}

import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import React, { useEffect, useRef } from 'react';

export default function App() {
  const video: React.MutableRefObject<HTMLVideoElement> = useRef<HTMLVideoElement>();
  const handleStream = (stream: MediaStream) => {
    if (video.current) {
      video.current.srcObject = stream;
      video.current.onloadedmetadata = (e) => video.current.play()
    }
  };

  useEffect(() => {
    window.electron.ipcRenderer.on('SET_SOURCE', async (event, sourceId) => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            mandatory: {
              chromeMediaSource: 'desktop',
              chromeMediaSourceId: sourceId,
            }
          }
        });

        console.log('stream', stream);

        handleStream(stream);
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <video ref={video} src=""></video>
      </div>
    </div>
  );
}

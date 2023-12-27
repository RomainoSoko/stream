import './App.css';
import React, { useRef } from 'react';

export default function App() {
  const video: React.MutableRefObject<HTMLVideoElement> =
    useRef<HTMLVideoElement>();

  const handleStream = (stream: MediaStream) => {
    if (video.current) {
      video.current.srcObject = stream;
      video.current.onloadedmetadata = () => video.current.play();
    }
  };

  const test = async (sourceId) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: sourceId,
          },
        },
      });

      handleStream(stream);
    } catch (err) {
      console.log('err');
    }
  };

  window.electron.ipcRenderer.on('SET_SOURCE', (sourceId) => {
    test(sourceId);
    console.log('azerazer azeraz er');
  });

  return (
    <div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <video ref={video} src=""></video>
      </div>
    </div>
  );
}

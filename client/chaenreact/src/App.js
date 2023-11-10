import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import Sym from "./sym";
import Cats from "./cats";

function App() {
  //연결 확인 부분
  const socket = io.connect("localhost:3000/");
  const [instType, setInstType] = useState(); //소켓에서 데이터 수신
  const [sym, setSym] = useState(false);
  const [cats, setCats] = useState(false);

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  useEffect(() => {
    socket.on("audio", (data) => {
      const binaryData = atob(data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const byteArray = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      audioContext.decodeAudioData(arrayBuffer, function (buffer) {
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
      });
    });
  }, []);

  useEffect(() => {
    socket.on("inst", (data) => {
      setInstType(data);
    });
    console.log(instType);
    if (instType === "sym") {
      setSym(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setSym(false);
      }, 4000);

      // 컴포넌트가 언마운트되면 타이머 정리
      return () => clearTimeout(timeoutId);
    } else if (instType === "cats") {
      console.log(instType);
      console.log("instType이 cats일때 동작");
      setCats(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setCats(false);
      }, 3000);

      // 컴포넌트가 언마운트되면 타이머 정리
      return () => clearTimeout(timeoutId);
    }
  }, [instType]);

  return (
    <div className="App">
      <h1>오케스트라 페이지입니다.</h1>

      <button
        onClick={() => {
          audioContext.resume().then(() => {
            console.log(audioContext.state);
          });
        }}
      >
        합주시작
      </button>

      {sym && <Sym />}
      {cats ? (
        <Cats />
      ) : (
        <img src="image.png" style={{ width: "100px", height: "auto" }} />
      )}
    </div>
  );
}

export default App;

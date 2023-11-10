import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Show from "./component/Show";

<style>
  @import
  url('https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&display=swap');
</style>;

function App() {
  //연결 확인 부분
  const socket = io.connect("localhost:3000/");
  const [instType, setInstType] = useState(); //소켓에서 데이터 수신
  const [sym, setSym] = useState(false);
  const [cats, setCats] = useState(false);
  const [tri, setTri] = useState(false);
  const [drum, setDrum] = useState(false);
  const [piano, setPiano] = useState(false);
  const [click, setClick] = useState(0); //화면 전환
  const sendMessage = (err) => {
    //서버 연결 확인
    if (err) {
      alert(err);
    } else {
      socket.emit("send_message", "hi");
      console.log("서버 연결 성공");
    }
  };

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const musicPlay = () => {
    audioContext.resume().then(() => {
      console.log(audioContext.state);
    });
  };

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
        setInstType("");
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (instType === "cats") {
      setCats(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setCats(false);
        setInstType("");
      }, 1000);
      return () => clearTimeout(timeoutId);
    } else if (instType === "tri") {
      setTri(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setTri(false);
        setInstType("");
      }, 1000);
      return () => clearTimeout;
    } else if (instType === "piano") {
      setPiano(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setPiano(false);
        setInstType("");
      }, 1000);
      return () => clearTimeout;
    } else if (instType === "drum") {
      setDrum(true);
      const timeoutId = setTimeout(() => {
        // 여기에 실행하고자 하는 코드 작성
        setDrum(false);
        setInstType("");
      }, 1000);
      return () => clearTimeout;
    }
  }, [instType]);

  return (
    <Body click={click}>
      {!click ? (
        <Show click={click} setClick={setClick} musicPlay={musicPlay} />
      ) : (
        <Main click={click}>
          {piano ? (
            <img src="donkey.gif" style={{ width: "256px", height: "auto" }} />
          ) : (
            <img src="donkey.png" style={{ width: "256px", height: "auto" }} />
          )}
          {sym || drum ? (
            <img src="cat.gif" style={{ width: "256px", height: "auto" }} />
          ) : (
            <img src="cat.png" style={{ width: "256px", height: "auto" }} />
          )}
          {cats ? (
            <img src="chicken.gif" style={{ width: "256px", height: "auto" }} />
          ) : (
            <img src="chicken.png" style={{ width: "256px", height: "auto" }} />
          )}
          {tri ? (
            <img src="dog.gif" style={{ width: "256px", height: "auto" }} />
          ) : (
            <img src="dog.png" style={{ width: "256px", height: "auto" }} />
          )}
        </Main>
      )}
    </Body>
  );
}

export default App;

const lotation = keyframes`
100% {
  transform: rotate(360deg);
`;

const fade = keyframes`
  from {
    opacity: 0;
  }
  to{
    opacity:1;
  }
`;
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to{
    opacity:0;
  }
`;

const bright = keyframes`
from{
  background-color: black;
}
to{
  background-color: white;
}
`;

const Body = styled.div`
  width: inherit;
  height: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  ${(props) =>
    props.click && //primary 가 존재할 경우
    `
      background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxODExMTVfNDYg/MDAxNTQyMjcxNDAzMTYx.jD4LnEJb92PjRsPba-chqZmWBdMti-EMxuMnwubXjHog.e6DikpP8V6YbDty_44L770keXOt56grgG5fF-43bKt4g.PNG.moducampus/%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C03.png?type=w800");
      background-size: cover; 
    `}
  animation: ${fade} 2s;
  overflow: hidden;
`;

const Logo = styled.img`
  display: block;
  width: 300px;
  height: 300px;
  animation: ${lotation} 10s linear infinite;
  transform-origin: 50% 50%;
`;

const Main = styled.div`
  animation: ${bright} 3s;
  transition: all 3s;
`;

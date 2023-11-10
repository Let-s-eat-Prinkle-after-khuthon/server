import logo from "./logo.svg";
import "./App.css";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import Show from "./component/Show";
import { AiFillCaretLeft, AiFillCaretRight, AiFillSound } from "react-icons/ai";

function App() {
  //연결 확인 부분

  const socket = io();

  const [instType, setInstType] = useState(); //소켓에서 데이터 수신
  const [sym, setSym] = useState(false);
  const [cats, setCats] = useState(false);
  const [tri, setTri] = useState(false);
  const [drum, setDrum] = useState(false);
  const [piano, setPiano] = useState(false);
  const [click, setClick] = useState(0); //화면 전환

  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  const musicPlay = () => {
    audioContext.resume().then(() => {
      console.log(audioContext.state);
    });
  };

  useEffect(() => {
    const socket = io();
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
          <Box>
            <Tab>
              PLAY MUSIC
              <TabButton>
                <AiFillCaretRight />
              </TabButton>
              <TabButton>
                <AiFillSound />
              </TabButton>
              <TabButton>
                <AiFillCaretLeft />
              </TabButton>
            </Tab>
            <Screen>
              {cats ? (
                <StopChi src={"/chicken.gif"}></StopChi>
              ) : (
                <StopChi src={"/chicken.png"}></StopChi>
              )}
              {sym || drum ? (
                <StopCat src={"/cat.gif"}></StopCat>
              ) : (
                <StopCat src={"/cat.png"}></StopCat>
              )}
              {tri ? (
                <StopDog src={"/dog.gif"}></StopDog>
              ) : (
                <StopDog src={"/dog.png"}></StopDog>
              )}
              {piano ? (
                <StopDonk src={"/donkey.gif"}></StopDonk>
              ) : (
                <StopDonk src={"/donkey.png"}></StopDonk>
              )}
            </Screen>
          </Box>
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
      background-color: #18a8f1;
    `}
  animation: ${fade} 2s;
  overflow: hidden;
`;

const Logo = styled.img`
  display: block;
  width: 30px;
  height: 30px;
  animation: ${lotation} 10s linear infinite;
  transform-origin: 50% 50%;
`;

const Main = styled.div`
  animation: ${bright} 3s;
  transition: all 3s;
`;

const Box = styled.div`
  background-color: #ffabe4;
  border: solid 8px #3819a0;
  min-width: 90vw;
  min-height: 80vh;
  overflow: hidden;
  border-radius: 4px;
`;
const Tab = styled.div`
  background-color: #3819a0;
  min-width: 85vw;
  min-height: 8vh;
  diplay: flex;
  justify-content: space-between;
  margin: 1%;
  color: white;
  line-height: 46px;
  align-items: center;
  overflow: hidden;
  font-size: 35px;
  padding-left: 20px;
  border-radius: 4px;
`;
const Screen = styled.div`
  border: solid 5px #3819a0;
  background-color: white;
  min-width: 85vw;
  min-height: 70vh;
  border-radius: 4px;
  margin: 1.5%;
  display: flex;
  justify-content: space-evenly;
`;

const TabButton = styled.div`
  width: 30px;
  overflow: hidden;
  max-height: 5vh;
  margin: 0.5%;
  text-align: center;
  font-weight: 800;
  color: #3819a0;
  font-size: 20px;
  background-color: white;
  float: right;
  border-radius: 4px;
`;

const move = keyframes`
0% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
50% {
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
100% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
}
@keyframes pulsate-fwd {
0% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
50% {
  -webkit-transform: scale(1.1);
          transform: scale(1.1);
}
100% {
  -webkit-transform: scale(1);
          transform: scale(1);
}
`;

const Music = styled.button`
  min-width: 30px;
  min-height: 30px;
  background-color: black;
  &:hover {
    animation: ${move} 10s linear infinite;
  }
`;

const StopCat = styled.img`
  width: 15vw;
  height: 35vh;
  animation: ${move} 1s infinite both;
  margin: auto;
  padding-bottom: 20px;
`;
const StopChi = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translateY(120px);
  animation: ${move} 1.3s infinite both;
  margin: auto;
  padding-top: 20px;
`;
const StopDog = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translate(0px, 40px);
  animation: ${move} 1.3s infinite both;
  margin: auto;
  padding-bottom: 20px;
`;
const StopDonk = styled.img`
  width: 15vw;
  height: 35vh;
  transform: translate(0px, 120px);
  animation: ${move} 1s infinite both;
  margin: auto;
  padding-top: 20px;
`;

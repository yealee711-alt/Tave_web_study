import { useState } from 'react'; // useState 훅 임포트
import FrontComp from './components/FrontComp';
import BackComp from './components/BackComp';

function App() {
  // useState를 통한 상태 변수(mode)와 상태 변경 함수(setMode) 생성, 초깃값은 'both'
  const [mode, setMode] = useState('both');

  // 상태 변경을 위한 함수 정의
  const handleSetMode = (mode: string) => {
    setMode(mode);
  };

  let contents = null; // 컴포넌트 저장용 변수

  // 상태(mode)의 값에 따라 분기하여 렌더링할 컴포넌트 결정
  if (mode === 'front') {
    contents = (
      <>
        <FrontComp onSetMode={(mode) => setMode(mode)} />
      </>
    );
  } else if (mode === 'back') {
    contents = (
      <>
        <BackComp setMode={setMode} />
      </>
    );
  } else {
    // mode가 'both'일 경우 두 컴포넌트 모두 렌더링
    contents = (
      <>
        <FrontComp onSetMode={(mode) => handleSetMode(mode)} />
        <BackComp setMode={handleSetMode} />
      </>
    );
  }

  return (
    <>
      <h2>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          // 제목을 누르면 mode를 'both'로 변경하여 두 컴포넌트를 모두 그림
          setMode('both');
        }}>React-State</a>
      </h2>
      <ol>
        {contents}
      </ol>
    </>
  );
}

export default App;
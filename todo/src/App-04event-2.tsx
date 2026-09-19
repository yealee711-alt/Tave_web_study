import React from 'react';

// 1. TypeScript용 Props 인터페이스 정의
interface FrontCompProps {
  onMyEvent1: () => void;
}

interface BackCompProps {
  onMyEvent2: (msg: string) => void;
}

// 2. FrontComp: 매개변수 없이 이벤트 호출
function FrontComp(props: FrontCompProps) {
  return (
    <>
      <li>
        {/* a 태그에 onClick 이벤트 핸들러 사용 */}
        <a href="/" onClick={() => {
          props.onMyEvent1();
        }}>프론트엔드</a>
      </li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li>
        <li>jQuery</li>
      </ul>
    </>
  );
}

// 3. BackComp: event 객체 사용 및 부모로 데이터(msg) 전달
const BackComp = ({ onMyEvent2 }: BackCompProps) => {
  return (
    <>
      <li>
        <a href="/" onClick={(event) => {
          // SyntheticEvent 객체를 통해 기본 동작(화면 깜빡임/이동) 차단
          event.preventDefault(); 
          // 자식에서 부모로 문자열 데이터 전달
          onMyEvent2('백엔드 클릭됨(자식전달)');
        }}>백엔드</a>
      </li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </>
  );
};

// 4. 최상위 App 컴포넌트
function App() {
  return (
    <>
      <h2>React-Event</h2>
      <ol>
        <FrontComp 
          onMyEvent1={() => {
            alert('프론트엔드 클릭됨(부모전달)');
          }} 
        />
        
        {/* 자식 컴포넌트에서 호출할 이벤트 핸들러 (매개변수 있음) */}
        <BackComp 
          onMyEvent2={(msg) => {
            alert(msg);
          }} 
        />
      </ol>
    </>
  );
}

export default App;
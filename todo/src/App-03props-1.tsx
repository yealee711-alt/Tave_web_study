// 1. TypeScript를 위한 Props 인터페이스 타입 정의
interface FrontCompProps {
  propData1: string[];
  frTitle: string;
}

interface BackCompProps {
  propData2: string[];
  baTitle: string;
}

// 2. props 객체 전체를 매개변수로 받기 (일반 함수)
function FrontComp(props: FrontCompProps) {
  const liRows = [];
  for (let i = 0; i < props.propData1.length; i++) {
    liRows.push(<li key={i}>{props.propData1[i]}</li>);
  }

  return (
    <>
      <li>{props.frTitle}</li>
      <ul>{liRows}</ul>
    </>
  );
}

// 3. props를 비구조화 할당(구조분해)으로 받기 (화살표 함수)
const BackComp = ({ propData2, baTitle }: BackCompProps) => {
  const liRows = [];
  let keyCnt = 0;
  for (const row of propData2) {
    liRows.push(<li key={keyCnt++}>{row}</li>);
  }

  return (
    <>
      <li>{baTitle}</li>
      <ul>{liRows}</ul>
    </>
  );
};

// 4. 최상위 App 컴포넌트
function App() {
  // 교재 p.88의 추가 데이터('React추가', 'NextJs추가') 반영
  const frontData = ['HTML5', 'CSS3', 'Javascript', 'jQuery', 'React추가'];
  const backData = ['Java', 'Oracle', 'JSP', 'Spring Boot', 'NextJs추가'];

  return (
    <>
      <div>
        <h2>React-Props</h2>
        <ol>
          {/* 자식 컴포넌트에 props 전달 */}
          <FrontComp propData1={frontData} frTitle="프론트엔드"></FrontComp>
          <BackComp propData2={backData} baTitle="백엔드" />
        </ol>
      </div>
    </>
  );
}

export default App;
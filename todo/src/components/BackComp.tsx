interface BackCompProps {
  setMode: (mode: string) => void;
}

const BackComp = ({ setMode }: BackCompProps) => {
  return (
    <>
      <li>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          // 상태 변경 함수를 직접 호출하며 'back'을 올려보냄
          setMode('back'); 
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

export default BackComp;
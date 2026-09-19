// src/components/BackComp.tsx

interface BackCompProps {
  onMyEvent2: (msg: string) => void;
}

const BackComp = ({ onMyEvent2 }: BackCompProps) => {
  return (
    <>
      <li>
        <a href="/" onClick={(event) => {
          event.preventDefault();
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

// 화살표 함수는 변수에 담아서 선언하고 변수를 export default로 내보냄
export default BackComp;
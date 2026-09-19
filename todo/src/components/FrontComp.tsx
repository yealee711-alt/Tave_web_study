// src/components/FrontComp.tsx

interface FrontCompProps {
  onMyEvent1: () => void;
}

// 함수형 컴포넌트를 선언함과 동시에 export default로 내보내기 설정
export default function FrontComp(props: FrontCompProps) {
  return (
    <>
      <li>
        <a href="/" onClick={(event) => {
          event.preventDefault();
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
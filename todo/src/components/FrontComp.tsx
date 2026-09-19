interface FrontCompProps {
  onSetMode: (mode: string) => void;
}

export default function FrontComp(props: FrontCompProps) {
  return (
    <>
      <li>
        <a href="/" onClick={(event) => {
          event.preventDefault();
          // 이벤트 처리 시 함수를 실행하며 'front'를 올려보냄
          props.onSetMode('front');
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
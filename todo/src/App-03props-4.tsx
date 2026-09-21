// 1. TypeScript용 인터페이스 정의
interface MyComponentProps {
  p1: string;
  p2: string;
  p3: string;
  p4: string;
}

// 2. p1과 p3만 골라서 받기
function MyComponent({ p1, p3 }: MyComponentProps) {
  return (
    <>
      <h2>프롭스 구조분해할당</h2>
      <p>
        {p1}, {p3}
      </p>
    </>
  );
}

function App() {
  return (
    <>
      <MyComponent
        p1={'HTML5'}
        p2={'CSS3'}
        p3={'Javascript'}
        p4={'jQuery'}
      />
    </>
  );
}

export default App;
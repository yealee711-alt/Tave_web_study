// 1. 일반 함수 형식 컴포넌트
function FrontComp() {
  return (
    <>
      <li>프론트엔드</li>
      <ul>
        <li>HTML5</li>
        <li>CSS3</li>
        <li>Javascript</li>
        <li>jQuery</li>
      </ul>
    </>
  );
}

// 2. 화살표 함수 형식 컴포넌트
const BackComp = () => {
  return (
    <>
      <li>백엔드</li>
      <ul>
        <li>Java</li>
        <li>Oracle</li>
        <li>JSP</li>
        <li>Spring Boot</li>
      </ul>
    </>
  );
};

// 3. 함수 표현식(익명 함수) 형식 컴포넌트
const FormComp = function () {
  return (
    <>
      <form>
        <select name="gubun">
          <option value="front">프론트엔드</option>
          <option value="back">백엔드</option>
        </select>
        <input type="text" name="title" />
        <input type="submit" value="추가" />
      </form>
    </>
  );
};

// 4. 최상위 App 컴포넌트
function App() {
  return (
    <>
      <div>
        <h2>React - Component</h2>
        <ol>
          {/* 5. 컴포넌트 삽입 (여는 태그-닫는 태그 방식) */}
          <FrontComp></FrontComp>
          {/* 셀프 클로징 방식 */}
          <BackComp />
          <BackComp />
        </ol>
        <FormComp />
      </div>
    </>
  );
}

export default App;
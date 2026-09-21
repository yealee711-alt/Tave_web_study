// ❶ 프로젝트의 src/assets 폴더에 있는 이미지를 임포트합니다.
import jqueryLogo from './assets/hero.png';

function App() {
  const myStyle = { 
    // ❷ 객체 형식으로 스타일 지정. background-color 대신 backgroundColor 사용.
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Verdana"
  };
  
  // ❸ 이미지의 가로 크기로 사용할 객체를 생성합니다.
  const iWidth = { maxWidth: '300px' }; 

  return (
    <>
      <h2>React-Style</h2>
      <ol>
        {/* ❹ style 속성을 사용하는 인라인 방식. 중괄호가 2개 겹칩니다. */}
        <li style={{color: "red"}}>프론트엔드</li> 
        <ul>
          {/* ❺ public 하위의 img 폴더에 있는 이미지를 삽입합니다. (절대 경로) */}
          <li><img src="/img/html_css.png" style={iWidth} alt="html_css"/></li>
          
          {/* ❻ ❶에서 임포트한 이미지를 삽입합니다. */}
          <li><img src={jqueryLogo} style={iWidth} alt="jquery"/></li>
          
          {/* ❼ 웹 URL을 이용해 이미지를 삽입합니다. */}
          <li><img src="http://nakja.co.kr/images/reactjs.png" style={iWidth} alt="reactjs"/></li>
        </ul>

        {/* ❽ class 선택자로 스타일을 적용할 때는 className 속성을 사용해야 합니다. */}
        <li className="backEnd">백엔드</li>
        <ul>
          {/* ❾ id 선택자는 HTML과 동일하게 id 속성으로 사용하면 됩니다. */}
          <li id="backEndSub">Java</li>
          
          {/* ❿ HTML과 동일하게 class 속성으로 작성하면 기능은 하지만 콘솔에 경고가 표시됩니다. */}
          <li class="warnings">Oracle</li>
          
          {/* ⓫ ❷에서 객체 형식으로 선언해둔 스타일(myStyle)을 적용합니다. */}
          <li style={myStyle}>JSP</li>
          <li>Spring Boot</li>
        </ul>
      </ol>
    </>
  );
}

export default App;
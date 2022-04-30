# Jest library

> React test library `jest` 사용
> 
> [Reactjs 테스팅 튜토리얼](https://ko.reactjs.org/docs/testing-recipes.html) 참고
> 
> 테스트는 `Unit` `Integration` `E2E` 테스트로 분류됨

### 무엇을 테스트 하는가

> backend 의 unit test와는 다르게 front-end는
> 
> 사용자에게 의도대로 보여지는지가 가장 중요한 부분

- global store manage [ etc) flux ]
  - action이 의도대로 생성되는지
  - state 변경이 의도대로 동작하는지
- Component
  - element가 올바르게 mount 되는지
  - component가 올바르게 rendering 되는지
  - props에 따른 rendering이 의도적으로 수행되는지
- Event 발생과 핸들링
- API 요청과 핸들링

### 어디서 테스트 하는가?

> 가장 기본적인 테스트 수행 방법은 테스터가 브라우저에 올라간 서비스를
> 
> 테스트 시나리오에 맞게 일일이 테스트를 수행하는 것이다.
> 
> 이런 방식은 큰 비용이 발생하므로 테스트 자동화를 통해 자동으로 테스트를 수행하도록 구현하는데,
> 
> 이 때, 프론트엔드는 `브라우저 환경`과 `Node.js 환경`에서 자동화 테스트를 수행할 수 있다.

- 브라우저 환경
  - Web API에 접근이 가능
  - 서로 다른 브라우저에서 테스트 가능 ( 브라우저 및 기기 호환성 테스트 가능 )
  - Node.js에 비해 속도가 느림
  - 브라우저 luncher를 별도로 설치
  - 속도 문제를 개선하기 위해 UI를 제외한 Headless 브라우저를 사용하여 배포할때 CI와 연동하여 테스트하는 방식을 권장
- Node.js 환경
  - 브라우저에 비해 속도가 빠름
  - Web API & DOM 에 접근 불가능
  - 호환성 테스트가 어려움
  - 이를 해결하기 위해 Jest는 가상 DOM을 구현 ( 한계점이 존재 )

---

### `테스트 구조`

- 테스트케이스는 기본적으로 아래와 같은 형식을 가진다.

```javascript
let driver = null; // mount 대상
beforeEach(() => { ... }); 
afterEach(() => { ... });

describe('test scenario name', () => {
    it('test case name', () => { /* doing test */ });
    it('test case name2', () => { /* doing test */ });
});
```

### `테스트 수행`

- beforeEach와 afterEach를 활용하여 테스크 케이스마다 수행되어야 할 작업을 정의
  - React 테스트는 일반적으로 React tree를 document의 DOM element에 mount & rendering<br/>(DOM event 수신 용이)
  - 테스트 종료 후 관련된 설정 및 값들을 clean up & DOM mount 해제 _(테스트 실패시에도 수행되어야 함)_

```javascript
import { unmountComponentAtNode } from "react-dom";

let container = null;   // 마운팅 대상
beforeEach(() => {
  // DOM 엘리먼트를 렌더링 대상으로 설정
  container = document.createElement("div"); // DOM element 생성
  document.body.appendChild(container); // 실제 DOM에 추가
});

afterEach(() => {
  // 종료시 정리
  unmountComponentAtNode(container);    // DOM에서 unmount ( event handler와 state도 정리 )
  container.remove(); // DOM에서 element 제거
  container = null; // 명시적으로 delete
});
```

### `act()`
- test-utils는 특정 assertions 전에 unit과 관련된 모든 업데이트가 처리되고,<br/>DOM에 적용되었는 지 확인하는 act() 를 제공함
- react test library의 render 등의 함수는 일반적으로 <br/>act로 이미 wrapping 되어있기 떄문에, 명시적으로 사용할 일은 드믊
- 아래 예제의 경우는 ReactDOM의 render method를 사용
- [Arrange-Act-Assert](http://wiki.c2.com/?ArrangeActAssert) 패턴의 Act에서 유래됨

```javascript
act(() => { /* 컴포넌트를 렌더링 */ });
// assertions 수행
```

```javascript
// example code
it("renders with or without a name", async () => {
    act(() => { render(<Hello />, container); });   // render === ReactDOM.render
    expect(container.textContent).toBe("Hey, stranger");
    
    act(() => { render(<Hello name="Jenny" />, container); });
    expect(container.textContent).toBe("Hello, Jenny!");
    
    act(() => { render(<Hello name="Margaret" />, container); });
    expect(container.textContent).toBe("Hello, Margaret!");
    
    // resolved promises를 적용하려면 `act()`의 비동기 버전을 사용
    await act(async () => { render(<User id="123" />); });
});
```

### `Dummy API Test`
### `Mocking Module`
### `Event Handling`
### `Timer`
### `Snapshot Test`
---
## Issue

### Module ...path in the testRunner option was not found
> Test Runner 설정이 잘못된 경우
> 
> 일반적으로 설치 시, package.json에서 자동으로 설정되지만 
> 
> git 에 업로드 후, project path가 변경되면서 에러가 발생
> 
> package.json에서 아래 설정을 수정

```js
// package.json
{
  // ...
  "jest": {
    //...
    "testRunner": "{ProjectPath}/node_modules/jest-circus/runner.js"
  }
}
```

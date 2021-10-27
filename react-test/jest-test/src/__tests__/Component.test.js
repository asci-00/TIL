import { render, screen } from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom'
import '@testing-library/jest-dom'

//component test
import SearchBar from '../components/SearchBar';
import NotFound from '../components/NotFound';
let driver = null //마운팅 될 대상

beforeEach(() => {
  // 렌더링 대상으로 DOM 엘리먼트를 설정합니다.
  driver = document.createElement("div");
  document.body.appendChild(driver);
})

afterEach(() => {
  // 기존의 테스트 환경을 정리합니다.
  unmountComponentAtNode(driver);
  driver.remove();
  driver = null;
})

describe('<SearchBar/>', () => {
  it('DOM 구조 확인', () => {
    render(<SearchBar />);
    screen.debug()
  });
  it('스냅샷 확인', () => {
    const element = render(<SearchBar />);
    expect(element.container).toMatchSnapshot()
  })  
})

describe("<NotFound />", () => {
  it("텍스트 출력 확인", () => {
    const { getByText } = render(<NotFound path='abc' />);
    const header = getByText("Page Not Found");
    expect(header).toBeInTheDocument();
  });
});
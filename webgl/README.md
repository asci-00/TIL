# WebGL

<img src="https://user-images.githubusercontent.com/22098393/170988279-a8b4ed8b-0a1d-44df-96cc-2553b7b055b3.png" width="600" style="margin: 50px 0"/>

> WebGL을 통해 OpenGL기반 API를 활용하여 3D Rendering 실습을 해보자
> 
> [Tutorial](https://developer.mozilla.org/ko/docs/Web/API/WebGL_API/Tutorial) 을 참고한다.

### 목차
- [Getting started]()

---
## 개요
> WebGL은 GPU에서 수행되기 때문에, GPU에서 실행되는 코드를 제공해야 됨
> 
> 이 코드는 함수 쌍 형태로 제공되는데, 이를 `정점 셰이더`와 `프래그먼트 셰이더`라고 부름
> 
> 이러한 엄격한 Type을 가지는 언어를 GLSL이라고 하며, 두 셰이더를 합친 것을 프로그램이라고 부름
> 
> _두 셰이더를 실행하기 위한 상태 설정에 관한 것을 WebGL API에서 수행함_
> 
> GPU에서 셰이더를 실행하는 gl.drawArrays, gl.drawElements를 호출해서 함수 쌍을 실행함

### `정점 셰이더`

- 정점 위치 계산 역할 

### `프래그먼트 셰이더`

- WebGL은 함수가 출력하는 위치를 기반으로 점, 선, 삼각형 등의 프리미티브를 래스터화할 수 있다.
- 이 때, 프리미티브는 프래그먼트 셰이더라 불리는 두 번째 사용자 작성 함수를 호출함 
- 해당 셰이더의 역할은 현재 그려지는 프리미티브의 각 픽셀에 대한 색상을 계산

---
## 용어

### `속성`
- 버퍼에서 데이터를 가져오고 정점 셰이더에 제공하는 방법을 지정 (아래와 같은 예)
- 위치당 3개의 32bit 부동 소수점으로 위치를 버퍼에 넣음
- 어느 버퍼에서 데이터를 가져올지, 어떤 타입의 데이터를 가져올지,
- 버퍼의 오프셋이 어느 위치에서 시작되는지 등등

### `버퍼`
- GPU에 업로드하는 2진 데이터 배열
- 일반적으로 위치, 법선, 텍스처 좌표, 정점 색상 등을 포함 (원하는 데이터를 넣을 수 있음)

### `유니폼`
- 셰이더가 수행되기 전 설정하는 전역 변수

### `텍스처`
- 셰이더에서 랜덤하게 접근할 수 있는 데이터 배열
- 텍스처에 넣는 대부분은 이미지 데이터지만, 색상이나 다른 데이터도 쉽게 저장 가능

### `베링`
- 정점 셰이더가 프래그먼트 셰이더에 데이터를 전달하는 방법
- 렌더링되는 것에 따라 정점 셰이더에 의해 설정된 베링의 값은 프래그먼트 셰이더를 실행하는 동안 보관됨

---
## 실습

> WebGL은 클립 공간의 좌표와 색상 2가지만을 제어
> 
> 이를 위해 클립 공간 좌표를 제공하는 `정점 셰이더`
> 
> 색상을 제공하는 `프래그먼트 셰이더`를 기술해야됨

### [Hello World 실습](https://github.com/asci-00/TIL/blob/main/webgl/src/figure_webgl.html)

> browser가 해석할 수 있는 script태그의 type은 
> 
> 지정하지 않거나, javascript, text/javascript 3가지 경우밖에 없다.  
> 
> 그러므로 notjs는 아무런 의미를 가지지 않으며, 셰이더 코드를 따로 분리하기 위한 방법일 뿐이다.
> 
> (이름을 변경해도 동작함)
> 
> 템플릿, 문자열 연결 등을 사용하여 GLSL 셰이더를 생성하는 게 일반적임

```javascript
function createShader(gl, type, source) { // shader 생성 함수
  // type = VERTEXT_SHADER | FRAGMENT_SHADER
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);  // shader의 source를 가져옴
  gl.compileShader(shader);         // source를 compile

  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;

  console.log(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
}
```
Type과 Shader Source를 인자로 받아 Shader를 생성해서 반환


```javascript
function createProgram(gl, vertexShader, fragmentShader) { // Program 생성 함수
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;

  console.log(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}
```
Vertex shader와 Fragment shader를 인자로 받아 Program를 생성해서 반환



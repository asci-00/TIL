## 목차
* 좋은 코드
* 객체 지향 프로그래밍
* RESTful API
* TDD
* 함수형 프로그래밍
* MVC 패턴
* Git 과 GitHub

## [1. 좋은 코드]
### 좋은 코드란
> 1. 이해하기 쉬운 코드(읽기 쉬운 코드) : 주석이 코드의 동작을 보장해주지 않는다.
> 2. 테스트가 용이한 코드 
> 3. 중복이 없는 코드
> 4. 확장성 있는 코드

발생 이유 : 이미 운영 중인 서비스에 대응하며 수정, 변경된 요구사항 및 인터페이스, 방금 작성한 코드 수정...
### 구현 방법
1. 하나의 목적을 갖는 코드들 추출 Extraction
2. 의존 관계가 있는 것들끼리 추상화 Abstraction
3. 목적의 맞는 위치에 코드 정의
4. 일관성 있는 코드 ( 합의된 규칙 ) : 네이밍, 디렉토뢰 구분

## [2. Object Oriented Programming]
<pre>
객체지향 이전 - 절차지향 ( 컴퓨터가 사고하는대로 프로그래밍 )
객체지향 - [사람 중심] 현실 사물들을 객체로 보고 객체로부터 특징들을 뽑아 추상화하여 프로그래밍
장점
  1. 재사용성 : 자주 사용되는 로직을 라이브러리로 만들어 두면 신뢰성이 향상되며, 재사용성이 높아짐
  2. 높은 생산성, 유지보수 용이, 요구사항을 명확히 파악
단점
  1. 객체간 정보 교환이 모두 메시지 교환을 통해 일어나므로, overhead드 발생 - 하드웨어 발전으로 보완됨
  2. 객체가 상태를 가짐 (함수형 프로그래밍 패러다임의 등장) - 변수가 존재함으로 예측할 수 없는 상태를 갖게 됨 ??
</pre>
### 설계 원칙
1. SRP Single Responsibility Principle 단일 책임 원칙
    - 클래스는 단 하나의 책임을 가져야 하며 클래스를 변경하는 이유가 단 하나의 이유여야 한다
2. OCP Open Closed Principle 개방-폐쇄 원칙 
    - 확장에는 열려있고, 변경에는 닫혀있어야 함
3. LSP Liskov Substitution Principle 리스코프 치환 원칙
    - 상위 타입의 객체를 하위 타입의 객체로 치환해도 상위 타입을 사용하는 프로그램은 정상적으로 동작해야 함
4. ISP Interface Segregation Principle 인터페이스 분리 원칙
    - 인터페이스는 그 인터페이스를 사용하는 클라이언트를 기준으로 분리해야 함
4. DIP Dependency Inversion Principle 의존 역전 원칙
    - 고수준 모듈은 저수준 모듈의 구현에 의존해서는 안됨 (전통적인 의존관계를 반전시킴으로써 상위 모듈이 하위 모듈의 구현으로부터 독립되게 함 - 둘 모두 추상화에 의존해야 함)

## [3. RESTful API]
> 월드 와이드 웹(World Wide Web a.k.a WWW)과 같은 분산 하이퍼미디어 시스템을 위한 소프트웨어 아키텍처의 한 형식으로 자원을 정의하고 자원에 대한 주소를 지정하는 방법 전반에 대한 패턴 
> <br/>출처 : 위키백과

REST란 REpresentational State Transfer 의 약어로 기본 원칙을 성실히 지킨 서비스 디자인을 RESTful 하다라고 표현함
디자인 패턴보다는 아키텍처로 Resource Oriented Architecture 이다 (자원 중심으로 HTTP Method를 통해 자원을 처리하도록 설계함)
### !!구성요소
- 자원 Resource - URI
- 행위 Verb - HTTP Method ( GET, POST, PUT, DELETE )
- 표현 Representations
### 특징
- Uniform Interface : URI로 지정한 리소스에 대한 조작을 통일되고 한정적인 인터페이스로 수행
- 무상태성 Stateless : 작업을 위한 상태정보를 따로 관리하지 않음 (API 서버는 들어오는 요청만을 단순히 처리) - 단순성, 구현 용이성 향상
- 캐시가능 Cacheable : HTTP 웹 표준을 사용함으로서, 웹의 기존 인프라를 그대로 활용 가능 - HTTP 캐싱 기능 적용 가능 ( Last-Modified 태그나 E-Tag를 이용 )
- 자체 표현 구조 Self-descriptiveness : REST API 메시지만 보고 이를 쉽게 이해할 수 있는 자체 표현 구조로 되어있음
- Client-Server 구조 : 서버(API 제공) 클라이언트(사용자 인증, 컨텍스트 직접 관리)의 역할이 확실히 구분하면서 개발 내용이 명확해지고 서로의 의존성 감소
- 계층형 구조 : 다중 계층으로 구성 가능 (ex. 로드 밸런싱, 암호화 계층 ): 구조상의 유연성, Proxy, 게이트웨이 같은 네트워크 기반의 중간매체를 사용할 수 있음

### 중심 규칙
- URI는 행위를 표현하지 않고, 정보의 자원을 표시해야함 (동사보다는 명사 활용)
```
GET /members/delete/1   #wrong
DELETE /members/1       #correct

GET /members/show/1     #wrong
GET /members/1          #correct

GET /members/insert/2   #wrong
POST /members/2         #correct

GET /members            #collection
GET /members/1          #element
```
| METHOD	| 역할 |
|---|---|
| POST	| POST를 통해 해당 URI를 요청하면 리소스를 생성합니다. |
| GET	| GET를 통해 해당 리소스를 조회합니다. 리소스를 조회하고 해당 도큐먼트에 대한 자세한 정보를 가져온다. |
| PUT	| PUT를 통해 해당 리소스를 수정합니다. |
| DELETE	| DELETE를 통해 리소스를 삭제합니다. |

- Message의 Header와 Body를 명확하게 분리하여 사용
  - Entity에 대한 내용은 Body, 서버가 행동할 판단의 근거가 되는 컨트롤 정보 (API버전 정보, 응답받고자 하는 MEME타입등)는 Header
  - HTTP Header와 HTTP Body로 나눌 수 있으며, HTTP Body에 들어가는 JSON 구조로 분리할 수 있음
- API 버전 관리
  - API의 signature가 변경될 수 있음 - 특정 API를 변경할 때, 반드시 하위 호환성을 보장해야 함
- Server와 Client가 같은 방식을 사용해서 요청하도록 구현
  - 전송 방식을통일해야함 Client(form-data) - Server(form-data) or Client(json) - Server(json)
  - URI가 플랫폼 중립적이어야 함을 의미

### 장점
- Open API를 제공하기 용이
- 멀티플랫폼 지원 및 연동이 용이
- 원하는 타입으로 데이터를 주고받을 수 있음
- 기존 웹 인프라 HTTP를 그대로 사용할 수 있음
### 단점
- 사용할 수 있는 메소드가 4가지 밖에 없음
- 분산환경에 부적합
- 구형 브라우저에서 제대로 지원해주지 못하는 부분이 존재 (PUT, DELETE 등)
- HTTP 통신 모델에 대해서만 지원함

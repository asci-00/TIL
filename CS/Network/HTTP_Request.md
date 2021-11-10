# HTTP 요청 과정

> HTTP 는 비연결성 *Connectionless*과 무상태 *Stateless*의 속성을 가진다.
> 
> Connectionless의 문제점을 해결하기 위해 *KeppAlive* 기능을 사용하기도 함 
> 
> Stateless의 문제점을 해결하기 위해 Session과 Cookie를 가짐 (OAuth, JWT)
> 
---
## HTTP Request의 과정

1. 서버로 요청을 보냄 HTTP Request 생성
    - 브라우저를 통해 url 입력
    - url 파싱 (구조분해)
    - HTTP 프로토콜 사용

2. 요청 주소가 ip주소가 아닐 경우, *이름 해결*과정을 거침 (이는 UDP를 사용함)
    - PC에 파일로 존재하는 hosts 파일에 해당 host name이 있는지 확인 (있다면 리턴)
    - Local DNS Cache 확인 (Root DNS Server의 IP Address와 캐싱된 host name과 주소가 저장됨)
      - 일반적으로 인터넷을 제공하는 회사가 운영하는 DNS 서버
      - 해당 host name이 있다면 주소 리턴
    - Root DNS Server 로 해당 도메인 요청
    - 차례로 Top-level, Second-level, Sub DNS Server를 거치고 ip 주소를 리턴함
    - Local DNS Cache에 해당 정보 기록
    - 어떤 DNS 서버에 도메인네임에 대한 쿼리를 날렸을 때, <br/>한 번에 ip 주소를 돌려줄 수 있는 네임서버는 없음
    - 이렇게 여러 네임서버를 거쳐 ip 주소를 찾는 과정을 *Recursive Query* 라고함

![](https://user-images.githubusercontent.com/40616436/84001753-3cea3700-a9a2-11ea-801a-2f4acaf3e3c9.png)
![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlYbma%2Fbtq4bjJPwOZ%2F5C2YYvYbbgVLQ7bcBaSLNK%2Fimg.jpg)

1. ip 주소를 통해 브라우저에서 TCP 프로토콜을 사용하여 서버와 연결을 맺음
    - 3-Way-Hnadshake 방식
2. Client에서 Server로 HTTP Request를 전송
3. Server에서 HTTP Request 해석 후, 해당 리소스 (or Response Data)를 Client로 전송
    - 요청 성공 시, status code 200을 같이 전송
4. 4-way-handshake 과정을 통해 TCP 연결 종료
5. 브라우저는 전송받은 데이터를 해석하여 브라우저에 표시
    - 만약 데이터에서 새로운 리소스 요청이 있다면 트랜잭션 단위 (요청-연결-응답-종료)로 처리 

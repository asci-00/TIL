
# HTTP와 HTTPS

### 목차
- HTTP
- HTTP 보완
- HTTPS
- Request & Response
- HTTP 버전별 특징

<br/><br/>

---

## HTTP


> 일반적으로 브라우저의 URL 입력창을 통해 웹 서버에 요청할때 사용되는 프로토콜으로 아래와 같은 특징을 가짐
>
> 1. TCP/IP을 기반으로 한 응용 프로토콜 / 직접 TCP 와 데이터 교환
>
> 2. 연결 상태를 유지하지 않는 비연결성 *Connectionless* 프로토콜
>
> 3. 클라이언트의 요청과 서버의 응답 방식으로 동작 (단방향성 - 서버가 먼저 응답 or 요청하지 않음)
>
> 4. 도청, 위장, 변조가 가능 - 보안에 취약
>
> 5. HTTP Method 를 사용하며 응답시 데이터와 HTTP Status Code를 전송
>
> 6. 비상태성 *Stateless* 프로토콜로 상태 정보를 유지하지 않음
>       - 여러 사용자의 각 요청을 구분할 수 없음
>       - Cookie, Session, Hidden Form Field 등으로 보완


### **HTTP Method**

| Method  | 설명                                                                                                    |
| ------- | ------ |
| GET     | URI가 가진 정보를 검색하기 위해 요청하는 메소드                                                         |
| HEAD    | GET메소드와 방식은 동일하지만, `응답에 BODY가 없고 응답 코드와 HEAD만 응답하는데 사용`되는 메소드       |
| POST    | 요청된 자원을 생성하기 위한 메소드                                                                      |
| PUT     | 요청된 자원을 수정할때 사용하고, `PATHCH와는 다르게 자원 전체를 갱신하는데 사용`되는 메소드             |
| PATCH   | PUT메소드와 유사하게 요청된 자원을 수정할때 사용되지만, `자원의 일부를 수정`하는 의미로 사용되는 메소드 |
| DELETE  | 요청된 자원을 삭제하기 위한 메소드                                                                      |
| CONNECT | 동적으로 터널 모드를 교환하고 프락시 기능을 요청할때 사용하는 메소드                                    |
| TRACE   | 원격 서버에 루프백 메세지를 호출하기 위해 테스트용도로 사용하는 메소드                                  |
| OPTIONS | 웹 서버에서 지원하는 메소드의 종류들을 확인할 경우 사용하는 메소드                                      |

### **HTTP Status Code**

#### 정보전송 임시응답 (1xx)
- 서버가 요청을 클라이언트에서 성공적으로 수신을 했고 서버에서 처리중인 정보를 보낸디.

    | Status Code | 설명               |
    | ----------- | ------------------ |
    | 100         | Continue           |
    | 101         | Swiching protocols |

#### 성공 (2xx)
- 서버가 요청을 `성공`적으로 받았음을 알려준다.

    | Status Code | 설명                          |
    | ----------- | ----------------------------- |
    | 200         | Ok!                           |
    | 201         | Created                       |
    | 202         | Accepted                      |
    | 203         | Non-authoritative Information |
    | 204         | No Cotent                     |

##### 리다이렉션 (3xx)
- 캐싱된 파일을 새로고침 하여 확인하면 3xx대 코드을 받을 수 있다.

    | Status Code | 설명              |
    | ----------- | ----------------- |
    | 301         | Moved permanently |
    | 302         | Not temporarily   |
    | 303         | Not modified      |

#### 클라이언트 요청 오류 (4xx)
- 클라이언에서 서버에 잘못된 요청을 보내 서버가 요청을 해결 할 수 없을때 발생하는 코드이며, `클라이언트측에서 발생하는 코드`이다.

    | Status Code | 설명                          |
    | ----------- | ----------------------------- |
    | 400         | Bad Request                   |
    | 401         | Unauthorized                  |
    | 402         | Payment required              |
    | 403         | Forbidden                     |
    | 404         | Not found                     |
    | 405         | Method not allowed            |
    | 407         | Proxy authentication required |
    | 408         | Request timeout               |
    | 410         | Gone                          |
    | 412         | Precondition failed           |
    | 414         | Request-URI too long          |

#### 서버에러 (5xx)
- 클라이언트의 요청을 받고 서버에서 처리하지 못할때 발생하는 코드이며, `서버측에서 발생하는 코드`이다.

    | Status Code | 설명                       |
    | ----------- | -------------------------- |
    | 500         | Internal server error      |
    | 501         | Not implemented            |
    | 503         | Service unnailable         |
    | 504         | Gateway timeout            |
    | 505         | HTTP version not supported |

<br/><br/>

---

## HTTP 보완

> HTTP 의 Connectionless, Stateless 특징과 Security 취약점을 보완

### Cookie와 Session

> 무상태 *Stateless* 한 부분을 보완

|          |                        Cookie                        |     Session      |
| :------: | :--------------------------------------------------: | :--------------: |
| 저장위치 |                        Client                        |      Server      |
| 저장형식 |                         Text                         |      Object      |
| 만료시점 | 쿠키 저장시 설정<br />(설정 없으면 브라우저 종료 시) | 클라이언트가 로그아웃하거나 <br/>설정 시간 동안 반응이 없으면 무효화<br/>정확한 시점 확인 불가 |
|  리소스  |                 클라이언트의 리소스                  |  서버의 리소스   |
| 용량제한 |           한 도메인 당 20개, 한 쿠키당 4KB           |     제한없음     |

### *Cookie 사용*
1. client 가 server로 데이타 request
2. server에서  Cookie 를 생성 후 header에 cookie를 포함하여 response
3. client에서 해당 cookie를 로컬에 저장
4. 다음 동일한 요청시 header에 cookie를 넣어서 request
5. server에서 cookie를 받고 변경 필요가 있을 시, header에 cookie를 포함하여 다시 response

ex) 아이디 비밀번호 저장 여부 선택, 쇼핑몰 장바구니, 오늘 더 이상 보지 않음 체크, 자동로그인

### *Session 사용*
1. client 가 server로 데이타 request
2. server에서 해당 client의 session ID를 발급 후 데이터와 session ID를 response
3. client에서 해당 session ID를 cookie에 저장
4. 다음 요청 시, session ID를 같이 요청
5. server는 session ID를 받으면 별다른 작없없이 session ID로 session에 있는 client 정보를 가져와 사용
6. 요청을 처리하여 client로 response

ex) 로그인 같이 보안상 중요한 작업 수행용


### Keep Alive

> 무연결성 *Connectionless* 한 부분을 보완

### 특징
- 연결을 바로 종료하지 않고, 추가적인 요청시, 이미 연결된 TCP 가상회선을 재사용
- HTTP/1.1에서 Default로 지원
- timeout을 통해 일정 시간 연결이 없을 경우 connection close
  - 서버의 socket은 한정되어있기 때문에 계속 연결을 유지할 수 없음
- max를 한 connection당 최대 요청 횟수를 제한함
- 문제점이 다소 있음 (멍청한 proxy)

<br/><br/>

---

## HTTPS

> HTTP의 아래와 같은 보안 취약 부분을 보완하기 위해 개발
>   1. 평문 통신이기 때문에 **도청**이 가능
>   2. 통신 상대를 확인하지 않기 때문에 **위장**이 가능
>   3. 완전성을 증명할 수 없기 때문에 **변조**가 가능
>
> HTTP 통신의 소켓 부분을 SSL *Secure Socket Layer* / TSL *Transport Layer Security* 프로토콜로 대체
>
> HTTP 는 SSL 과 통신 & SSL 이 TCP 와 통신
>
> SSL을 사용한 HTTPS 는 암호화와 증명서, 안전성 보호를 이용

### SSL/TSL

PASS

<br/><br/>

---

## Request & Response

> HTTP은 통신을 위해 HTTP request / response를 생성함
>
> 이 떄 각 메시지들의 구성에 대해 알아봄

![](https://media.vlpt.us/images/gparkkii/post/a8c0793f-86bf-4744-8d83-56c457c00b2f/tip_20070425_1.jpg)

### Request Message

![](https://media.vlpt.us/images/gparkkii/post/0a8a066b-b53b-4c86-a522-32e848c5f54f/HTTP_Request.png)

> - Method : 클라이언트가 수행하고자 하는 동작을 기술한 HTTP Method (GET, POST, DELETE, PUT, PETCH, HEAD .. )
> - Path : 프로토콜(http://), 도메인(domain.com), 포트 (80) 등을 제외한 리소스의 경로
> - Version of the Protocol : HTTP Protocol Version
> - Headers : 서버에 대한 추가 정보 전달용 데이터
> - etc : POST, PUT 등의 Method에서 사용하는 기타 데이타

### Response Message

![](https://media.vlpt.us/images/gparkkii/post/c5ee6879-e3af-49f9-a8d0-5922b49c53ce/HTTP_Response.png)

> - Version of the Protocol
> - Status Code : 요청의 성공 및 에러 상태 코드
> - Status Message : 추가적인 짧은 설명을 표시하는 상태 Message
> - Headers : Request와 비슷한 HTTP Header
> - etc : 요청에 대한 리소스가 포함되는 본문

### 출처
- https://velog.io/@gparkkii/HTTPMessage

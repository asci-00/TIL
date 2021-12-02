# 용어

> Network 를 공부하면서 자주 사용되는 용어에 대해 설명함
> 
---
## URI vs URL vs URN

### URI *Uniform Resource Identifier*

```html
  통합 자원 식별자라고 불리며
  네트워크에 존재하는 자원을 나타내는 유일한 주소를 의미함

  네트워크상 자원의 위치를 표현하는 URL, URN의 상위 개념

  scheme:[//[user[:password]@]host[:port]][/path][?query][#fragment]
  ex) http://www.example.com:80/server_path#one?id=12
```

<img src="https://www.cbtnuggets.com/blog/wp-content/uploads/2018/11/URI-URL-URN@2x.png" width=400 height=400/>

용어 | 설명 | 예시
--- | --- | ---
Scheme | Protocol로 불리기도 함<br/>프로토콜에 따라 URL을 표현하는 방법이 달라짐 | http
Information | 요청할 때 사용될 user name과 password를 기술 | user:password@
Host | Domain으로 불리기도 함 <br/>서버의 네트워크 상 주소를 나타내는 <br/>Host-Name (Sub-Domain), Domain-Name, Top-Domain-Name 등으로 구분 | www.example.com
Port | 서버에 어떤 응용프로그램에 요청을 할지 결정<br/>프로토콜에 따라 생략시 기본적으로 적용되는 포트가 존재 | 80
Path | 서버에서의 자원의 요청 경로를 의미 <br/>구체적인 파일의 경로일 수 있음 | /server_path
Query | 서버에 제공하는 추가 파라미터로 ?로 시작하여 & 기호로 구분된 "key=value" 의 형태를 가지는 문자열 | ?id=1
Fragment | 해시태그(Hashtag), 앵커(Ancher)로 불리기도 함 <br/>#으로 시작하여 특정 요소를 지시하는 문자열 | #one

### URL *Uniform Resource Locators*

```html
  서버에 요청할 자원 Recource의 위치를 나타내는 문자열

  URI의 규격에서 자원의 추가적인 정보인 query와 fragment를 제외한 나머지 부분을 의미
  scheme://<user>:<password>@<host>[:port][/url-path]
  ex) http://www.example.com:80/server_path/index.html
```

URI 개념과 혼동되어 사용하여 query와 fragment를 포함한 의미로 사용하기도 함

```html
  http://www.example.com/server_path?id=1
  http://www.example.com/server_path?id=0
  엄격하게 규칙을 적용할 시, 두 URI는 같은 URL을 가지지만 같은 URI는 아님
```

#### URN *Uniform Resource Name*

```html
  서버에 요청할 자원 Recource 자체를 표현하기 위한 문자열
  자원의 위치가 바뀌거나, 자원을 포함하는 상위 폴더의 이름이 바뀔경우
  자원의 위치를 찾을 수 없는 URL의 한계를 개선하기 위해 고안됨

  영속적이고, 위치에 독립적인 자원을 위한 지시자로 사용됨
  urn:<NID>:<NSS>
  ex) urn:isbn:1234567
  
  NID Namespace Identifier - 이름 공간 식별자로 URN의 취급방법 결정 ( 현재 사용되는 식별자는 ISBN, UCI, IPFS가 존재 )
  NSS Namespace Specific String - 자원을 식별하기 위한 유일한 식별자

```



![url11](https://user-images.githubusercontent.com/22098393/144373978-799a54ea-f9d9-4ecd-9cab-18d5a83f7845.png)
![Uploading url11.png…]()

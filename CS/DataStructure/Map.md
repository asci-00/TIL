# Map과 HashTable

> 특정 원소의 탐색 시간을 최소화하기 위해 개발된 자료구조
> 
> key와 value로 이루어짐 collection
> 
> key에 기반하여 탐색, 삽입, 삭제가 이루어짐

### 목차
- 구현방법
- 용어
- 원리

<br/><br/>

---
## 구현 방법

### list-based map 

- unsorted, node list 방식으로 구현하는 것
- 데이터를 찾기 위해 선형탐색 O(n)을 하게됨
  - 구현하기 쉬우나 맵 자료구조의 이점을 가지지 않음

### hash table

- entry를 저장하기 위해 key를 활용
- 탐색이 O(1) 시간에 이루어짐 (충돌 *collision*발생시 효율이 떨어짐)
- bucket array와 hash function으로 구성됨

<br/><br/>

---
## 용어

### `Hash`

> 해시 *Hash*란 **단방향 암호화 기법**으로 해시함수 *Hash Function*를 이용하여 
> 
> 임의의 길이의 데이터를 고정된 길이의 비트열로 변환하는 기술을 의미함

### 특징

- 입력값이 일부만 변경되어도 다른 해시값을 출력 *눈사태 효과*
- 입력값 상관없이 고정된 길이의 해시값을 출력
- 복호화는 불가능
- 복잡하지 않은 알고리즘으로 구현되기 때문에 상대적으로 <br/>CPU, 메모리 같은 시스템 자원을 덜 소모
- 같은 입력값에 대해서는 같은 출력값을 보장

### `Hash Function`

> 해시함수 *Hash Function*는 입력값에 대하여 해시 알고리즘을 사용하여 
> 
> Hash값을 생성하는 함수를 의미 (해싱 *Hashing* 과정)

### 단계
1. 생성 *generation*    : key를 integer 형태로 변환
2. 압축 *compression*   : 생성된 integer를 bucket array의 index와 mapping (크기가 큰 경우 압축)
3. 충돌 *collision* 제어

<br/><br/>

---
## 원리

`생성` : key의 type에 따라 다름

- Integer : 해당 값을 그대로 key로 사용
- Object : Object의 주소값은 다르다는점을 통해, 주소값을 key로 사용
- String
    - 다항 누적 *polynomial accumulation*
        ```
        k 길이를 가진 문자열이 존재할 경우 (A누적값, 문자열의 각 문자 값)
        key = Ak-1 * X0 + Ak-2 * X1 ... + A0 * Xk-1

        위와같은 다항식을 세워 결과값을 key로 사용
        ```
    - cyclic shift

`압축`

- division method
  - bucket array의 크기인 N
  - key 값을 N으로 모듈러 연산 
    idx = key mod N
  - 해당 값을 idx로 사용 (N은 소수일수록 효율적임)
  - 간단한 방법이지만 잦은 충돌 발생
  
- MAD(multiply, add and divide) method
  - 위 방법을 개선하기 위해서 좀 더 복잡한 연산 사용
  - idx = ((ax + b) mod p) mod N
  - p는 N보다 큰 정수, a b 는 [0, p - 1] 구간의 임의의 정수를 의미

`충돌 제어`

PASS


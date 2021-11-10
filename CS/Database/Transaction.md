# 트렌젝션 *Transaction*

> 데이터베이스의 상태를 변화시키기 위해 수행하는 작업 단위
>
> SELECT, INSERT, DELETE, UPDATE의 **SQL 질의어를 통해 DB에 접근하는 것**


작업 단위 **SQL 명령문들을 사람이 정하는 기준에 따라 정하는 것**

```
ex) 사용자 A가 사용자 B에게 데이터 2GB를 선물로 보냄

DB 작업
- 1. 사용자 A의 선물 가능 횟수를 차감 : UPDATE 문을 사용해 사용자 A의 선물횟수 차감
- 2. 사용자 B의 데이터에 2GB를 추가 : UPDATE 문을 사용해 사용자 B의 잔여 데이터양을 변경

현재 작업 단위 : UPDATE + UPDATE
→ 이를 통틀어 하나의 트랜잭션이라고 함
```

<br>

**하나의 트랜잭션를 잘 설계하는 것이 데이터 제어에 많은 이점을 가져다줌**

### 목차
- 트랜잭션 특징
- 트랜잭션 연산
- 트랜잭션 관리
- 격리성

<br><br>

---
## 트랜잭션 특징

- 원자성 *Atomicity*

  > 트랜잭션이 DB에 모두 반영되거나, 혹은 전혀 반영되지 않아야 됨

- 일관성 *Consistency*

  > 트랜잭션의 작업 처리 결과는 항상 일관성 있어야 함

- 독립성 *Isolation*

  > 둘 이상의 트랜잭션이 동시에 병행 실행되는 상황에서 트랜잭션은 다른 트랜잭션의 연산에 끼어들 수 없음

- 영속성 *Durability*

  > 트랜잭션이 성공적으로 완료되었으면, 결과는 영구적으로 반영되어야 함

<br><br>

---
## 트랜잭션 연산
> TCL *Transaction Control Language*는 트렌젝션을 제어하기 위한 언어를 의미
>
> COMMIT, ROLLBACK, SAVEPOINT 가 존재

### COMMIT

- 하나의 트랜잭션이 성공적으로 처리되었고,<br>
처리 전과 비교해 DB가 일관성있는 상태일 때 트렌젝션 관리자에게 알리는 연산
- SQL 명령어로 수행된 결과를 실제 물리적 디스크에 반영
- 모든 DML 문장을 수행한 후 작업을 완료할 때 반드시 필요
<br>

### ROLLBACK

- 하나의 트랜잭션 처리가 비정상적으로 종료되어 트랜잭션 원자성에 문제가 발생한 경우<br>
    트렌젝션을 수행하기 이전 상태로 복구하는 연산 (작업 취소)

### SAVEPOINT

- 현재 트랜잭션 내 저장점을 만드는 연산
- 기본적으로 ROLLBACK을 실행하면 트랜잭션 시작 전인 원래의 상태로 복구되지만,<br>
    ROLLBACK TO savepoint_name 명령으로 SAVEPOINT를 지정해 놓은 지점으로 복구 가능
- ROLLBACK 후 COMMIT을 해야 보조기억장치에 반영 가능

<br>

*상황이 주어지면 DB 측면에서 어떻게 해결할 수 있을지 대답할 수 있어야 함*

<br><br>

---

## 트랜잭션 관리

이해를 위한 2가지 개념 : DBMS의 구조 / Buffer 관리 정책

<br>

1) DBMS의 구조

> 크게 2가지 : Query Processor (질의 처리기), Storage System (저장 시스템)
>
> 입출력 단위 : 고정 길이의 page 단위로 disk에 읽거나 쓴다.
>
> 저장 공간 : 비휘발성 저장 장치인 disk에 저장, 일부분을 Main Memory에 저장

<img src="https://d2.naver.com/content/images/2015/06/helloworld-407507-1.png">

<br>

2) Page Buffer Manager / Buffer Manager

DBMS의 Storage System에 속하는 모듈 중 하나로,

Main Memory에 유지하는 페이지를 관리하는 모듈

> Buffer 관리 정책에 따라, UNDO 복구와 REDO 복구의 요구 여부를 결정하므로, <br/>트랜잭션 관리에 매우 중요한 결정을 가져옴

<br>

## 트랜잭션 복구

### UNDO 복구
> 수정된 페이지를 디스크에 출력 했을때 이 페이지가 잘못된 페이지일 경우 **이전의 상태로 되돌리는 복구**
>
> 수정된 페이지가 디스크에 출력 될 때는 버퍼 관리자의 버퍼 교체 알고리즘에 따라서 수행 **버퍼의 상태에 따라 결정됨**
>
> COMMIT 되기 전까지 디스크에 write하지 않고, 버퍼에 쌓아놓으면 버퍼에 대해서만 UNDO 복구
>
> 트랜잭션 로그를 이용하여 오류와 관련된 모든 변경을 취소하여 복구 수행

|정책|설명|
|--|--|
|수정된 페이지를 언제든지 디스크에 쓸 수 있는 정책| 대부분의 DBMS가 채택하는 Buffer 관리 정책<br> UNDO logging과 복구를 필요로 함 |
|수정된 페이지들을 EOT (End Of Transaction)까지는 버퍼에 유지하는 정책 | UNDO 작업이 필요하지 않지만, 매우 큰 메모리 버퍼가 필요 |


### REDO
> 이전 상태로 복구한 후, 실패가 발생하기 전까지의 과정을 그대로 반복
>
> 정상적으로 실행 되기까지의 과정을 알아야 하므로, log를 기록
>
> 트랜잭션 로그를 이용하여 오류가 발생한 트랜잭션을 재실행하여 복구 수행

|정책|설명|
|--|--|
|수정했던 모든 페이지를 Transaction commit 시점에 disk에 반영| transaction이 commit 되었을 때 수정된 페이지들이 disk 상에 반영되므로 redo 필요 없음. |
|commit 시점에 반영하지 않는 정책 | transaction이 disk 상의 db에 반영되지 않을 수 있기에 redo 복구가 필요. (대부분의 DBMS 정책) |




1) UNDO


필요 이유

> 수정된 Page들이 **Buffer 교체 알고리즘에 따라서 디스크에 출력**될 수 있음. Buffer 교체는 **트랜잭션과는 무관하게 buffer의 상태에 따라서, 결정됨**. 이로 인해, 정상적으로 종료되지 않은 transaction이 변경한 page들은 원상 복구 되어야 하는데,  이 복구를 undo라고 함.

- 2개의 정책 (수정된 페이지를 디스크에 쓰는 시점으로 분류)

<br><br>

---
## 격리성

> 트랜잭션의 특성 중 하나 - 트랜잭션이 수행중일 때, 다른 트랜잭션이 해당 트랜잭션의 연산에 영향을 줄 수 없음

### 격리성의 문제점

- *Dirty Read*
  - 트랜잭션 T1, T2가 존재
  - T1에서 A 데이터를 B로 변경하였고 COMMIT을 하지 않은 상태
  - T2에서 해당 데이터를 Read시 B 데이터를 조회함
  - T1에서 COMMIT하지 않고 종료
  - T2의 데이터가 유효하지 않게됨

- *Non-Repeatable Read*
  - 트랜잭션 T1, T2가 존재
  - T1이 데이터 A를 Read 하고, T2가 A를 변경하거나 삭제
  - 다시 T1이 데이터를 Read 하고자 하면 일관성 없는 데이터를 조회하게됨

- *Phantom Read*
  - 트랜잭션 T1, T2가 존재
  - 특정 조건의 데이터 집합을 T1이 조회했을 떄, T2가 해당 조건의 데이터 중 일부를 추가/삭제
  - T1이 같은 조건으로 데이터 조회시, 추가/삭제가 반영된 데이터가 조회됨
  - T2가 ROOLBACK 시, T1데이터가 일관성이 떨어짐

### 격리 수준 *Level*

> 위와 같은 문제가 발생하여 격리성과 병행성 사이의 Trade-off를 두고 4단계 격리수준을 나눔
>
> 격리 수준이 높아질수록 이슈는 적게 발생되지만(안정성 증가) 병행처리의 성능이 떨어짐
>
> 격리 수준이 낮은것부터 기술함
>
> 트랜잭션 발생 시, lOCK 이 발생 - SELECT 시에는 공유락, CREATE/INSERT/DELETE 시에는 베타적락이 걸림

### 1. Read Uncommitted
> 한 트랜잭션이 커밋하지 않은 데이터에 다른 트랜잭션이 접근 가능 => COMMIT 하지 않은 데이터 조회 가능
>
> 발생 가능한 이슈 - Dirty Read, Non-Repeatable Read, Phantom Read

### 2. Read Committed
> 한 트랜잭션이 커밋이 완료된 데이터만 접근 가능
>
> 대부분의 DB의 Default 수준
>
> 발생 가능한 이슈 - Non-Repeatable Read, Phantom Read

### 3. Repeatable Read
> 트랜잭션 내에서 한번 조회한 데이터를 반복해서 조회해도 같은 데이터 조회(개별 데이터)
>
> 개별 데이터에서 발생되는 이슈인 Dirty, Non-Repeatable Read는 발생하지 않으나,
>
> 결과 집합 자체가 달라지는 Phantom Read 이슈 발생
>
> 발생 가능한 이슈 - Phantom Read

### 4. Serializable
> 해당 트랜잭션이 조회한 결과가 데이터를 반복해서 조회해도 같은 데이터 조회(새로 생성되지 않음)
>
> 발생 가능한 이슈 - X


#### [참고사항]

- [링크](https://d2.naver.com/helloworld/407507)
- [gyoogle님 github](https://github.com/gyoogle/tech-interview-for-developer/blob/master/Computer%20Science/Database/Transaction.md)
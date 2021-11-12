# SQL *Structured Query Language*

> RDBMS 에서 DB를 사용, 관리하기 위해 제공되는 Query문
> 
> DDL DCL DML 3가지 종류로 구분 ( + TCL )


### 목차
- DDL
- DCL
- DML
- TCL
- JOIN

<br/><br/>

---
## DDL *Data Definition Language*
> 데이타베이스를 정의하기 위해 생성, 수정, 삭제 기능을 제공
>
> 스키마, 도메인, 테이블, 뷰, 인덱스 그리고 여기서 사용되는 제약조건을 정의

| 키워드 | 설명 |
|---|---|
| CREATE | 데이터베이스, 테이블등을 생성 |
| ALTER | 테이블을 수정 |
| DROP | 데이터베이스, 테이블을 삭제 |
| TRUNCATE | 테이블을 초기화(내부 데이터) |

## 제약조건

### CONSTRAINT

- NOT NULL - 해당 KEY의 값이 NULL 값을 가질 수 없도록 정의
- UNIQUE - 해당 KEY의 값이 공유하도록 정의
- PRIMARY KEY- NOT NULL과 UNIQUE - 기본키를 정의
- FOREIGN KEY - 테이블 간의 관계 정의
- CHECK - 컬럼의 값이 특정 조건을 만족하는지 확인
- DEFAULT - 값이 지정되지 않은 경우 열의 기본값을 설정
- CREATE INDEX - INDEX 생성

> FOREIGN KEY에 대한 UPDATE, DELETE 등의 조건에 제약조건을 걸 수 있음

1. FOREIGN KEY(STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON DELETE CASCADE
    - TUPLE을 제거할 때 해당 FOREIGN KEY 로 연결된 STUDENT <br/>
    테이블의 STUDENT_ID 를 가진 TUPLE도 같이 제거
2. FOREIGN KEY(STUDENT_ID) REFERENCES STUDENT(STUDENT_ID) ON UPDATE CASCADE
    - TUPLE을 수정할 때 해당 FOREIGN KEY 로 연결된 STUDENT <br/>
    테이블의 STUDENT_ID 를 가진 TUPLE도 같이 업데이트
  
> 제약조건을 쉽게 관리하기 위하여 이름을 붙여 사용

```
CONSTRAINT 제약조건이름 FOREIGN KEY (STUDENT_ID)
    REFERENCES STUDENT(STUDENT_ID)
```

### PRIMARY KEY

> 키를 정의할 떄, 해당 키를 기본키로 사용하겠다고 정의

```
ID number(10)
PRIMARY KEY(ID)

OR

ID number(10) PRIMARY KEY
```

### FOREIGN KEY - REFERENCES

> 해당 KEY를 외래키로 사용하겠다고 정의

```
STUDENT_ID varchar(256) 
FOREIGN KEY(STUDENT_ID) REFERENCES STUDENT(STUDENT_ID)

OR

STUDENT_ID varchar(256) REFERENCES STUDENT(STUDENT_ID)
```

### UNIQUE KEY

> 해당 KEY는 중복된 값을 가질 수 없음을 정의

```
STUDENT_ID varchar(256)
UNIQUE(STUDENT_ID)

OR 

STUDENT_ID varchar(256) UNIQUE
```

### NOT NULL

> 해당 KEY는 NULL이 될 수 없음을 의미

```
STUDENT_ID varchar(256) NOT NULL
```

<br/><br/>

---
## DCL *Data Control Language*

> 데이터에 접근하고, 객체를 사용할 수 있도록 권한을 부여하고 회수하는 명령어

| 키워드 | 설명 |
|---|---|
| GRANT | 권한 부여 |
| REVOKE | 권한 회수 |

```
GRANT [권한] ON [DB].[TABLE or SCHEMA] TO [유저_ID]@[호스트]

REVOKE [권한] ON [DB].[TABLE or SCHEMA] FROM [유저_ID]@[호스트]
```

- GRANT WITH ADMIN OPTION : 부여받은 권한이나 롤을 다른 사용자에게 부여하거나 취소 가능
- REVOKE CASCADE : 해당 유저가 부여한 권한 또한 전부 회수
- REVOKE RESTRICT : 해당 유저가 부여한 권한이 있을 경우 회수 취소

<br/><br/>

---
## DML *Data Manipulation Language*

| 키워드 | 설명 |
|---|---|
| INSERT INTO | CREATE |
| SELECT FROM | READ |
| UPDATE SET | UPDATE |
| DELETE FROM | DELETE |

### INSERT

- INTO : 대상 테이블 (*필수)

```
INSERT INTO TABLE(NAME, AGE) VALUES('NAME', 12)
INSERT INTO TABLE VALUES('NAME', 12, ...)
```

### SELECT

- FROM 테이블 : 대상 테이블 OR VIEW (*필수)
- WHERE 조건 : 조건 기술
- ORDER BY KEY : KEY에 대한 ASC(오름차순) DESC(내림차순) 정렬
- GROUP BY KEY : 해당 KEY에 대한 GROUPING
- HAVING 조건 : GROUP에 대한 조건 기술 EX) HAVING COUNT(*) >= 20
- JOIN : 다른 테이블의 데이터 연계 (따로 다룸)
- 
```
SELECT SCHOOL, COUNT(*) AS CNT 
    FROM TABLE WHERE ID >= 1 
    GROUP BY SCHOOL 
    HAVING COUNT(*) >= 10 
    ORDER BY COUNT(*) ASC

- ID가 1 이상인 튜플에 대하여
- SCHOOL 그룹별로 나누며, 해당 SCHOOL인원이 10명 이상인 경우만
- 인원을 오름차순으로 정렬
- 학교와 인원수를 출력
```

### UPDATE

- SET : KEY = VALUE 로 값 설정 (필수 *)
- WHERE : 해당 SET을 적용 할 TUPLE 집합의 조건 (필수 *)

```
UPDATE TABLE SET KEY='VALUE' WHERE ID = 12
```

### DELETE

- FROM : 대상 테이블 (필수 *)
- WHERE : 제거할 TUPLE 조건

```
DELETE FROM TABLE WHERE ID= 12
```

<br/><br/>

---
## TCL *Transaction Control Language*

> 트랜잭션 제어 언어
> 
> COMMIT, ROLLBACK, SETPOINT 가 존재 (따로 설명)

<br/><br/>

---
## JOIN

> 다른 테이블과의 데이터를 연계하여 데이터 제어
> 
> INNER, LEFT, RIGHT, OUTER, SELF JOIN 등이 존재 

![](https://t1.daumcdn.net/cfile/tistory/99219C345BE91A7E32)

### INNER JOIN

> 내부 조인 (교집합)
> 
> 두 테이블을 비교하여 해당 조건을 만족하는 TUPLE만 SELECT

```
SELECT * FROM 
    TABLE1 AS A 
    INNER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
```

### LEFT JOIN

> LEFT TABLE TUPLE 전부 SELECT
> 
> RIGHT TABLE과 JOIN이 되는 TUPLE만 RIGHT TABLE의 속성을 가짐
> 
> 나머지 매칭되지 않은 TUPLE의 경우 RIGHT TABLE 값이 NULL로 세팅

```
SELECT * FROM 
    TABLE1 AS A 
    LEFT OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
```

> LEFT TABLE 에서 RIGHT TABLE TUPLE 과 겹치는 부분을 제외하고 싶은 경우

```
SELECT * FROM 
    TABLE1 AS A 
    LEFT OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
    WHERE B.ID IS NULL
```

### RIGHT JOIN

> RIGHT TABLE TUPLE 전부 SELECT
>
> LEFT TABLE 과 교집합부분만 LEFT TABLE 속성의 값을 가짐

```
SELECT * FROM 
    TABLE1 AS A 
    RIGHT OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
```
> RIGHT TABLE 에서 LEFT TABLE TUPLE 과 겹치는 부분을 제외하고 싶은 경우

```
SELECT * FROM 
    TABLE1 AS A 
    RIGHT OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
    WHERE A.ID IS NULL
```

### OUTER JOIN
> 합집합
> 
> LEFT TABLE 과 RIGHT TABLE 모두 SELECT
> 
> LEFT OUTER JOIN + RIGHT OUTER JOIN
> 
> 중복되는 부분을 한번만 SELECT

```
SELECT * FROM 
    TABLE1 AS A 
    FULL OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
```

> 교집합 부분만 빼고 싶은 경우

```
SELECT * FROM 
    TABLE1 AS A 
    FULL OUTER JOIN 
    TABLE2 AS B 
    ON A.ID = B.ID
    WHERE A.ID IS NULL OR B.ID IS NULL
```

### SELF JOIN

> 한 테이블 JOIN 하려하는 데이터가 전부 존재할경우
> 
> EX) 소개팅 어플 DB에서 A랑 매칭된 B의 정보를 보고싶은 경우

```
SELECT * FROM
    TABLE1 AS A,
    TABLE2 AS B
    WHERE A.MATCH = B.NAME
```

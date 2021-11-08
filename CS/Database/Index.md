# 인덱스 *Index*

> RDBMS에서 **검색 속도**를 높이기 위해 레코드를 처음부터 풀스캔하지 않고
> 
> Tree로 구성된 구조의 Index 를 통해 **검색 속도를 향상**시키는 기술이다.
>
> RDBMS에서는  Balance Search Tree를 사용<br/><br/>
> 
> SELECT 쿼리의 WHERE절이나 JOIN 예약어를 사용했을 때만 인덱스를 사용하며,
> 
> SELECT 쿼리의 검색 속도를 빠르게 하는데 목적을 두고 있다.
> 
> DELETE, INSERT, UPDATE 쿼리에는 해당 사항이 없으며 성능에 악영향

### 목차
- 원리
- 장점
- 단점

<br>

## [1. 원리]

테이블 생성 시, 3가지 파일이 생성된다.

- FRM : 테이블 구조 저장 파일
- MYD : 실제 데이터 파일
- MYI : Index 정보 파일 (Index 를 사용하지 않으면 빈내용)

<br>
INDEX를 특정 컬럼에 생성하면 해당 컬럼을 따로 인덱싱하여 MYI 파일에 입력

사용자가 쿼리를 통해 Index를 사용하는 칼럼을 검색하게 되면, 

Table이 아닌 MYI 파일의 내용을 검색

<br/>

#### 장점
- 테이블의 검색과 정렬 속도를 향상
- 테이블 행의 고유성을 강화
- 테이블의 기본키는 자동으로 인덱스됨
- 필드 중에는 데이터 형식 때문에 인덱스 될 수 없는 필드도 존재
- 여러 필드로 이루어진(다중 필드)인덱스를 사용하면 첫 필드 값이 같은 레코드도 구분 가능

#### 단점 

- Index 생성시, .mdb 파일 크기가 증가한다.
- **한 페이지를 동시에 수정할 수 있는 병행성**이 줄어든다.
- 인덱스 된 Field에서 Data를 UPDATE하거나, **Record를 CREATE, DELETE시 성능이 떨어진다.**
  - 데이터 변경 작업이 자주 일어나는 경우, **Index를 재작성**해야 하므로 성능에 악영향
- 인덱스를 생성하는데 시간이 많이 소요
- 데이터베이스 공간을 차지하여 추가적인 공간이 필요

<br>

#### 상황 분석

* ##### 사용하면 좋은 경우

    1. Where 절에서 자주 사용되는 Column
    2. 외래키가 사용되는 Column
    3. Join에 자주 사용되는 Column
<br>

* ##### Index 사용을 지양해야 하는 경우

    1. Data 중복도가 높은 Column
    2. DML이 자주 일어나는 Column

<br>

#### DML이 일어났을 때의 상황

* ##### `INSERT`

  기존 Block에 여유가 없을 때, 새로운 Data가 입력된다.

  → 새로운 Block을 할당 받은 후, Key를 옮기는 작업을 수행한다.

  → Index split 작업 동안, 해당 Block의 Key 값에 대해서 DML이 블로킹 된다. (대기 이벤트 발생)

* ##### `DELETE`

  <Table과 Index 상황 비교>

  Table에서 data가 delete 되는 경우 : Data가 지워지고, 다른 Data가 그 공간을 사용 가능하다.

  Index에서 Data가 delete 되는 경우 : Data가 지워지지 않고, 사용 안 됨 표시만 해둔다.

  → **Table의 Data 수와 Index의 Data 수가 다를 수 있음**

* ##### `UPDATE`

  Table에서 update가 발생하면 → Index는 Update 할 수 없다.

  Index에서는 **Delete가 발생한 후, 새로운 작업의 Insert 작업** / 2배의 작업이 소요되어 힘들다.

# 트리 *Tree*

> 사이클이 존재하지 않는 그래프
> 
> 노드와 노드 사이 부모와 자식 관계가 존재 (계층 구조)
> 
> 한 노드를 가리키는 노드는 하나밖에 존재할 수 없음
> 
> DAG(Directed Acyclic Graphs, 방향성이 있는 비순환 그래프)
> 
> 모든 노드들은 연결되어있음

### 목차
- 용어
- 트리의 종류
- 트리를 이용한 자료구조
- 구현

<br/><br/>

---
## 용어

![](https://gmlwjd9405.github.io/images/data-structure-tree/tree-terms.png)

> 1. 루트 *Root* 노드 - 트리의 최상위 노드 (A)
> 2. 단말 *Leaf* 노드 - 자식이 존재하지 않는 노드 (H, I, J, F, G)
> 3. 간선 *Edge* - 노드를 연결하는 선 *link, branch*
> 4. 형제 *Sibling* 노드 - 같은 부모를 가지는 노드 관계
> 5. 노드의 크기 *Size* - 자신을 포함한 모든 자손 노드의 개수
> 6. 노드의 깊이 *Depth* - 루트에서 어떤 노드에 도달하기 위해 거쳐야 하는 간선의 수
> 7. 노드의 레벨 *Level* - 노드의 깊이 = 루트노드를 level 0으로 루트 노드와의 길이
> 8. 노드의 차수 *Degree* - 노드에 연결된 간선 수
> 9. 트리의 차수 *Degree of tree* - 트리의 최대 차수
> 10. 트리의 높이 *height* - 트리의 최대 높이

트리의 각 노드는 아래와 같은 정보를 가질 수 있음
- 자식 노드 링크 집합 *
- 고유한 ID or Name
- 노드가 가지는 값
- 부모노드 링크

<br/><br/>

---
## 트리의 종류

> 트리의 종류로 일반 트리, 이진 트리(포화/완전/전), 균형/비균형 트리 등이 존재

### 이진 트리

> 자식 노드를 왼쪽 자식, 오른쪽 자식 두 노드만 가질 수 있는 트리

### *포화 이진 트리*

- 단말 노드를 제외한 모든 노드가 두 개의 자식 노드를 가짐
- 모든 단말 노드가 동일한 깊이 또는 레벨을 가짐
- 전 이진 트리이면서 완전 이진 트리인 경우

    #### 특징

- 높이가 k일 경우 노드의 개수가 2^(k - 1) 로 고정

![](https://gmlwjd9405.github.io/images/data-structure-tree/Perfect-Binary-Tree.png)


### *완전 이진 트리*

- 마지막 레벨을 제외한 레벨의 노드가 꽉 차 있는 이진 트리
- 마지막 레벨은 꽉 차 있지 않아도 되자만 노드가 왼쪽에서 오른쪽으로 채워져야 함
- 배열로 효율적인 표현 가능

![](https://gmlwjd9405.github.io/images/data-structure-tree/Complete-Binary-Tree.png)

### *전 이진 트리* 

- Full Binary Tree 또는 Strictly Binary Tree로 불림
- 모든 노드가 0 or 2 개의 자식을 가지는 노드

![](https://gmlwjd9405.github.io/images/data-structure-tree/Full-Binary-Tree.png)

### 균형 vs 비균형(퍈향) 트리

> 트리의 탐색 시간을 최소화시키기 위해 
> 
> 트리의 높이를 최소로 유지하는 트리를 균형 트리라고 함

![](https://doevytnk.com/images/tree.png)

<br/><br/>

---
## 트리를 이용한 자료구조

### 이진탐색트리

> 이진 트리를 이용하여 정렬된 배열을 이용하던 이진탐색의 방식을 사용한 탐색에 적합한 트리 구성

**조건**

1. 각 노드에 값이 존재
2. 노드의 왼쪽 서브트리에는 그 노드의 값보다 작은 값들을 지닌 노드들로 이루어짐
3. 노드의 오른쪽 서브트리에는 그 노드의 값보다 큰 값들을 지닌 노드들로 이루어짐
4. 좌우 하위 트리는 각각이 다시 이진 탐색 트리

> 탐색 : 최적 O(log N) - 균형이 맞춰져있을 경우 -  최악 O(N) - 편향되어있을 경우 - 

### 자가 균형 이진 탐색 트리

- AVL Tree  - Database (조회 속도 중요) 에서 주로 사용 (조회가 빠름)
- Red-black Tree - AVL Tree보다 빠른 삽입과 제거를 제공

### B 트리

> 균형트리로서 자식을 2개만 가지는 Binary tree를 확장하여 더 많은 자식을 가질 수 있게 구현
> 
> M개의 자식을 가지게 되면 M차 B Tree 라고 함
> .
> 균형트리이기 때문에 최악의 경우에도 O(log N)의 성능

**조건**

1. node의 자료수가 N이라면 자식의 수는 N + 1
2. 각 node의 data는 정렬된 상태로 유지
3. node의 자료 A의 left subtree는 A보다 작은 값들이고 right subtree는 A보다 큰 값들로 구성
4. Root node는 적어도 2개이상의 자식을 가져야 함
5. Root node를 제외한 모든 node는 적어도 M/2개의 자료를 가지고 있어야 함
6. 입력자료는 중복될 수 없음


### *B-트리*

> Binary Search Tree를 확장한 Tree로 각 Node는 여러개의 Key와 Data, 여러개의 Child를 가질 수 있음
>
> Block 단위로 Data를 Read/Write하는 Disk 환경에서는 Binary Search Tree보다 B-Tree를 이용하는 것이 유리

![](https://ssup2.github.io/images/theory_analysis/B_Tree_B+_Tree/B_Tree.PNG)

### *B+트리*

> B-Tree를 발전시킨 Tree
> 
> Inner Node에는 Key만 저장이 되고 Leaf Node에 Key와 Data를 함께 저장
> 
> Leaf Node간의 Pointer를 연결하여 B-Tree에 비하여 쉬운 순회가 가능

![](https://ssup2.github.io/images/theory_analysis/B_Tree_B+_Tree/B+_Tree.PNG)

<br/><br/>

---
## 구현

1. ### 인접 배열 이용

> 1차원 배열에 자신의 부모 노드만 저장하는 방법
> 
> 트리는 부모 노드를 0개 또는 1개를 가지기 때문

![](https://3.bp.blogspot.com/-fJAvW9H9-dw/WmF1dCxu8pI/AAAAAAAAPLg/fngfFZWc33oJrAQmeL-pp06VtmxVdYqNQCLcBGAs/s1600/Embed%2BBinary%2BSearch%2BTree.png)

2. ### 인접 리스트 이용

Pass

---

## 순회

1. 중위 순회 : 왼쪽 자식 노드 -> 루트 노드 -> 오른쪽 자식 노드
2. 전위 순회 : 로트 노드 -> 왼쪽 자식 노드 -> 오른쪽 자식 노드
3. 후위 순회 : 왼쪽 자식 노드 -> 오른쪽 자식 노드 -> 로트 노드 


## 출처

https://gmlwjd9405.github.io/2018/08/12/data-structure-tree.html
https://ssup2.github.io/theory_analysis/B_Tree_B+_Tree/
https://www.google.com/url?sa=i&url=https%3A%2F%2Flifecs.likai.org%2F2018%2F01%2Fembedding-binary-search-tree-in-array.html&psig=AOvVaw2Y6nMypACj03h4o1qsdCd3&ust=1636615615835000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCIjM2eqijfQCFQAAAAAdAAAAABAD

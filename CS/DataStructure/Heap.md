# Heap *Scheduling*

> 최댓값 및 최솟값을 빠르게 찾기 위해 만들어진 자료구조
>
> 완전이진트리 *Complete binary tree*
>
> 반정렬 상태 (느슨한 정렬)을 유지 - 모든 노드에 저장된 값들은 자식 노드들과만 비교됨
>
> 우선순위 큐를 구현하는 방법
>
> 배열과 리스트로 구현 가능

### 목차
- 종류
- 구현

<br/><br/>

---
## 종류

![](https://media.vlpt.us/images/kimdukbae/post/707f9139-5e48-477d-855f-d9c0a82a08a5/image.png)

### `최대 힙` *Max Heap*

> 루트 노드가 가장 큰 값을 가지게 되는 Heap



### `최소 힙` *Min Heap*

> 루트 노드가 가장 작은 값을 가지게 되는 Heap

<br/><br/>

---
## 구현

### 원리

### 1. 삽입
![](https://gmlwjd9405.github.io/images/data-structure-heap/maxheap-insertion.png)

> 힙의 새로운 노드 삽입 시 가장 마지막 노드로 삽입
>
> 부모 노드와 비교하며 교환

### 2. 삭제 (pop)
![](https://gmlwjd9405.github.io/images/data-structure-heap/maxheap-delete.png)

> 힙의 루트부터 pop 됨
>
> 가장 마지막 노드를 루트로 올린 후, 자식들과 비교하여 교환 반복
>
> 최대힙 : 왼쪽 node < 오른쪽 node = 오른쪽 node 와 교환
>
> 최소힙 : 왼쪽 node < 오른쪽 node = 왼쪽 node 와 교환

### 출처
#### 이미지
- https://velog.io/@kimdukbae/%EC%9E%90%EB%A3%8C%EA%B5%AC%EC%A1%B0-%ED%9E%99-Heap
- https://gmlwjd9405.github.io/2018/05/10/data-structure-heap.html
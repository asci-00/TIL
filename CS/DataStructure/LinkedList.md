
# 연결리스트 *Linked Lists*

> 원소를 O(1)에 접근하는것이 불가능 
> 
> 재귀 호출 *Recursion*이 빈번히 발생
>
> 크기가 고정적인 배열의 한계를 보완 (동적 크기)

### 목차
- 배열 vs 리스트
- 구현방법
- 종류
- 기술

<br/><br/>

---
### 배열 vs 리스트

> 선형 자료구조인 배열과 리스트 비교

| - | 배열 | 리스트 |
| :---: | :---: | :---: |
| 탐색 | O(1) | O(n) |
| 삽입 | O(n) | 탐색 + O(1) |
| 삭제 | O(n) | 탐색 + O(1) |

- 연결 리스트는 sorted 와 unsorted로 구분됨

<br/><br/>

---
### 구현 방법

> 간단한 단방향 연결리스트 노드

```cpp
template <typename T>
class Node {
public:	
	Node next = null;
	T data;

	Node(T val) { data = T; }
	void pushNode(T newData) {
		Node newNode = new Node(newData);
		Node now = this;

		while(now.next != null) now = now.next;
		now.next = nowNode;
	}
};
```

---
### 종류

- 정렬 여부에 따라 sorted, unsorted로 구분
- 연결 형태에 따라 아래와 같이 구분
	- 단순 연결 리스트 *Singly Linked List*
	- 이중 연결 리스트 *Doubly Linked List*
	- 원형 연결 리스트 *Circular Linked List*
	- 이중 원형 연결 리스트 *Doubly Circular Linked List*

<br/><br/>

---

## 기술

> 연결리스트를 사용하거나 응용되어 구현되는 기술

### Runner

```html
Fast runner와 Slow runner 두 개의 포인터를 사용하여
중간 위치 검색, 길이 파악, 순환 여부 등을 파악
```
Slow runner가 1번 위치를 증가시킬 때, Fast runner는 2번 위치를 증가시킴

- Fast runner가 끝에 도달하면 Slow runner는 중앙에 위치하게 됨
- Slow runner가 가리키는 중앙값을 통해 값을 비교하거나 뒤집는 연산을 수행
- Fast runner와 Slow runner가 충돌하게되면 순환이 존재함을 의미

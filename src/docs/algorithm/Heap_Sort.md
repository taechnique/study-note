---
layout: post
title: -Algorithm- Heap sort (힙 정렬) feat.java
categories: [Development, Algorithm]
tags: [Java, Algorithm, Sort, Heap Sort, Heap]
date: 2022-04-28 22:27:00 +0900
thumbnail: "/assets/blogging/algorithm/heap_sort_intro.png"
current_company: Herit Corporation
current_position: Backend Server Developer
excerpt_separator: <!--more-->
hide: true
---
열라 간단한 우선순위 큐의 자료구조인 Heap에 대해 공부합니다.
힙의 속성?! 힙이 최소 또는 최대값을 유지하는 방법?!

힙을통해 정렬하는 방법까지 공부합니다. 😁

    8️⃣
   /   \
4️⃣    5️⃣

<!--more-->


# 힙 정렬 (Heap Sort)

## 배울수 있는 내용

* Heap의 속성
* Heap을 만드는 방법
* Heap이 우선 값을 유지하는 방법
* 완전 이진트리와 Heap의 관계
* Heap을 이용해 정렬을 하는 방법

🌸 힙(Heap)은 요소의 우선순위를 이용하여 정렬된 상태를 유지할 수 있는 매우 편한 자료구조입니다.
먼저, 힙 정렬을 알기전에 힙이 어떤 속성을 갖고 있는지 알아보아요.

---

## 설명

간단하게 말하여, 힙은 우선순위 큐 입니다. `JAVA`에서는 `PriorityQueue`라는 구현체를 통해 Heap 자료구조를 사용할 수 있어요.
힙은 두 종류가 있는데 `최대 힙`과 `최소 힙`이 있어요. 
최대 Heap(최소 Heap)은 단어와 같이 최대 값(최소 값)을 우선순위로 판단하여, 어떠한 값이 들어와도, 항상 같은 순서의
트리를 유지하며, 언제든지 최고 우선순위의 값을 적은 비용으로 쉽게 얻을수 있는 자료구조 입니다.

### Heap의 속성 (특징)

* 최대 힙(**또는 최소 힙**)은 `잎(leaf)`의 계층을 제외한 모든 노드는 자식의 노드 보다 큰(**또는 작은**) 값을 가지고 있어야합니다.
* 왼쪽부터 차례대로 채워져있는 `완전 이진 트리(Complete binary tree)`이어야 합니다.
* 같은 계층의 노드들과는 정렬하지 않습니다.
* 루트(뿌리)노드로 부터 내려오는 위치의 노드들 오름차순(**또는 내림차순**)입니다

![어떤것이 힙일까요?](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/tree_images.svg)

트리 A: 잎을 제외한 노드는 모두 정렬되었지만, 왼쪽부터 채워지지않아 Heap이 아닙니다.
트리 B: 왼쪽부터 채워졌지만, 2번노드의 값은 그 자식에값보다 작습니다. 따라서 Heap이 아닙니다.
트리 C: 잎을 제외한 모든 노드가 자식 또는 부모와 정렬 되어있고, 왼쪽부터 채워져있으므로 `Heap`입니다.

이를 정리하면 아래와 같습니다.

> 1. 𝑛개의 노드를 가진 힙은 정확히 하나만 있고 그 힙(트리)의 높이(height)는 ⎣log₂𝑛⎦이다
> * 트리의 전체 노드의 개수가 8일경우 트리의 높이는 3이다. 즉 힢의 높이는 힙의 성질(속성)에 부합되는 노드들만 인정이 된다는 의미이다.

> 2. 힙의 루트 노드는 항상 최댓값(**또는 최솟값**)을 저장한다.
> * 최대 힙(**또는 최소 힙**)은 쵀댓값(**또는 최솟값**)을 효율적으로 관리하기 위한 자료구조이며, 루트에는 항상 가장 큰(**또는 작은**)값을 유지한다.

> 3. 힙의 한 노드와 그 노드의 자손 노드들로 이루어진 부분 트리(subtree)도 힙이다.
> * 힙은 힙으로 이루어져있으며 자식노드도 힙이 될수있지만, 노드의 자식이없다면 힙이될 수없다. 따라서 위 C 트리의 4, 5, 6번 노드는 힙이 아니다.


### Heap을 만드는 방법

힙을 구성 하기 위해서는 다음의 순서대로 진행됩니다.

1. 순회를 시작할 힙이되는 마지막 노드`⎣𝑛/₂⎦`를 찾는다.
2. 마지막 노드 i를 이용해 자식노드가 있는지, 또한 있다면 그 중 자신 보다 큰값을 자신과 찾는다.
3. 찾은 값과 자신을 바꾸고 바꾼 자신의 위치는 그값의 자식이 되며, 자신보다 큰값이 나오지 않을때까지 반복한다.
4. 다음 노드(i -1)에서 다시 `3.`을 반복한다.

- 자식 노드의 위치를 찾을때는 왼쪽`arr[2i]`값과 오른쪽`arr[2i + 1]`로 구할 수 있습니다.

위 의 내용을 정리하면 아래와 같습니다.


![힙 만들기 1단계](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/first_iteration.svg)

> 위의 트리는 *완전 이진트리* 입니다. 힙은 완전이진트리에서 만들수 있으므로, 일반 이진트리는 Compact하게 완전이진트리로 바꿔야
> 힙을 만들수 있습니다.
> 
> 왼쪽 트리의 마지막 힙의 값은 15 이며, 이는 자식(6, 4) 어느것 보다도 큰값입니다. 따라서 다음 순회로 넘어갑니다.
> 순회는 내부 노드의 마지막 힙의 위치에서 부터 1까지 이어집니다. 따라서 다음 인덱스인 3번 노드(9)로 넘어갑니다.
> 3번노드는 자신의 자식들 중 6번째, 7번째 (7, 12)와 비교하여 더 큰값을 가지는 12와 바꿉니다.

![힙 만들기 중간 단계](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/other_iteration.svg)

> 이후 과정은 위와 같이 반복됩니다. 내부노드를 순회하며 자신의 자식노드가 있는지 확인하고 있다면, 자신과 비교하여 더큰 값으로
> 바꿉니다. 이는 바꾼이후에도 `3.`이 반복되게 됩니다.
> 
> 순회되는 노드가 최상위노드가 되고 모든 내부노드가 힙이 될때, 전체 트리는 힙이 됩니다. 
> 마지막까지 바꾼 최종트리는 아래와 같습니다. 


![힙 만들기 마지막 단계](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/last_iteration.svg)

* 최상위 노드(루트)가 가장 큰값이 되며, 위는 최대힙을 만드는 단계였습니다.
* 부모노드와 자식노드끼리는 순서의 값을 가지며, 항상 최대의 값을 가집니다.  

### Heap이 우선 값을 유지하는 방법

위에서는 완전이진트리로 힙을 어떻게 만드는지에 대해 알아봤습니다.
하지만, 힙은 언제나 새로운값이 들어와도 항상 우선 순위로 값을 관리합니다. 만약 저기서 더큰값이 추가된다면,
저 힙트리는 어떻게 바뀔까요? 새로운 값들을 추가해서 힙이 다시 어떻게 유지되는지 배워봅니다.

#### 값추가

힙트리에서 값을 추가 할때는 마지막 노드로 붙여주고 위에서 했던것과 동일하게 힙을 만들어 줍니다.
만약 새로운 값 17이 힙에 들어온다면 순서는 아래와 같이 바뀝니다.

![힙 유지하기 1단계](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/add_new_17.svg)
![힙 유지하기 2단계](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap/add_new_17_2.svg)



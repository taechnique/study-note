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

<!--more-->


## 힙 정렬 (Heap Sort)

### 배울수 있는 내용

* Heap의 속성
* 완전 이진트리와 Heap의 관계
* Heap을 이용해 정렬을 하는 방법

🌸 힙(Heap)은 요소의 우선순위를 이용하여 정렬된 상태를 유지할 수 있는 매우 편한 자료구조입니다.
먼저, 힙 정렬을 알기전에 힙이 어떤 속성을 갖고 있는지 알아보아요.

---

### 설명

간단하게 말하여, 힙은 우선순위 큐 입니다. `JAVA`에서는 `PriorityQueue`라는 구현체를 통해 Heap 자료구조를 사용할 수 있어요.
힙은 두 종류가 있는데 `최대 힙`과 `최소 힙`이 있어요. 
최대 Heap(최소 Heap)은 단어와 같이 최대 값(최소 값)을 우선순위로 판단하여, 어떠한 값이 들어와도, 항상 같은 순서의
트리를 유지하며, 언제든지 최고 우선순위의 값을 적은 비용으로 쉽게 얻을수 있는 자료구조 입니다.

#### Heap의 속성

* 최대 힙(**또는 최소 힙**)은 `잎(leaf)`의 계층을 제외한 모든 노드는 자식의 노드 보다 큰(**또는 작은**) 값을 가지고 있어야합니다.
* 왼쪽부터 차례대로 채워져있는 `완전 이진 트리(Complete binary tree)`이어야 합니다.
* 같은 계층의 노드들과는 정렬하지 않습니다.
* 루트(뿌리)노드로 부터 내려오는 위치의 노드들 오름차순(**또는 내림차순**)입니다

![잘못된 트리 A](/src/assets/blogging/algorithm/tree_images.png)

트리 A: 잎을 제외한 노드는 모두 정렬되었지만, 왼쪽부터 채워지지않아 Heap이 아닙니다.
트리 B: 왼쪽부터 채워졌지만, 2번노드의 값은 그 자식에값보다 작습니다. 따라서 Heap이 아닙니다.
트리 C: 잎을 제외한 모든 노드가 자식 또는 부모와 정렬 되어있고, 왼쪽부터 채워져있으므로 `Heap`입니다.
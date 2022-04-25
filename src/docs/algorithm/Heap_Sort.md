---
layout: post
title: -Algorithm- Heap sort (힙 정렬) feat.java
categories: [Development, Algorithm]
tags: [Java, Algorithm, Sort, Heap Sort, Heap]
date: 2022-04-21 23:27:00 +0900
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
* Heap이 정렬을 하는 방법

🌸 힙(Heap)은 요소의 우선순위를 이용하여 정렬된 상태를 유지할 수 있는 매우 편한 자료구조입니다.
먼저, 힙 정렬을 알기전에 힙이 어떤 속성을 갖고 있는지 알아보아요.

---

### 설명

간단하게 말하여, 힙은 우선순위 큐 입니다. `JAVA`에서는 `PriorityQueue`라는 구현체를 통해 Heap 자료구조를 사용할 수 있어요.
힙은 두 종류가 있는데 `최대 힙`과 `최소 힙`이 있어요. 
최대 Heap(최소 Heap)은 단어와 같이 최대 값(최소 값)을 우선순위로 판단하여, 어떠한 값이 들어와도, 항상 같은 순서의
트리를 유지하며, 언제든지 최고 우선순위의 값을 적은 비용으로 쉽게 얻을수 있는 자료구조 입니다.

#### Heap의 속성

![잘못된 트리 A](https://raw.githubusercontent.com/taechnique/study-note/main/src/assets/blogging/algorithm/heap_sort_1.png)

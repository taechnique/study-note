---
layout: post
title: -Algorithm- Insertion Sort (삽입정렬 알고리즘) feat.java
categories: [Development, Algorithm]
tags: [Java, Algorithm, Sort, Insertion Sort]
date: 2022-04-21 23:25:00 +0900
current_company: Herit Corporation
current_position: Backend Server Developer
excerpt_separator: <!--more-->
hide: true
---
이번 포스팅 순서는, 
기본 정렬 알고리즘중 하나인 삽입 정렬(Insertion Sort)입니다.

이전 포스팅의 선택정렬하고는 또 다른 맛이있네용 ㅋㅋ

지적 및 조언 댓글 환영입니다. ㅎㅎ
<!--more-->


## 삽입정렬 (Insertion Sort)


🌸 삽입정렬은 배열을 순회하며, 삽입할 위치를 찾고 요소들을 **한단계씩 밀어** 해당 위치에 삽입하며 정렬하는 알고리즘 입니다.
삽입정렬 또한 선택정렬과 마찬가지로 정렬된 부분과 정렬되지 않은 부분으로 나뉩니다.

> **한단계씩 밀어** 라는 말은 [ 1 ][ 3 ][ 2 ] 에서 2라는 요소를 임시로 빼고 1 과 3사이에 들어갈공간을 만들기 위해 뺀 2의 자리로 3을 한 단계밀어,
> [ 1 ][   ][ 3 ] 처럼 빈 공간을 만든 다는 의미입니다.


---




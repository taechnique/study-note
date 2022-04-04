---
layout: post
title: -Algorithm- Selection Sort (선택정렬 알고리즘) feat. java
categories: [Development, Algorithm]
tags: [Java, Algorithm]
date: 2022-04-04 23:34:00 +0900
thumbnail: "/assets/blogging/algorithm/selection_sort_intro.png"
current_company: Herit Corporation
current_position: Backend Server Developer
excerpt_separator: <!--more-->
hide: false
---
기본 정렬 알고리즘중 하나인 선택 정렬(Selection Sort)입니다.
간단한 그림과 함께 쉽게 이해할 수 있도록 정리했어요.
<!--more-->


## 선택정렬 (Selection Sort)


🌸 선택 정렬은 정렬할 배열을 순회하며, 어떤 원소로 대치할지 선택하여 정렬하는 알고리즘 입니다.
설명을 보기에 앞서, 통상적으로 정렬은 오름 또는 내림으로 배열의 수열을 맞추어 순서를 만드는 행위로 의미합니다.

---
  
  
  

<div class="array">
    <span>1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>


> 정렬을 하기위해 배열을 준비합니다. 또한, 해당 배열을 순회하면서 *나머지들의 값들중 가장작은 값으로 변경합니다.


<div class="array">
    <span class="current">1</span>
    <span>4</span>
    <span>7</span>
    <span>3</span>
    <span>2</span>
    <span>5</span>
</div>

> 첫번째 순회요소는 나머지의 값들중 가장작은 값인 1 입니다. 따라서, 변경하지않습니다.


<div class="array">
    <span class="over">1</span>
    <span class="current">4</span>
    <span>7</span>
    <span>3</span>
    <span class="target">2</span>
    <span>5</span>
</div>

> 두번째는 4입니다. 나머지의 요소들중 가장작은값이 2가 존재합니다. 4와 2를 변경합니다.
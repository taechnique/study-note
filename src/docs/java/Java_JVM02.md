---
layout: post
title: -Java- JVM 02 (Heap area)
categories: [Development,Java]
tags: [Java, JVM, Runtime Data Area, Heap]
date: 2021-03-04 14:58:00 +0900
profile_image: /assets/blogging/profile/profile2.JPG
current_company: Cubic Inc
current_position: Web Backend Developer
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/blogging/java/jvm_heap.png"
---
Runtime Data Area의 Heap area(힙 영역) 에대해 알아보자.
<!--more-->
## Heap area

힙영역은 동적으로 생성된 객체들이 적재되는 영역이며, Garbage Collector의 메모리 해제 대상이되는 영역입니다. [`Method area`](https://kimchi-dev.github.io/posts/Java_JVM01/#1-method-area)로 이동된 바이트코드들은 `Execution Engine`에 의해 각명령 단위로 실행되는데, 이때 생성된 인스턴스들은 `Heap`영역으로 메모리를 할당받게 됩니다.


![JVM Heap]({{ "/assets/img/bloging/java/jvm_heap.png" | relative_url }})

## Heap Area Structure

힙 영역은 다음의 영역들로 구성됩니다.
1. Young Generation
- Eden,Suvivor(0,1)
    - 최초의 객체는  `Eden`영역에 생성된다. `Eden`영역에 객체가 가득차게되면 첫번째 GC가 일어난다. 가득찬 `Eden`에 있는 Object의 *참조여부를 확인하여 `survivor 0`영역으로 복제시킨다.
    - `survior 0`영역이 가득찬다면 참조여부를 한번 더 확인하여 참조를 받고있는 Object 에한하여 `survivor 1`영역으로 복제한다.이때 `survior 0`영역은 비워지게된다. `survivor`영역은 `Eden`에서 온 Object와 각 `suvivor`에서 온 참조Object 들이 복제되고 `Minor GC`에 의해 해제된다.참고해야할 점은 suvivor 영역은 각 값을 복제하면서 한개의 survivor영역은 항상 비워져있다.  여기서 일정 참조횟수(Ages)에 도달한 Object들은 Old Generation으로 복제된다.

2. Old Generation
- Tenured
    - Young Generation에서 일정 참조횟수(Ages)에 도달했으며, 앞으로 사용될 여지가 있는 Object는 `Tenured`로 메모리할당 된다. Old Generation의 메모리가 충분하지 않으면 Major GC에의해 해제된다.

5. Permanent (JDK1.7 까지 적용)
   이영역은 1.8부터 사라졌으며 이 영역에서 일어나던 행위들은 **`mata space`** 로변경 되었으며,
   `Runtiem Data Area`의 `Native Stack`영역으로 포함되었습니다.

5. *Metaspace

`Metaspace`영역은 Class,Method 등등의 metadata 정보를 저장하는 영역입니다.

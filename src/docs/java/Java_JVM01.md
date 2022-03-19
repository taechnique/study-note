---
layout: post
title: -Java- JVM 01 (Runtime Data Area)
categories: [Development,Java]
tags: [Java]
date: 2021-03-02 14:58:00
profile_image: /assets/blogging/profile/profile2.JPG 
current_company: Cubic Inc
current_position: Web Backend Developer
excerpt_separator: <!--more-->
hide: false
thumbnail: "/assets/blogging/java/jvm01.png"
---
Java JVM내에 Runtime Data Area에 대해 알아보자.
<!--more-->

## Runtime Data Area

자바의 런타임 메모리 구조는 크게 5가지 요소로 구성 되어있다.

![JVM]({{ "/assets/img/bloging/java/jvm01.png" | relative_url }})

### 1. Method area
[**이전 화면**](javascript:history.back())
- `클래스 객체 변수명,자료형,접근제어자 ...`

  ```java
  Kimchi kimchi = new Kimchi();

  public class Kimchi{
    String name = "Kimchi-dev";
  }
  ```  

- `메소드명, 리턴타입, 파라미터, 접근제어자 ...`

  ```java

  private Kimchi getKimchi(Source gochugaru,Baechu baechu){
    return new Kimchi(gochugaru,baechu);
  }

  ```  

- `Type Information(Interface And Class)`
    - package + Class 이름
    - 직계 하위 클레스 전체 이름
    - Class / Interface 여부
    - Modifier (`public`,`abstract`,`final`)
    - 연관된 Interface 이름

- `Constant Pool`
    - Type, Field,Method의 모든 Symbolic Reference 정보를 포함
    - Constant Pool의 Entries는 인덱스를 통해 접근
    - Object 접근 및 모든 참조를 위한 핵심 요소

- `Field Information`
    - Field type
    - Field Access modifier (public, private, protected, static, final, **volatile**,**transient**)

- `Method Information`
    - Method name
    - Method Return Type
    - Method Parameters's Type And Size
    - Method Access Modifier
    - Method Byte Code
    - Method StackFrame's Operand Stack And Local Variable Section Size
    - Exception Table

- `Class Variable`
    - static ketword가 붙은 접근지정자 범위내의 변수
    - 이 변수는 객체소유가 아닌 Class 소유
    - Class 사용하기 이전에 이미 메모리 할당
    - final 변수 의 값을 상수로 치환되어 Constant Pool에 값을 복사한다.

> static 변수는 Methtod Area의 Class Variable에 저장되며, 기본형이 아닌 static 클래스형 변수는 레퍼런스 변수만 저장되고 실제 인스턴스는 Heap에 저장된다. 그 후 인스턴스의 변수를 저장하기 위해 Heap에 메모리 확보가 되고 Heap의 인스턴스가 Method Area의 어느 클래스와 연결되는지 설정한다.

### [Heap area](https://kimchi-dev.github.io/posts/Java_JVM02/#heap-area)
[**이전 화면**](javascript:history.back())
객체가 동적으로 생성될 때 Heap영역으로 메모리를 할당 받는다. new 키워드로 생성된 객체 또는 배열이 할당된다. Method 영역에 로드된 클래스만 생성이 가능하고 Garbage Collector가 unreachable 객체를 제거하여 메모리를 관리하는 영역이다.

### Stack
[**이전 화면**](javascript:history.back())
명령을 수행할 Thread 제어를 위해 사용되는 메모리 영역이다. Thread가 생성될 때 마다 하나씩 생성되며 단일 Thread 당 Method가 호출될 때 메모리를 차지하게 된다. Method가 호출되면 Mehtod정보는 Stack에 쌓이며 호출이 종료되면 Stack에서 제거된다. 저장되는 정보는 매개변수,지역변수,임시변수 Method를 호출한 주소 등을 저장 한다.
- Multi Thread 프로그램의 경우 각 Thread가 자신의 Stack을 가지지만 Heap 영역은 공유하기 때문에, 프로그래밍시에 Thread-safe 하지 않는 이슈에 주의하며 프로그래밍을 해야 한다. 결론적으로 Heap 영역 자체가 Thread-safe 하지 않는 상태이다. Thread-safe 하게 객체를 생성하기 위해서는 Immutable한 객체를 설계하는 것이 좋다.

### PC Register
Thread(쓰레드)가 생성될 때마다 생성되는 영역으로 Program Counter 즉, 현재 쓰레드가 실행되는 부분의 주소와 명령을 저장하고 있는 영역이다. (*CPU의 레지스터와 다름)
이것을 이용해서 쓰레드를 돌아가면서 수행할 수 있게 한다

### Native Method Stacks
[**이전 화면**](javascript:history.back())   
C 또는 C++로 작성된 native 코드를 JNI를 통해 만들어진 Method를 저장하는 영역이다.  

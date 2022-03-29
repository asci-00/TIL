# vue.js study

![NODE][node-url]
![NPM][npm-url]
![VUE][vue-url]
![ESLINT][eslint-url]
![TYPE][typescript-url]

![image](https://user-images.githubusercontent.com/22098393/160514168-acb9242f-3fce-48e0-90f4-f39b7dce4e4f.png)

> Vue.js 공부용 Repository
> 
> 기초부터 하나하나 실습해가며 유의미한 단위로 Repository 에 push

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Lints and fixes files
```
npm run lint
```

## ✔ 실습 목록

- [x] Vue CDN 을 통한 프로젝트
- [x] Global Component & Local Component
- [x] Vue Component data & props property
  - [x] Parent Component props 전달
- [x] Child 에서 Parent 로 event 전달
- [x] Eventbus를 통해 상관관계 없이 event 전달 
- [x] Vue-Router ( Nested Router, Named Router )
- [x] Vue 통신 (Vue-resource, Axios)

- [x] Vue-cli 를 통한 프로젝트 (`typescript` 도 같이 실습)

# 📋 공부 내용

## Vue.js란

> Vue.js는 UI를 개발하기 위한 프로그래시브 프레임워크로 MVVM 디자인 패턴을 사용한다.
> 
> 핵심 라이브러리는 뷰 레이어 (뷰 모델) 만 초점을 맞추어 기존 프로젝트와의 통합이 쉬움

![image](https://user-images.githubusercontent.com/22098393/160514123-060b7298-d415-4713-9ed8-42485bb25cae.png)

## Vue Instance Property

### `el`

### `methods`

- template 에서 호출된 method는 update hook이 발생하면 반드시 재호출됨
  - 종속된 data 변경이 다른 data 속성이 변경되더라도 호출이 발생함

### `data`

### `props`

### `computed`

- 형태는 method와 동일하지만, 반응형 `getter` / `setter`의 기능을 담당
  - _method와의 공통점_
  - data 값이 변경되었을 때, 재호출이 발생
- data 속성의 변화가 있을 때, 이를 감지하고 자동으로 다시 연산을 수행 ( Cashing 기능 존재 )
- computed 는 인자를 전달할 수 없음 / return 이 반드시 존재하여야 함

### `watch`

- computed 와 동일하게 해당하는 data 속성의 변경이 있을 때, 이를 감지하고 특정 동작을 수행
- _computed는 data 속성의 변경으로 인해 해당 data의 연산된 결과를 사용하는 곳이 존재할 때 사용_
  - ex) string이 reverse 된 값을 사용해야 되는 상황
- watch는 data 속성의 변경으로 특정 동작을 부가적으로 수행하는 트리거 기능을 담당
  - ex) update 가 true로 변경될 시, paint() method 를 호출해야 되는 상황 

### `components`

### `template`

### `Life-Cycle method`


## v-directive

> Vue Directive 는 HTML 또는 Component 태그에 v- 접두사를 가지는 모든 속성을 의미함
> 
> v-bind, v-on, v-if, v-show 등이 존재 (사용자 directive를 사용할 수 있음)

| Directive | Note                                                                                                                                          |
|-----------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| v-if      | v-if로 지정된 값의 true / false에 따라 해당 View 를 화면에 표시 / 숨김 여부를 설정                                                                                    |
| v-for     | v-for로 지정된 반복 표현만큼 해당 View를 반복해서 표시                                                                                                           |
| v-show    | v-if 와 유사하게 지정된 값에 따라 View 를 표시하거나 숨기는 역할이지만, false의 경우 View를 DOM에서 삭제하는 v-if 와는 다르게 v-show는 css display property를 none으로 설정하여 화면에 표시하지 않게 만듦 |
| v-bind    | View의 기본 속성에 View data를 바인딩 ( v-bind:property="data" => :property="data )                                                                     |
| v-on      | View의 이벤트를 감지하여 처리할 때 사용 ( v-on:click, v-on:change 등이 존재하며, 사용자 event도 처리 가능 ) ( v-on:click="onClick" => @click="onClick" )                   |
| v-model   | form에서 주로 사용되는 속성으로 사용자가 입력한 값이 View data에 바로 반영되는 양방향 데이터 바인딩을 지원                                                                            |
| v-html    | 보간법 *Interpolation* {{}} (이중 중괄호) 를 사용하여 데이터를 바인딩 할 때, html string을 html element로 출력 시키기 위해 사용                                                |
| v-once | data 바인딩을 최초 1회만 수행하고 data가 변경되더라도 다시 랜더링 하지 않는 View를 만들기 위해 사용                                                                               |

### v-on 을 통한 event handling은 인자를 명시할 수 있음

```vue
<button @click="clickBtn">Click</button>
<script>
...
  methods: {
    clickBtn: () => console.log('click button');
  }
...
</script>
```

```vue
<button @click="clickBtn(10)">Click</button>
<script>
...
  methods: {
    clickBtn: (number) => console.log('click button ' + number);
  }
...
</script>
```

## SFC *Single File Component*

- html 에서 cdn을 사용하여 vue project 를 구성하거나 <br/>여러 component를 하나의 파일에 구현할 경우, 소스가 매우 복잡해지는 문제점이 발생함

```vue
<script>
...
  Vue.component('component', {
    template: `<div><h5>nested markup</h5><ul>...some list markup</ul><button>click me</button>{{bindingData}}</div>`
  });
  Vue.component('component2', {
    template: `...some complex markup`,
  })
...
</script>
```

- 이를 개선하기 위해 하나의 .vue 파일에 독립적으로 뷰 어플리케이션을 구성하여 개발 편의성을 증대시킴

```vue
<template>
<!--  HTML MARKUP -->
</template>
<script>
export default {
//  Javascript Source
}
</script>
<style>
/*CSS Style Content*/
</style>
```

- 또한 Vue Project 구조를 쉽게 구성하기 위해 vue-cli npm package 를 제공
```bash
npm i --global @vue/cli
vue create project-name
```

### 💡 keep-alive

> 컴포넌트가 화면에서 가려진 후 (v-bind:is) 다시 그려지면 create life cycle method 가 호출됨
> 
> 이는 컴포넌트를 다시 create 후, mount하는 과정이 추가적으로 발생되는데,
> 
> ( beforeCreate, created, beforeMount, mounted, beforeDestory, destoryed )
> 
> 이는 성능상의 부하를 가져올 수 있음
> 
> keep-alive를 사용할 시, 해당 컴포넌트가 화면에서 가려져고 다시 그려지는 과정에서
> 
> basic life cycle hook이 호출되지 않고 activated() 와 deactivated() lify cycle hook이 호출 됨
> 
> ( 업데이트 시, beforeUpdate, updated hook은 호출됨 )


[node-url]: https://shields.io/badge/node-v16.13.1-blue?style=for-the-badge
[npm-url]: https://shields.io/badge/npm-8.1.2-BLUE?style=for-the-badge
[vue-url]: https://shields.io/badge/vue.js-v3-blue?style=for-the-badge
[eslint-url]: https://shields.io/badge/eslint-v7.32.0-orange?style=for-the-badge
[typescript-url]: https://shields.io/badge/typescript-4.5.5-orange?style=for-the-badge

# Jest library

> React test library `jest` 사용

---
## Issue

### Module ...path in the testRunner option was not found
> Test Runner 설정이 잘못된 경우
> 
> 일반적으로 설치 시, package.json에서 자동으로 설정되지만 
> 
> git 에 업로드 후, project path가 변경되면서 에러가 발생
> 
> package.json에서 아래 설정을 수정

```json
// package.json
{
  // ...
  "jest": {
    //...
    "testRunner": "{ProjectPath}/node_modules/jest-circus/runner.js"
  }
}
```
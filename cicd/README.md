# CI/CD 

해당 Repository에서는 spring-boot project에서 AWS 와 github를 연동하여 CI/CD를 구축하는 것을 목표로 한다.

> Continuous Integration/Continuous Deployment
> 
> 지속적 통합 / 지속적 배포를 위한 인프라를 의미하며,
> 
> 간단하게 요약하면 빌드+테스트 자동화를 통한 지속적인 배포(서비스 제공)를 의미함
> 
> 다양한 방법이 존재하며 Github와 아마존 AWS를 연동하여 주로 사용함

## 목차
1. CodeCommit으로 소스코드 관리하기
2. S3 bucket으로 서버 파일 관리하기
3. CodeBuild로 코드 빌드하기 ( github에서 push시, 자동으로 빌드 )
4. CodeDeploy를 통해 코드 배포하기
5. CodePipeline를 활용하여 배포 자동화 하기


---
## 📃 CodeCommit

> *뛰어난 확장성의 private git repository를 안전하게 호스팅*
> 
> -amazon aws-
> 
> Git Repository를 활용하여 소스코드를 관리해주는 AWS 서비스로
> 
> 지금까지 코드의 관리를 위해서 github 또는 gitlab을 사용해왔는데,
> 
> 이는 주로 오픈소스 프로젝트일 경우이며, 현업에서 대형 프로젝트를 진행할 때는 
> 
> 일반적으로 Atlassian의 Bitbucket을 이용하며, 이는 보안적인 측면에서 전자보다 유리한 성능을 보인다.
> 
> CodeCommit의 경우는 코드를 AWS의 s3에 암호화 하여 저장하며 안정성이 뛰어나다.

*월 활성 접속계정 5개 이하 / 계정 당 요청 횟수 2000번 이하는 무료*

이번 실습에서는 굳이 CodeCommit을 사용할 이유가 없으므로<br/>
 github를 사용하여 코드를 관리하며 학습은 AWS 링크로 대체한다.
 
 [CodeCommit](https://aws.amazon.com/ko/codecommit/)
 
---
## 📃 S3

> *어디서나 원하는 데이터를 검색할 수 있도록 구축된 스토리지*
> 
> -amazon aws-
> 
> simple storage service의 약자로 파일서버 트래픽 증가에 유연하게 대처할 수 있는 서비스이다.

- 많은 사용자 접속 감당
- 저장할 수 있는 파일 개수 제한 無
- 1BYTE - 5TB 데이터 저장 서비스
- REST, SOAP Interface 지원


| 용어 | 설명 |
| --- | --- |
| `Object` | S3에 저장된 각 데이터를 객체라고 명명 - 하나의 파일 |
| `Bucket` | 연관된 객체들을 Grouping한 최상위 디렉토리 <br/>버킷 단위로 지역 region을 지정 가능 <br/>버킷 단위로 인증과 접속 제한을 걸 수 있음 |
| `Version controll` | S3는 객체들의 변화를 저장함 (사용자 실수로 인해 데이터가 손실돼도 대부분 복구 가능) |
| `RSS` | *Reduced Redundancy Storage*의 약자로 S3객체에 비해 데이터 손실이 높음 But, 물리적 하드에 비해 400배 가량 안전 |
| `Glacier` | 저렴한 가격으로 데이터를 저장할 수 있는 아마존 storage service |

[S3 Bucket Create](https://s3.console.aws.amazon.com/s3/buckets)

### 버킷 생성

- 버킷 이름 - [버킷 이름 규칙](https://docs.aws.amazon.com/AmazonS3/latest/userguide/bucketnamingrules.html)을 참조하여 고유하게 작성
- 객체 소유권 - 본인 계정 뿐 아니라 ACL을 통해 다른 AWS계정이 객체를 소유할 수 있음
- 버킷 엑세스 차단 설정 - 버킷에 접근할 수 있는 권한 부여
- 버킷 버전 관리 - 활성화시, 모든 객체의 각 버전을 보존, 검색및 복원이 가능
- 기본 암호화 - 비활성화/활성화 여부

---
## 📃 CodeBuild

> *소스 코드를 컴파일하는 단계부터 테스트 실행 후 소프트웨어 패키지를 
> 
> 개발하여 배포하는 단계까지 마칠 수 있는 완전관리형의 지속적 통합 서비스*
> 
> -amazon aws-
> 
> 코드를 가져와 테스트 / 빌드과정을 자동화한다.

- 코드는 Github, AWS CodeCommit, CodePipeline, S3등에서 수집할 수 있음
- 빌드 결과는 S3 또는 CloudWatch Logs에 저장 가능
- `buildspec.yml` 파일을 통해 빌드 수행
  - 보통 코드의 root경로에 위치
  - 빌드할 대상에 따라 설정이 상이
  - 아래는 간단한 front-end 배포 설정 파일 예시

```yml
// vue.js buildspec.yml
version: 0.1

phases:
  install:
    commands:
      - npm install -g yarn
  pre_build:
    commands:
      - yarn install
  build:
    commands:
      - yarn build
  post_build:
    commands:
      - echo nothing to do
artifacts:
  files:
    - '**/*'
  base-directory: dist
```

> root property로 env, batch, phases, reports 등이 존재함
> 
> 이 중 phase 부분이 빌드의 각 단계에서 실행할 동작들을 설정함
> 
> - `install` runtime을 포함한 dependency를 설치 (ex. node 와 node_modules 설치)
> - `pre_build` 빌드를 수행하기 전 최종으로 수행해야할 동작
> - `build` 실제 빌드 혹은 테스트 동작을 정의
> - `post_build` 빌드가 끝나고 마무리하는 동작을 정의 (ex. zip으로 압축)
> 
> artifacts는 작업의 결과물을 처리하는 것으로 
> 
> 일반적으로 CodeBuild는 docker 기반 container으로 동작하기 때문에 
> 
> 모든 과정이 끝나면 해당 container가 종료되면서 사라진다.
> 
> 즉, 파일로 남는 결과물이 없기 때문에, 완료된 작업물을 저장할 곳이 필요한데,
> 
> 일반적으로 s3에 업로드할 수 있다.


![image](https://user-images.githubusercontent.com/22098393/169807695-4a08e184-f1a2-43fe-810c-b815c4237c44.png)

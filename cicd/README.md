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

> *디서나 원하는 데이터를 검색할 수 있도록 구축된 스토리지*
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


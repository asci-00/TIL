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
## CodeCommit

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

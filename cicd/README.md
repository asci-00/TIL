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
# Spring boot

### 목차

- IoC
- AOP
- PSA

## 🔎 IoC _Inversion of Control_

> 제어의 역전

- 일반적인 제어권: 개발자가 외부 라이브러리를 사용하여 코드를 작성
- Spring: spring 프레임워크에서 개발자가 만든 코드를 사용
- 중요한 점은 Bean을 어떻게 등록하는지, Bean으로 등록된 class가 어떻게 주입되는지다.

```java
// 일반적인 의존성
class OwnerController {
  private OwnerRepository repository = new OwnerRepository();
  // user repository
}
```

```java
class OwnerController {
  private OwnerRepository repo;
  public OwnerController(OwnerRepository repo) { this.repo = repo; }
  // use repository
}
class OwnerControllerTest {
  @Test
  public void create() {
    OwnerRepository repo = new OwnerRepository();
    OwnerController controller = new OwnerController(repo);
  }
}
```

### Spring의 IoC

> Annotation과 Component Scanning 알고리즘을 통해 IoC를 지원한다.

### `Bean`

> Spring IoC Container가 관리하는 객체
>
> Bean Annotation이 설정된 Class는 Bean으로 등록되어 IoC Container 내부에서 생성하고 의존성을 관리함

### ❓ 등록하는 방법은?

1. Component Scanning

```markdown
Spring boot 의 경우는
@SpringBootApplication ( @ComponentScan Annotation 사용 ) 의 하위 class 중,
@Component (or 상속받은) Annotation을 가진 class를 Bean으로 등록함
```

2. 직접 XML or Java config file 설정

```markdown
@Configuration Annotation 을 가진 class에서
@Bean Annotation 을 가진 Bean을 등록할 수 있음
```

```java
// Configuration.js

@SpringBootApplication // SpringBootApplication은 Configuration annotation을 가짐
public class PetClinicApplication {
  @Bean
  public String testBean() {
    return "bean regist";
  }

  public static void main ...
}

// Controller.js

@RestController
public class Controller {
  @Autowired
  String testBean;

  @GetMapping("/bean")
  public String context() {
    return testBean;
  }
}
```

3. Spring lify cycle을 이용한 방식

> Spring data jpa 을 사용하여 lify cycle callback 구현하게 되면,
>
> Spring lify cycle에서 해당 interface 를 자동으로 Bean으로 등록함

```java
public interface OwnerRepository extends Repository<Owner, Integer> { ... }
```

Bean class에 생성자가 1개만 존재하며, 매개변수 type 이 Bean이라면 주입 (Authwired 생략 가능 - 원래 생성자 위에 annotaion이 붙어야 했음)

### `ApplicationContext` IoC Container

> spring 내부적으로 Bean 들을 관리해줌
>
> 일반적으로 직접 객체를 사용할 일이 없지만, 이전에 사용했던 방식으로
>
> `@Authwired`를 통해 ApplicationContext 객체를 만들어 IoC Container를 직접 관리할 수 있음

```java
...
@RestController
public class Controller {
  @Autowired
  ApplicationContext appContext;

  // @Autowired
  // BeanType beanName;
  // 이런식으로 바로 사용도 가능

  @GetMapping("/bean")
  public String context() {
    return appContext.getBean(OwnerPrepository.class);
  }
}
...
```

### Dependency Injection

> 필요한 의존성은 어떻게 받아올 수 있을까?

```markdown
위에서 설명한 바와 같이 @Autowired와 @Inject를 통해 의존성을 주입할 수 있다.
크게 생성자, 필드, Setter에 Annotation을 붙일 수 있다.
(최우선 생성자, 되도록이면 Setter , Setter가 없다면 필드 - Setter가 필요 없다면 굳이 생성할 필요는 없음)
```

- Java에서는 Bean을 자동으로 생성해서 해당 Bean으로 등록된 class 타입을 사용하는곳에 인스턴스를 생성해서 자동으로 주입해줌
- (@Autowired나 @Inject를 사용하여 명시적으로 주입할 수 있으며, 생성자, Setter, 필드에 주입한다.)
- 그런데 여기서 의문점은 순환으로 참조하면 어떻게 되는가??
- Bean으로 등록된 class의 Instance를 생성할 때, 생성자의 인자는 어떻게 처리하는가??


## 🔎 AOP _Aspect Oriented Programming_

> 관점 지향 프로그래밍

-  코드들을 부분적으로 나누어서 모듈화
-  코드상에서 계속 반복해서 쓰는 코드들을 발견할 수 있는 데 이것을 흩어진 관심사 *Crosscutting Concerns*라고 함

```java
class A {
  public void aMethod() {
    doSomthing1();
    /* aMethod logic */
    doSomthing2();
  }
  public void bMethod() {
    doSomthing1();
    /* bMethod logic */
    doSomthing2();
  }
}
class B {
  public void cMethod() {
    doSomthing1();
    /* cMethod logic */
    doSomthing2();
  }
}
```

-  ex) DB작업: auto commit false 전환, 작업(특정 로직), 작업을 마친 후 commit 하는 작업 (petclinic의 @Transactional)

### 사용방법

```java
// Annotation
@target(ElementType.METHOD) // 대상 : Method
@Retention(RetentionPolicy.RUNTIME) // 유효범위 : 런타임
public @interafce LogExecutionTime{ }
```

```java
// 구현체
@Component
@Aspect
public class LogAspect {
  @Around("@annotation(LogExecutionTIme)")
  Logger logger = LoggerFactory.getLogoger(LogAspect.class);
  
  public Object logExecutionTIme(ProceedingJoinPoint joinPoint) throws Throwable {
    StopWatch stopWatch = new StopWatch();
    stopWatch.start();
    
    Object ret = joinPoint.proceed();
    
    stopWatch.stop();
    logger.info(stopWatch.prettyPrint());
    
    return ret;
  }
}
```

```java
// 사용
public class Controller {
  @LogExecutionTime
  public void method() { 
    //method logic
  }
}
```

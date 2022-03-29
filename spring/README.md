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

### ❓ Bean 등록하는 방법은?

1. `Component Scanning`

```markdown
Spring boot 의 경우는
@SpringBootApplication ( @ComponentScan Annotation 사용 ) 의 하위 class 중,
@Component (or 상속받은) Annotation을 가진 class를 Spring container에 Bean으로 등록
```

2. `@Bean`

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

3. `xml config file`

> XML에서 수동으로 Bean 등록이 가능

```xml
<bean id="person" class="패키지명.Person" />

<bean id="group" class="패키지명.Gourp" >
<property name="(set을뺀 메서드명)" >
    <ref bean="person" />
    또는
    <bean class="패키지명.Person" />
</property>
또는
<property name="(set을뺀 메서드명)" ref="person" />
</bean>
```

3. `Spring lify cycle`을 이용

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

### ❓ Bean 주입 방법은? _Dependency Injection_

> 필요한 의존성은 어떻게 받아올 수 있을까?

1. 생성자 사용

```java
@Controller
public class UserController {
    private UserDAO userDAO;
    UserController(UserDAO userDAO) { // 단일 생성자의 경우 @Autowired 불필요
        this.userDAO = userDAO;
    }
} 
```

2. Setter method 사용

```java
@Controller
public class UserController {
    private UserDAO userDAO;
    
    @Autowired
    public void setUserDAO(UserDAO userDAO) {
        this.userDAO = userDAO;
    }
} 
```

3. Field 사용

```java
@Controller
public class UserController {
    @Autowired
    private UserDAO userDAO;
} 
```

- 권장 ( 생성자 > Setter > Field )

- 생성자 주입 방식은 `순환참조`를 방지한다.
    - compile 과정에서 `BeanCurrentlyInCreationException` 에러 발생
    - Field와 Setter 방식은 runtime 에서 `StackOverflowError` 에러 발생

- 의존주입을 위한 Annotation으로는 @Autowired @Inject @Resource 가 있으며, @Autowired가 주로 사용됨 ([차이점](https://withseungryu.tistory.com/65))
- Bean은 수정되지 않는 class를 대상으로 등록되어야 하며, 기본적으로 Singleton 방식이다. ([참조](https://velog.io/@gillog/Spring-Bean-%EC%A0%95%EB%A6%AC))
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
@Aspect // 구현
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

## 🔎 PSA _Portable Service Abstraction_

> 환경의 변화와 관계없이 일관된 방식의 접근을 제공하는 고도로 추상화된 기술
> 
> Spring은 POJO 원칙을 엄격히 지킨 PSA 형태의 추상화를 지원
> 
> 한 마디로, 잘 만든 인터페이스를 의미

### `PlatformTransactionManager`

```java
public interface OwnerRepository extends Repository<Owner, Integer> {
  @Transactional(readOnly = true)
  Collection<Ower> findByLastName(@Param("lastName") String lastName);
  
  @Transactional(readOnly = true)
  ...
}
```
- @Transactional annotaion은 많은 구현체가 있음
- 자동으로 Jpa를 사용하게 되면 JpaTransactionManager가 자동으로 등록이 됨
- Transaction을 처리하는 Aspect는 Bean이 바뀌더라도 코드는 바뀌지 않음

### `Cacheable`

- @EnableCaching 을 통해 캐시를 활성화함
- 캐시 종류에 따라 Manager를 커스터마이징함
- ex) `JCacheManager` `ConcurrentMapChcheManager` `EhCacheCacheManager`

```java

@EnableCaching
@Profile("production")
class CacheConfig {
  @Bean
  public JCacheManagerCustomizer cacheManagerCustomizer() {
      return cm -> {
        COnfiguration<Object, Object> cacheConfiguration; //...
        cm.createCache("vets", cacheConfiguration);
      };
  }
  private Configuration<Object, Object> createCacheConfiguration() {
      //...
  }
  //...
}
```

### Spring MVC

> Spring에서 @Controller @RequestMapping ... 등의 코드는
> 
> `Servlet` `Reactive` 에 따라 접근 방식이 바뀌지 않고 일관되게 유지됨
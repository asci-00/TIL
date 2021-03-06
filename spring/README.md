# Spring

### ๋ชฉ์ฐจ

- [IoC](https://github.com/asci-00/TIL/tree/main/spring#-ioc-inversion-of-control)
- [AOP](https://github.com/asci-00/TIL/tree/main/spring#-aop-aspect-oriented-programming)
- [PSA](https://github.com/asci-00/TIL/tree/main/spring#-psa-portable-service-abstraction)

## ๐ IoC _Inversion of Control_

> ์ ์ด์ ์ญ์ 

- ์ผ๋ฐ์ ์ธ ์ ์ด๊ถ: ๊ฐ๋ฐ์๊ฐ ์ธ๋ถ ๋ผ์ด๋ธ๋ฌ๋ฆฌ๋ฅผ ์ฌ์ฉํ์ฌ ์ฝ๋๋ฅผ ์์ฑ
- Spring: spring ํ๋ ์์ํฌ์์ ๊ฐ๋ฐ์๊ฐ ๋ง๋  ์ฝ๋๋ฅผ ์ฌ์ฉ
- ์ค์ํ ์ ์ Bean์ ์ด๋ป๊ฒ ๋ฑ๋กํ๋์ง, Bean์ผ๋ก ๋ฑ๋ก๋ class๊ฐ ์ด๋ป๊ฒ ์ฃผ์๋๋์ง๋ค.

```java
// ์ผ๋ฐ์ ์ธ ์์กด์ฑ
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

### Spring์ IoC

> Annotation๊ณผ Component Scanning ์๊ณ ๋ฆฌ์ฆ์ ํตํด IoC๋ฅผ ์ง์ํ๋ค.
> 
> IoC์ ๊ฐ์ฅ ํต์ฌ์ ์ธ ๊ธฐ๋ฅ์ ํ๋ ์ธํฐํ์ด์ค๋ `BeanFactory` (IoC Container) ์ด๋ค.
> 

### `Bean`

- Spring IoC Container๊ฐ ๊ด๋ฆฌํ๋ ๊ฐ์ฒด 
- Bean Annotation์ด ์ค์ ๋ Class๋ Bean์ผ๋ก ๋ฑ๋ก๋์ด IoC Container ๋ด๋ถ์์ ์์ฑํ๊ณ  ์์กด์ฑ์ ๊ด๋ฆฌํจ 
- Bean์ ๊ธฐ๋ณธ์ ์ผ๋ก Singleton Scope๋ก ์์ฑ๋๋ค. ( ํ๋กํ ํ์๊ณผ ์๋ฐ๋ ๊ฐ๋ - [์ฐธ์กฐ](https://velog.io/@gillog/Spring-Bean-%EC%A0%95%EB%A6%AC) )
- Bean์ ๋ด๋ถ property๊ฐ ์์ ๋์ง ์๋ Utility class๋ฅผ ๋์์ผ๋ก ๋ฑ๋ก๋์ด์ผ ํ๋ฉฐ, (Thread-safe) ํน์  ์ธ์์ ์์กด์ ์ด์ง ์์์ผ ํ๋ค.

```java
// Proto.java - Prototype Bean
@Component @Scope("prototype")
public class Proto { }

// Single.java - Singleton Bean
@Component
public class Single { }
```

```java
// DemoApplication.java
public class DemoApplication {
    @Autowired
    ApplicationContext ctx;
    
  public static void main(String[] args) {
    System.out.println("Proto > ");

    System.out.println(ctx.getBean(Proto.class)); // package.Proto@57435801
    System.out.println(ctx.getBean(Proto.class)); // package.Proto@2da66a44
    System.out.println(ctx.getBean(Proto.class)); // package.Proto@527fc8e   
    
    System.out.println("Single > ");

    System.out.println(ctx.getBean(Single.class)); // package.Single@61bfc9bf
    System.out.println(ctx.getBean(Single.class)); // package.Single@61bfc9bf
    System.out.println(ctx.getBean(Single.class)); // package.Single@61bfc9bf    
  }
}
```

- ๋ํ์ ์ธ Prototype Bean์ Request Session WebSocket์ด ์๋ค.
- Prototype Bean ๋ด๋ถ์์๋ Singleton Bean์ ์ฌ์ฉํด๋ ๋จ
- Singleton Bean ๋ด๋ถ์์ Prototype Bean์ ์ฌ์ฉํ๊ฒ ๋๋ฉด, ๋ด๋ถ ๊ฐ์ด ๊ณ์ํด์ ๊ฐ์ ๊ฐ๋ง ์ฐธ์กฐํ๋ฏ๋ก, ์ถ๊ฐ์ ์ธ ์ค์  ํ์

1. ProxyMode ์ฌ์ฉ

```java
// Proto.java
// Proto๋ฅผ Proxy๋ก ๋ง๋ค์ด์ฃผ๊ณ , Bean์ด Proxy Bean์ผ๋ก ๋ฑ๋ก๋จ
@Component @Scope(value = "prototype", proxyMode = ScopedProxyMode.TARGET_CLASS) 
public class Proto { }

// Single.java - Singleton Bean
@Component
public class Single {
  @Autowired
  private Proto proto;
  public Proto getProto() { return proto; }
}

// DemoApplication.java
public class DemoApplication {
  @Autowired
  ApplicationContext ctx;

  public static void main(String[] args) {
    System.out.println("Proto > ");

    System.out.println(ctx.getBean(Proto.class)); // package.Proto@57435801
    System.out.println(ctx.getBean(Proto.class)); // package.Proto@2da66a44
    System.out.println(ctx.getBean(Proto.class)); // package.Proto@527fc8e   

    System.out.println("Single > ");

    System.out.println(ctx.getBean(Single.class).getProto()); // package.Proto@37425101
    System.out.println(ctx.getBean(Single.class).getProto()); // package.Proto@7dc6aa44
    System.out.println(ctx.getBean(Single.class).getProto()); // package.Proto@f2fff8e    
  }
}
```

2. Object-Provider ์ฌ์ฉ

```java
// Proto.java
@Component @Scope("prototype") 
public class Proto { }

// Single.java
@Component
public class Single {
  @Autowired
  private ObjectProvider<Proto> proto;
  
  public Proto getProto() { return proto.getIfVailable(); }
}
```

3. Scoped-proxy

### โ Bean ๋ฑ๋กํ๋ ๋ฐฉ๋ฒ์?

1. `Component Scanning`

```markdown
- Spring boot -
@SpringBootApplication ( @ComponentScan Annotation ์ฌ์ฉ )๋ฅผ ์์์ ์ผ๋ก, ๋์ผ ํจํค์ง์ ์๋ 
@Component (or ์์๋ฐ์) Annotation์ ๊ฐ์ง class๋ฅผ Spring container์ Bean์ผ๋ก ๋ฑ๋ก
๋ฐ๋ก ๋ฑ๋ก์ ํ์ง ์์ผ๋ฉด, Aํจํค์ง์์ Bํจํค์ง์ Bean์ @Autowired ํ  ์ ์๋ค.
```

```java
// Component Scanning ์ ์ํ SpringBootApplication Annotation
// @ComponentScan์ @Component annotation์ Bean์ผ๋ก ๋ฑ๋ก
// - ์ค์  ์ค์บ๋์ ConfigurationClassPostProcessor, BeanFactoryPostProcessor์ ์ํด ์ฒ๋ฆฌ๋จ
@Target(value = {ElementType.TYPE})
@Retention(value = RetentionPolicy.RUNTIME)
@Documented
@Inherited
@SpringBootConfiguration
@EnableAutoConfiguration
@ComponentScan(excludeFilters = {   // excludeFilters์ ์ค์ ๋ filter ๋ฅผ ํตํด Bean๋ฑ๋ก์ ์ ์ธ์ํด
        @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {TypeExcludeFilter.class}),
        @ComponentScan.Filter(type = FilterType.CUSTOM, classes = {AutoConfigurationExcludeFilter.class})})
public @interface SpringBootApplication {

  @AliasFor(annotation = EnableAutoConfiguration.class)
  public Class<?>[] exclude() default {};

  @AliasFor(annotation = EnableAutoConfiguration.class)
  public String[] excludeName() default {};

  @AliasFor(annotation = ComponentScan.class, attribute = "basePackages")
  public String[] scanBasePackages() default {};

  @AliasFor(annotation = ComponentScan.class, attribute = "basePackageClasses")
  public Class<?>[] scanBasePackageClasses() default {};

  @AliasFor(annotation = ComponentScan.class, attribute = "nameGenerator")
  public Class<? extends BeanNameGenerator> nameGenerator() default BeanNameGenerator.class;

  @AliasFor(annotation = Configuration.class)
  public boolean proxyBeanMethods() default true;
}
```


2. `@Bean`

```markdown
@Configuration Annotation ์ ๊ฐ์ง class์์
@Bean Annotation ์ ๊ฐ์ง Bean์ ๋ฑ๋กํ  ์ ์์
```

```java
// Configuration.js

@SpringBootApplication // SpringBootApplication์ Configuration annotation์ ๊ฐ์ง
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

> XML์์ ์๋์ผ๋ก Bean ๋ฑ๋ก์ด ๊ฐ๋ฅ

์๋์ผ๋ก Bean ๋ฑ๋ก ๋ฐ DI
```xml
<!--application.xml-->
<?xml version="1.0" encoding="UTF-8"?>
<bean id="person" class="ํจํค์ง๋ช.Person" />

<bean id="group" class="ํจํค์ง๋ช.Gourp" >
  <property name="(set์๋บ ๋ฉ์๋๋ช)" >
      <ref bean="person" />
      <!--  or <bean class="ํจํค์ง๋ช.Person" />-->
  </property>
  <!-- or <property name="(set์๋บ ๋ฉ์๋๋ช)" ref="person" />-->
</bean>
```

```java
public class DemoApplication {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("application.xml");
        Strings[] beanDefinitionNames = context.getBeanDefinitionNames();
        System.out.println(Arrays.toString(beanDefinitionNames)); // Bean ๋ค์ ๋ชฉ๋ก์ด ์ถ๋ ฅ๋จ
    }
}
```

๊ฐ์ ๋ ๋ฐฉ๋ฒ - component scan
```xml
<!--application.xml-->
<?xml version="1.0" encoding="UTF-8"?>
<bean xmlns="...">
  <context:component-scan base-package="package๋ช"/>
</bean>
```

4. Function์ ์ฌ์ฉ

> ์ด๊ธฐ ๊ตฌ๋ ์๊ฐ์ ์ ๋ฆฌํจ

```java
@SpringBootApplication
public class DemoSpringApplication {
    @Autowired
    Serivce service;
    public static void main(String[] args) {
        var app = new SpringApplication(DemoSpringApplication.class);
        app.addInitializers((ApplicationContextInitializer<GenericApplicationContext>) ctx -> {
            // Bean์ ํน์  ๋ก์ง์ ์ํํ์ฌ ๋ฑ๋กํ  ์ ์์
          ctx.registerBean(Service.class);
          ctx.registerBean(ApplicationRunner.class, () -> args1 -> System.out.println("Functional Bean Definition!"));
        });
        app.run(args);
    }
}
```

### `ApplicationContext` IoC Container

> spring ๋ด๋ถ์ ์ผ๋ก Bean ๋ค์ ๊ด๋ฆฌํด์ค ( BeanFactory ๋ฅผ ์์๋ฐ์ )
>
> ์ผ๋ฐ์ ์ผ๋ก ์ง์  ๊ฐ์ฒด๋ฅผ ์ฌ์ฉํ  ์ผ์ด ์์ง๋ง, ์ด์ ์ ์ฌ์ฉํ๋ ๋ฐฉ์์ผ๋ก
>
> `@Authwired`๋ฅผ ํตํด ApplicationContext ๊ฐ์ฒด๋ฅผ ๋ง๋ค์ด IoC Container๋ฅผ ์ง์  ๊ด๋ฆฌํ  ์ ์์

```java
...
@RestController
public class Controller {
    @Autowired
    ApplicationContext appContext;

    // @Autowired
    // BeanType beanName;
    // ์ด๋ฐ์์ผ๋ก ๋ฐ๋ก ์ฌ์ฉ๋ ๊ฐ๋ฅ

    @GetMapping("/bean")
    public String context() {
        return appContext.getBean(OwnerPrepository.class);
    }
}
...
```

### โ Bean ์ฃผ์ ๋ฐฉ๋ฒ์? _Dependency Injection_

> ํ์ํ ์์กด์ฑ์ ์ด๋ป๊ฒ ๋ฐ์์ฌ ์ ์์๊น?

1. ์์ฑ์ ์ฌ์ฉ

```java
@Controller
public class UserController {
    private UserDAO userDAO;
    UserController(UserDAO userDAO) { // ๋จ์ผ ์์ฑ์์ ๊ฒฝ์ฐ @Autowired ๋ถํ์
        this.userDAO = userDAO;
    }
} 
```

2. Setter method ์ฌ์ฉ

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

3. Field ์ฌ์ฉ

```java
@Controller
public class UserController {
    @Autowired
    private UserDAO userDAO;
} 
```

- ๊ถ์ฅ ( ์์ฑ์ > Setter > Field )

- ์์ฑ์ ์ฃผ์ ๋ฐฉ์์ `์ํ์ฐธ์กฐ`๋ฅผ ๋ฐฉ์งํ๋ค.
    - compile ๊ณผ์ ์์ `BeanCurrentlyInCreationException` ์๋ฌ ๋ฐ์
    - Field์ Setter ๋ฐฉ์์ runtime ์์ `StackOverflowError` ์๋ฌ ๋ฐ์

- ์์กด์ฃผ์์ ์ํ Annotation์ผ๋ก๋ @Autowired @Inject @Resource ๊ฐ ์์ผ๋ฉฐ, @Autowired๊ฐ ์ฃผ๋ก ์ฌ์ฉ๋จ ([์ฐจ์ด์ ](https://withseungryu.tistory.com/65))

### `@Autowired`

- @Autowired๋ก ์ฃผ์ํ  ์, ํด๋น Type์ Bean์ด ์๋ ๊ฒฝ์ฐ 
  - Error ๋ฐ์
  - ํด๊ฒฐ๋ฐฉ๋ฒ
    - @Autowired(require = false) ์ต์์ ๋ณ๊ฒฝํ๋ฉด, Error๋ฅผ ๋ฐ์์ํค์ง ์๊ณ , ์ฃผ์ํ  Bean์ด ์๋ ๊ฒฝ์ฐ, ์ฃผ์ํ์ง ์์ 
- ์ฃผ์ํ๋ ค๋ ํ๊ฒ์ Type์ ๊ฐ์ง๋ Bean์ด 2๊ฐ ์ด์์ผ ๊ฒฝ์ฐ
  - ex) Repository ๋ฅผ ์์๋ฐ๋ FirstRepository, SecondRepository ๊ฐ ์กด์ฌํ๋ฉฐ, Repository Type์ ์ฃผ์๋ฐ๋ ๊ฒฝ์ฐ
  - Error ๋ฐ์
  - ํด๊ฒฐ๋ฐฉ๋ฒ
```java
// ์ฃผ์ํ๊ณ ์ ํ๋ Bean์ @Primary annotation ์ถ๊ฐ
@Repository @Primary
public class OneRepository implements Repository { }
```

```java
// ์ฃผ์๋ฐ๋ ๊ณณ์์ @Qualifier๋ฅผ ํตํด ์ด๋ class๋ฅผ ์ฃผ์๋ฐ์ ๊ฒ์ธ์ง ์ ํ
@Service
public class Service {
  @Autowired @Qualifier("OneRepository")
  Repository repository;
}
```

```java
// ์ฃผ์๋ฐ๊ณ ์ ํ๋ class์ ์ด๋ฆ์ instance ๋ช์ผ๋ก ์ฌ์ฉ
@Service
public class Service {
  @Autowired
  Repository oneRepository;
}

```

```java
// ์ฃผ์๋ฐ์ ๋, List ํํ๋ก ์ฃผ์์ ๋ฐ์ ๋ชจ๋  class๋ฅผ ์ฃผ์๋ฐ์
@Service
public class Service {
  @Autowired
  List<Repository> repositoryList;
}
```

### Bean์ lifecycle interface

- LifeCycle interface๋ฅผ ํตํด ์์ฑ / ์์กด์ฑ ์ฃผ์ ๋ฑ์ ๊ด์ฌํ  ์ ์๋ค.

| Interface            | Type       | Step    | Description                                               |
|----------------------|------------|---------|-----------------------------------------------------------|
| @PostConstruct       | Annotation | Create  | Bean ์ด๊ธฐํ์ ์ฌ์ฉํ  method๋ฅผ ์ง์                                   |
| @Bean(initMethod)    | Annotation | Create  | Bean annotation์ initMethod๋ฅผ ์ง์                            |
| InitializingBean     | Interface  | Create  | ํด๋น Bean์ Create ๋์์ overriding ( Spring framework์ ์ข์๋จ )  |
| @PreDestory          | Annotation | Destory | method ์ ์ธ๋ถ์ annotation ์ถ๊ฐ                                 | 
| @Bean(destoryMethod) | Annotation | Destory | Bean annotation์ destoryMethod๋ฅผ ์ง์                         |
| DisposableBean       | Interface | Destory | ํด๋น Bean์ Destory ๋์์ overriding ( Spring framework์ ์ข์๋จ ) |

### Environment [Source](https://github.com/asci-00/spring-basic/blob/main/src/main/java/com/example/springboot/AppRunner.java)
> ApplicationContext extends EnvironmentCapable 
> 
> Environment์ Profile ๊ธฐ๋ฅ์ Bean ์ ๊ทธ๋ฃนํํจ ( ํ๊ฒฝ์ ๋ฐ๋ฅธ Bean ์ ํ )
> 
> ๋ํ ์ธ๋ถ properties ํ์ผ์ ํ๊ฒฝ๋ณ์๋ก ์ฌ์ฉ ๊ฐ๋ฅ


## ๐ AOP _Aspect Oriented Programming_


> ๊ด์  ์งํฅ ํ๋ก๊ทธ๋๋ฐ

-  ์ฝ๋๋ค์ ๋ถ๋ถ์ ์ผ๋ก ๋๋์ด์ ๋ชจ๋ํ
-  ์ฝ๋์์์ ๊ณ์ ๋ฐ๋ณตํด์ ์ฐ๋ ์ฝ๋๋ค์ ๋ฐ๊ฒฌํ  ์ ์๋ ๋ฐ ์ด๊ฒ์ ํฉ์ด์ง ๊ด์ฌ์ฌ *Crosscutting Concerns*๋ผ๊ณ  ํจ

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

-  ex) DB์์: auto commit false ์ ํ, ์์(ํน์  ๋ก์ง), ์์์ ๋ง์น ํ commit ํ๋ ์์ (petclinic์ @Transactional)

### ์ฌ์ฉ๋ฐฉ๋ฒ

```java
// Annotation
@target(ElementType.METHOD) // ๋์ : Method
@Retention(RetentionPolicy.RUNTIME) // ์ ํจ๋ฒ์ : ๋ฐํ์
public @interafce LogExecutionTime{ }
```

```java
// ๊ตฌํ์ฒด
@Component
@Aspect // ๊ตฌํ
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
// ์ฌ์ฉ
public class Controller {
    @LogExecutionTime
    public void method() {
        //method logic
    }
}
```

## ๐ PSA _Portable Service Abstraction_

> ํ๊ฒฝ์ ๋ณํ์ ๊ด๊ณ์์ด ์ผ๊ด๋ ๋ฐฉ์์ ์ ๊ทผ์ ์ ๊ณตํ๋ ๊ณ ๋๋ก ์ถ์ํ๋ ๊ธฐ์ 
> 
> Spring์ POJO ์์น์ ์๊ฒฉํ ์งํจ PSA ํํ์ ์ถ์ํ๋ฅผ ์ง์
> 
> ํ ๋ง๋๋ก, ์ ๋ง๋  ์ธํฐํ์ด์ค๋ฅผ ์๋ฏธ

### `PlatformTransactionManager`

```java
public interface OwnerRepository extends Repository<Owner, Integer> {
  @Transactional(readOnly = true)
  Collection<Ower> findByLastName(@Param("lastName") String lastName);
  
  @Transactional(readOnly = true)
  // db logic
}
```
- @Transactional annotaion์ ๋ง์ ๊ตฌํ์ฒด๊ฐ ์์
- ์๋์ผ๋ก Jpa๋ฅผ ์ฌ์ฉํ๊ฒ ๋๋ฉด JpaTransactionManager๊ฐ ์๋์ผ๋ก ๋ฑ๋ก์ด ๋จ
- Transaction์ ์ฒ๋ฆฌํ๋ Aspect๋ Bean์ด ๋ฐ๋๋๋ผ๋ ์ฝ๋๋ ๋ฐ๋์ง ์์

### `Cacheable`

- @EnableCaching ์ ํตํด ์บ์๋ฅผ ํ์ฑํํจ
- ์บ์ ์ข๋ฅ์ ๋ฐ๋ผ Manager๋ฅผ ์ปค์คํฐ๋ง์ด์งํจ
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

> Spring์์ @Controller @RequestMapping ... ๋ฑ์ ์ฝ๋๋
> 
> `Servlet` `Reactive` ์ ๋ฐ๋ผ ์ ๊ทผ ๋ฐฉ์์ด ๋ฐ๋์ง ์๊ณ  ์ผ๊ด๋๊ฒ ์ ์ง๋จ
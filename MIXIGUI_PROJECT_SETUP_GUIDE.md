# HUONG DAN KHOI TAO DU AN MIXIGUI

## THONG TIN DU AN

| Thuoc tinh | Gia tri |
|------------|---------|
| Ten du an | MIXIGUI - Website Day Dan Online |
| Kien truc | Modular Monolith |
| Backend | Spring Boot 3.4.x (Java 21) |
| Frontend | Next.js 15 (App Router) |
| Database | Supabase (PostgreSQL) |
| IDE | Visual Studio Code |
| Java Version | JDK 21 |
| OS | Windows 10 |
| Mo hinh quan tri | Single Admin (1 admin quan ly toan bo) |

---

## MUC LUC

1. [Phan A: Chuan Bi Moi Truong](#phan-a-chuan-bi-moi-truong)
2. [Phan B: Khoi Tao Backend Spring Boot](#phan-b-khoi-tao-backend-spring-boot)
3. [Phan C: Khoi Tao Frontend Next.js 15](#phan-c-khoi-tao-frontend-nextjs-15)
4. [Phan D: Cau Hinh Supabase Database](#phan-d-cau-hinh-supabase-database)
5. [Phan E: Buoc Nang Cao](#phan-e-buoc-nang-cao)

---

## PHAN A: CHUAN BI MOI TRUONG

### A1. Kiem Tra Phan Mem Da Cai

Mo PowerShell va chay cac lenh sau:

```powershell
java -version
node -v
npm -v
git --version
```

### A2. Yeu Cau Phien Ban

| Phan mem | Phien ban yeu cau | Link tai |
|----------|-------------------|----------|
| JDK | 21.0.x | adoptium.net |
| Node.js | 20.x LTS hoac 22.x | nodejs.org |
| npm | 10.x+ | Di kem Node.js |
| Git | 2.40+ | git-scm.com |

### A3. Cau Hinh Bien Moi Truong Windows

```powershell
# Them JAVA_HOME
setx JAVA_HOME "C:\Program Files\Java\jdk-21" /M

# Kiem tra
echo %JAVA_HOME%
java -version
```

### A4. Cai Dat VS Code Extensions

| Extension | Extension ID | Muc dich |
|-----------|-------------|----------|
| Extension Pack for Java | vscjava.vscode-java-pack | Phat trien Java |
| Spring Boot Extension Pack | vmware.vscode-boot-dev-pack | Spring Boot tools |
| ES7+ React/Redux Snippets | dsznajder.es7-react-js-snippets | React snippets |
| Tailwind CSS IntelliSense | bradlc.vscode-tailwindcss | Tailwind support |
| Prettier | esbenp.prettier-vscode | Code formatter |
| ESLint | dbaeumer.vscode-eslint | JavaScript linter |
| Thunder Client | rangav.vscode-thunder-client | Test API |
| GitLens | eamodio.gitlens | Git nang cao |

---

## PHAN B: KHOI TAO BACKEND SPRING BOOT

### B1. Tao Thu Muc Du An

```powershell
# Tao thu muc goc tren o E (tuong ung voi GitHub repo)
mkdir E:\Projects\MIXIGUI
cd E:\Projects\MIXIGUI

# Tao 2 thu muc con
mkdir backend
mkdir frontend
```

### B2. Khoi Tao Spring Boot Project

**Cach 1: Spring Initializr (Khuyen nghi)**

1. Truy cap: https://start.spring.io/
2. Cau hinh nhu sau:

| Thuoc tinh | Gia tri |
|------------|---------|
| Project | Maven |
| Language | Java |
| Spring Boot | 3.4.1 |
| Group | com.mixigui |
| Artifact | backend |
| Name | backend |
| Package name | com.mixigui |
| Packaging | Jar |
| Java | 21 |

3. Chon Dependencies:

| Dependency | Muc dich |
|------------|----------|
| Spring Web | REST API |
| Spring Data JPA | Database ORM |
| Spring Security | Xac thuc va phan quyen |
| Spring Validation | Kiem tra du lieu dau vao |
| PostgreSQL Driver | Ket noi Supabase |
| Lombok | Giam boilerplate code |
| Spring Boot DevTools | Hot reload |
| Spring Boot Actuator | Monitoring |

4. Click "Generate", giai nen vao thu muc `backend`

**Cach 2: VS Code**

1. Nhan `Ctrl + Shift + P`
2. Go: `Spring Initializr: Create a Maven Project`
3. Lam theo wizard

### B3. Cau Truc Thu Muc Backend (Modular Monolith)

3 module nghiep vu chinh tuong ung database:
- **course** : khoa hoc, bai hoc, dang ky hoc
- **shop** : san pham nhac cu, don hang
- **content** : blog, danh muc

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── mixigui/
│   │   │           ├── MixiguiApplication.java
│   │   │           │
│   │   │           ├── common/                         # Thanh phan dung chung
│   │   │           │   ├── config/
│   │   │           │   │   ├── SecurityConfig.java
│   │   │           │   │   ├── JwtConfig.java
│   │   │           │   │   ├── CorsConfig.java
│   │   │           │   │   └── OpenApiConfig.java
│   │   │           │   ├── security/
│   │   │           │   │   ├── JwtTokenProvider.java
│   │   │           │   │   ├── JwtAuthenticationFilter.java
│   │   │           │   │   └── CustomUserDetailsService.java
│   │   │           │   ├── exception/
│   │   │           │   │   ├── GlobalExceptionHandler.java
│   │   │           │   │   ├── ResourceNotFoundException.java
│   │   │           │   │   ├── BadRequestException.java
│   │   │           │   │   └── UnauthorizedException.java
│   │   │           │   ├── dto/
│   │   │           │   │   ├── ApiResponse.java
│   │   │           │   │   └── PagedResponse.java
│   │   │           │   ├── util/
│   │   │           │   │   ├── SlugUtil.java
│   │   │           │   │   ├── SecurityUtil.java
│   │   │           │   │   └── DateTimeUtil.java
│   │   │           │   └── constant/
│   │   │           │       └── AppConstants.java
│   │   │           │
│   │   │           └── modules/                        # Module nghiep vu
│   │   │               │
│   │   │               ├── auth/                       # MODULE: Xac thuc
│   │   │               │   ├── controller/
│   │   │               │   │   └── AuthController.java
│   │   │               │   ├── service/
│   │   │               │   │   ├── AuthService.java
│   │   │               │   │   └── AuthServiceImpl.java
│   │   │               │   └── dto/
│   │   │               │       ├── LoginRequest.java
│   │   │               │       ├── LoginResponse.java
│   │   │               │       ├── RegisterRequest.java
│   │   │               │       └── RefreshTokenRequest.java
│   │   │               │
│   │   │               ├── user/                       # MODULE: Nguoi dung
│   │   │               │   ├── controller/
│   │   │               │   │   └── UserController.java
│   │   │               │   ├── service/
│   │   │               │   │   ├── UserService.java
│   │   │               │   │   └── UserServiceImpl.java
│   │   │               │   ├── repository/
│   │   │               │   │   └── UserRepository.java
│   │   │               │   ├── entity/
│   │   │               │   │   └── User.java
│   │   │               │   └── dto/
│   │   │               │       ├── UserRequest.java
│   │   │               │       └── UserResponse.java
│   │   │               │
│   │   │               ├── course/                     # MODULE: Khoa hoc day dan
│   │   │               │   ├── controller/
│   │   │               │   │   ├── CourseController.java
│   │   │               │   │   ├── LessonController.java
│   │   │               │   │   └── EnrollmentController.java
│   │   │               │   ├── service/
│   │   │               │   │   ├── CourseService.java
│   │   │               │   │   ├── CourseServiceImpl.java
│   │   │               │   │   ├── LessonService.java
│   │   │               │   │   ├── LessonServiceImpl.java
│   │   │               │   │   ├── EnrollmentService.java
│   │   │               │   │   └── EnrollmentServiceImpl.java
│   │   │               │   ├── repository/
│   │   │               │   │   ├── CourseRepository.java
│   │   │               │   │   ├── LessonRepository.java
│   │   │               │   │   ├── LessonResourceRepository.java
│   │   │               │   │   └── EnrollmentRepository.java
│   │   │               │   ├── entity/
│   │   │               │   │   ├── Course.java
│   │   │               │   │   ├── Lesson.java
│   │   │               │   │   ├── LessonResource.java
│   │   │               │   │   └── Enrollment.java
│   │   │               │   └── dto/
│   │   │               │       ├── CourseRequest.java
│   │   │               │       ├── CourseResponse.java
│   │   │               │       ├── LessonRequest.java
│   │   │               │       ├── LessonResponse.java
│   │   │               │       └── EnrollmentResponse.java
│   │   │               │
│   │   │               ├── shop/                       # MODULE: Cua hang nhac cu
│   │   │               │   ├── controller/
│   │   │               │   │   ├── ProductController.java
│   │   │               │   │   └── OrderController.java
│   │   │               │   ├── service/
│   │   │               │   │   ├── ProductService.java
│   │   │               │   │   ├── ProductServiceImpl.java
│   │   │               │   │   ├── OrderService.java
│   │   │               │   │   └── OrderServiceImpl.java
│   │   │               │   ├── repository/
│   │   │               │   │   ├── ProductRepository.java
│   │   │               │   │   ├── OrderRepository.java
│   │   │               │   │   └── OrderItemRepository.java
│   │   │               │   ├── entity/
│   │   │               │   │   ├── Product.java
│   │   │               │   │   ├── Order.java
│   │   │               │   │   └── OrderItem.java
│   │   │               │   └── dto/
│   │   │               │       ├── ProductRequest.java
│   │   │               │       ├── ProductResponse.java
│   │   │               │       ├── OrderRequest.java
│   │   │               │       └── OrderResponse.java
│   │   │               │
│   │   │               ├── content/                    # MODULE: Noi dung
│   │   │               │   ├── controller/
│   │   │               │   │   ├── BlogController.java
│   │   │               │   │   ├── CategoryController.java
│   │   │               │   │   └── FaqController.java
│   │   │               │   ├── service/
│   │   │               │   │   ├── BlogService.java
│   │   │               │   │   ├── BlogServiceImpl.java
│   │   │               │   │   ├── CategoryService.java
│   │   │               │   │   ├── CategoryServiceImpl.java
│   │   │               │   │   ├── FaqService.java
│   │   │               │   │   └── FaqServiceImpl.java
│   │   │               │   ├── repository/
│   │   │               │   │   ├── BlogPostRepository.java
│   │   │               │   │   ├── CategoryRepository.java
│   │   │               │   │   └── FaqRepository.java
│   │   │               │   ├── entity/
│   │   │               │   │   ├── BlogPost.java
│   │   │               │   │   ├── Category.java
│   │   │               │   │   └── Faq.java
│   │   │               │   └── dto/
│   │   │               │       ├── BlogPostRequest.java
│   │   │               │       ├── BlogPostResponse.java
│   │   │               │       ├── CategoryRequest.java
│   │   │               │       ├── CategoryResponse.java
│   │   │               │       └── FaqResponse.java
│   │   │               │
│   │   │               └── review/                     # MODULE: Danh gia
│   │   │                   ├── controller/
│   │   │                   │   └── ReviewController.java
│   │   │                   ├── service/
│   │   │                   │   ├── ReviewService.java
│   │   │                   │   └── ReviewServiceImpl.java
│   │   │                   ├── repository/
│   │   │                   │   └── ReviewRepository.java
│   │   │                   ├── entity/
│   │   │                   │   └── Review.java
│   │   │                   └── dto/
│   │   │                       ├── ReviewRequest.java
│   │   │                       └── ReviewResponse.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       └── application-prod.yml
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── mixigui/
│                   ├── modules/
│                   │   ├── auth/
│                   │   ├── course/
│                   │   └── shop/
│                   └── integration/
│
├── pom.xml
├── .gitignore
├── README.md
└── Dockerfile
```

### B4. File pom.xml Hoan Chinh

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
         https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.4.1</version>
        <relativePath/>
    </parent>

    <groupId>com.mixigui</groupId>
    <artifactId>backend</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>MIXIGUI Backend</name>
    <description>Website Day Dan Online - Backend API</description>

    <properties>
        <java.version>21</java.version>
        <jjwt.version>0.12.6</jjwt.version>
        <springdoc.version>2.7.0</springdoc.version>
        <owasp-encoder.version>1.3.1</owasp-encoder.version>
    </properties>

    <dependencies>
        <!-- Spring Boot Starters -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>

        <!-- Database -->
        <dependency>
            <groupId>org.postgresql</groupId>
            <artifactId>postgresql</artifactId>
            <scope>runtime</scope>
        </dependency>

        <!-- JWT -->
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-api</artifactId>
            <version>${jjwt.version}</version>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-impl</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>io.jsonwebtoken</groupId>
            <artifactId>jjwt-jackson</artifactId>
            <version>${jjwt.version}</version>
            <scope>runtime</scope>
        </dependency>

        <!-- Security - OWASP -->
        <dependency>
            <groupId>org.owasp.encoder</groupId>
            <artifactId>encoder</artifactId>
            <version>${owasp-encoder.version}</version>
        </dependency>

        <!-- API Documentation -->
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>${springdoc.version}</version>
        </dependency>

        <!-- Lombok -->
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>

        <!-- Testing -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.security</groupId>
            <artifactId>spring-security-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

### B5. File application.yml

```yaml
# application.yml - Cau hinh chung
spring:
  application:
    name: backend
  profiles:
    active: dev

---
# Profile: dev
spring:
  config:
    activate:
      on-profile: dev

  datasource:
    url: jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
    username: ${DB_USERNAME:postgres.vcomczhnpnejndojrqcd}
    password: ${DB_PASSWORD}
    driver-class-name: org.postgresql.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect

# JWT
jwt:
  secret: ${JWT_SECRET:mixigui-256-bit-secret-key-must-be-at-least-32-characters-long}
  expiration: 86400000
  refresh-expiration: 604800000

# Server
server:
  port: 8080
  servlet:
    context-path: /api

# Logging
logging:
  level:
    com.mixigui: DEBUG
    org.springframework.security: DEBUG

# Springdoc OpenAPI
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

### B6. Tao Cau Truc Thu Muc Backend

```powershell
cd E:\Projects\MIXIGUI\backend

# Common
mkdir -p src/main/java/com/mixigui/common/config
mkdir -p src/main/java/com/mixigui/common/security
mkdir -p src/main/java/com/mixigui/common/exception
mkdir -p src/main/java/com/mixigui/common/dto
mkdir -p src/main/java/com/mixigui/common/util
mkdir -p src/main/java/com/mixigui/common/constant

# Module: auth
mkdir -p src/main/java/com/mixigui/modules/auth/controller
mkdir -p src/main/java/com/mixigui/modules/auth/service
mkdir -p src/main/java/com/mixigui/modules/auth/dto

# Module: user
mkdir -p src/main/java/com/mixigui/modules/user/controller
mkdir -p src/main/java/com/mixigui/modules/user/service
mkdir -p src/main/java/com/mixigui/modules/user/repository
mkdir -p src/main/java/com/mixigui/modules/user/entity
mkdir -p src/main/java/com/mixigui/modules/user/dto

# Module: course
mkdir -p src/main/java/com/mixigui/modules/course/controller
mkdir -p src/main/java/com/mixigui/modules/course/service
mkdir -p src/main/java/com/mixigui/modules/course/repository
mkdir -p src/main/java/com/mixigui/modules/course/entity
mkdir -p src/main/java/com/mixigui/modules/course/dto

# Module: shop
mkdir -p src/main/java/com/mixigui/modules/shop/controller
mkdir -p src/main/java/com/mixigui/modules/shop/service
mkdir -p src/main/java/com/mixigui/modules/shop/repository
mkdir -p src/main/java/com/mixigui/modules/shop/entity
mkdir -p src/main/java/com/mixigui/modules/shop/dto

# Module: content
mkdir -p src/main/java/com/mixigui/modules/content/controller
mkdir -p src/main/java/com/mixigui/modules/content/service
mkdir -p src/main/java/com/mixigui/modules/content/repository
mkdir -p src/main/java/com/mixigui/modules/content/entity
mkdir -p src/main/java/com/mixigui/modules/content/dto

# Module: review
mkdir -p src/main/java/com/mixigui/modules/review/controller
mkdir -p src/main/java/com/mixigui/modules/review/service
mkdir -p src/main/java/com/mixigui/modules/review/repository
mkdir -p src/main/java/com/mixigui/modules/review/entity
mkdir -p src/main/java/com/mixigui/modules/review/dto

# Resources
mkdir -p src/main/resources

# Test
mkdir -p src/test/java/com/mixigui/modules
mkdir -p src/test/java/com/mixigui/integration
```

### B7. Chay Backend

```powershell
cd E:\Projects\MIXIGUI\backend

# Build
./mvnw clean install -DskipTests

# Chay
./mvnw spring-boot:run
```

Kiem tra Swagger UI tai: http://localhost:8080/api/swagger-ui.html

---

## PHAN C: KHOI TAO FRONTEND NEXT.JS 15

### C1. Khoi Tao Next.js Project

```powershell
cd E:\Projects\MIXIGUI

npx create-next-app@15 frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Chon cac options:

| Cau hoi | Lua chon |
|---------|----------|
| Would you like to use TypeScript? | Yes |
| Would you like to use ESLint? | Yes |
| Would you like to use Tailwind CSS? | Yes |
| Would you like to use `src/` directory? | Yes |
| Would you like to use App Router? | Yes |
| Would you like to customize the default import alias? | Yes (@/*) |

### C2. Cai Dat Dependencies

```powershell
cd E:\Projects\MIXIGUI\frontend

# UI Components (Radix UI)
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast @radix-ui/react-tabs @radix-ui/react-accordion

# Form & Validation
npm install react-hook-form @hookform/resolvers zod

# State Management & Data Fetching
npm install @tanstack/react-query axios zustand

# UI Utilities
npm install class-variance-authority clsx tailwind-merge lucide-react

# Date handling
npm install date-fns

# Table
npm install @tanstack/react-table

# SEO - Sitemap
npm install next-sitemap

# Dev Dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss
```

### C3. Cau Truc Thu Muc Frontend

Giai thich nhanh 3 nhom route chinh:
- **(public)** : Trang cong khai - hoc sinh, khach truy cap (quan trong cho SEO)
- **(auth)** : Dang nhap, dang ky
- **(admin)** : Trang quan tri admin, instructor

```
frontend/
├── src/
│   ├── app/                                    # App Router
│   │   │
│   │   ├── (public)/                           # Trang cong khai (SEO)
│   │   │   ├── layout.tsx                      # Layout voi Header + Footer
│   │   │   │
│   │   │   ├── page.tsx                        # Trang chu /
│   │   │   │
│   │   │   ├── khoa-hoc/                       # Danh sach khoa hoc
│   │   │   │   ├── page.tsx                    # /khoa-hoc
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                # /khoa-hoc/[slug]
│   │   │   │
│   │   │   ├── san-pham/                       # Cua hang nhac cu
│   │   │   │   ├── page.tsx                    # /san-pham
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                # /san-pham/[slug]
│   │   │   │
│   │   │   ├── blog/                           # Bai viet
│   │   │   │   ├── page.tsx                    # /blog
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                # /blog/[slug]
│   │   │   │
│   │   │   ├── danh-muc/                       # Trang danh muc
│   │   │   │   └── [slug]/
│   │   │   │       └── page.tsx                # /danh-muc/[slug]
│   │   │   │
│   │   │   ├── giang-vien/                     # Trang giang vien
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── ve-chung-toi/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   └── lien-he/
│   │   │       └── page.tsx
│   │   │
│   │   ├── (auth)/                             # Xac thuc
│   │   │   ├── layout.tsx
│   │   │   ├── dang-nhap/
│   │   │   │   └── page.tsx
│   │   │   └── dang-ky/
│   │   │       └── page.tsx
│   │   │
│   │   ├── hoc-vien/                           # Dashboard hoc vien
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                        # Tong quan
│   │   │   ├── khoa-hoc-cua-toi/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [courseSlug]/
│   │   │   │       └── page.tsx                # Trang hoc
│   │   │   ├── don-hang/
│   │   │   │   └── page.tsx
│   │   │   └── ho-so/
│   │   │       └── page.tsx
│   │   │
│   │   ├── admin/                              # Quan tri admin
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx                        # Dashboard
│   │   │   │
│   │   │   ├── khoa-hoc/                       # Quan ly khoa hoc
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tao-moi/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx
│   │   │   │       └── bai-hoc/
│   │   │   │           └── page.tsx
│   │   │   │
│   │   │   ├── san-pham/                       # Quan ly san pham
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tao-moi/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── don-hang/                       # Quan ly don hang
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── blog/                           # Quan ly blog
│   │   │   │   ├── page.tsx
│   │   │   │   ├── tao-moi/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── danh-muc/                       # Quan ly danh muc
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── nguoi-dung/                     # Quan ly users
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── danh-gia/                       # Quan ly danh gia
│   │   │       └── page.tsx
│   │   │
│   │   ├── api/                                # API Routes
│   │   │   ├── sitemap/
│   │   │   │   └── route.ts
│   │   │   └── health/
│   │   │       └── route.ts
│   │   │
│   │   ├── sitemap.ts                          # Next.js sitemap
│   │   ├── robots.ts                           # robots.txt
│   │   ├── layout.tsx                          # Root layout
│   │   ├── page.tsx                            # (redirect)
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │   ├── ui/                                 # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── table.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── accordion.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/                             # Layout components
│   │   │   ├── header.tsx                      # Header cong khai
│   │   │   ├── footer.tsx
│   │   │   ├── admin-sidebar.tsx               # Sidebar admin
│   │   │   ├── student-sidebar.tsx             # Sidebar hoc vien
│   │   │   ├── nav-item.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── breadcrumb.tsx
│   │   │
│   │   ├── seo/                                # SEO components
│   │   │   ├── course-schema.tsx               # JSON-LD cho Course
│   │   │   ├── product-schema.tsx              # JSON-LD cho Product
│   │   │   ├── blog-schema.tsx                 # JSON-LD cho BlogPosting
│   │   │   ├── breadcrumb-schema.tsx           # JSON-LD BreadcrumbList
│   │   │   └── organization-schema.tsx         # JSON-LD Organization
│   │   │
│   │   ├── course/                             # Course components
│   │   │   ├── course-card.tsx
│   │   │   ├── course-list.tsx
│   │   │   ├── course-detail.tsx
│   │   │   ├── lesson-list.tsx
│   │   │   ├── lesson-player.tsx
│   │   │   ├── enroll-button.tsx
│   │   │   └── course-form.tsx                 # Admin form
│   │   │
│   │   ├── shop/                               # Shop components
│   │   │   ├── product-card.tsx
│   │   │   ├── product-list.tsx
│   │   │   ├── product-detail.tsx
│   │   │   ├── cart-button.tsx
│   │   │   ├── order-form.tsx
│   │   │   └── product-form.tsx                # Admin form
│   │   │
│   │   ├── blog/                               # Blog components
│   │   │   ├── post-card.tsx
│   │   │   ├── post-list.tsx
│   │   │   ├── post-detail.tsx
│   │   │   └── post-form.tsx                   # Admin form
│   │   │
│   │   ├── tables/                             # Data tables
│   │   │   ├── data-table.tsx
│   │   │   └── columns/
│   │   │       ├── course-columns.tsx
│   │   │       ├── product-columns.tsx
│   │   │       ├── order-columns.tsx
│   │   │       └── user-columns.tsx
│   │   │
│   │   └── shared/
│   │       ├── page-header.tsx
│   │       ├── confirm-dialog.tsx
│   │       ├── empty-state.tsx
│   │       ├── star-rating.tsx
│   │       ├── image-upload.tsx
│   │       └── rich-text-editor.tsx
│   │
│   ├── hooks/
│   │   ├── use-auth.ts
│   │   ├── use-toast.ts
│   │   ├── use-debounce.ts
│   │   ├── use-cart.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts                       # Axios instance
│   │   │   ├── auth.ts
│   │   │   ├── courses.ts
│   │   │   ├── lessons.ts
│   │   │   ├── products.ts
│   │   │   ├── orders.ts
│   │   │   ├── blog.ts
│   │   │   ├── categories.ts
│   │   │   ├── reviews.ts
│   │   │   └── users.ts
│   │   │
│   │   ├── utils.ts
│   │   ├── constants.ts
│   │   ├── validations.ts                      # Zod schemas
│   │   ├── formatters.ts
│   │   └── seo.ts                              # generateMetadata helpers
│   │
│   ├── stores/
│   │   ├── auth-store.ts
│   │   ├── cart-store.ts
│   │   └── ui-store.ts
│   │
│   ├── types/
│   │   ├── api.ts
│   │   ├── auth.ts
│   │   ├── course.ts
│   │   ├── lesson.ts
│   │   ├── product.ts
│   │   ├── order.ts
│   │   ├── blog.ts
│   │   ├── category.ts
│   │   ├── review.ts
│   │   └── index.ts
│   │
│   ├── providers/
│   │   ├── query-provider.tsx
│   │   ├── auth-provider.tsx
│   │   └── toast-provider.tsx
│   │
│   └── config/
│       ├── site.ts                             # Ten web, mo ta, URL
│       ├── navigation.ts
│       └── env.ts
│
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── og-image.jpg                        # Open Graph image cho SEO
│   └── favicon.ico
│
├── .env.local
├── .env.example
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .prettierrc
└── package.json
```

### C4. Tao Cau Truc Thu Muc Frontend

```powershell
cd E:\Projects\MIXIGUI\frontend

# App - Public routes
mkdir -p "src/app/(public)/khoa-hoc/[slug]"
mkdir -p "src/app/(public)/san-pham/[slug]"
mkdir -p "src/app/(public)/blog/[slug]"
mkdir -p "src/app/(public)/danh-muc/[slug]"
mkdir -p "src/app/(public)/giang-vien/[id]"
mkdir -p "src/app/(public)/ve-chung-toi"
mkdir -p "src/app/(public)/lien-he"

# App - Auth routes
mkdir -p "src/app/(auth)/dang-nhap"
mkdir -p "src/app/(auth)/dang-ky"

# App - Student dashboard
mkdir -p "src/app/hoc-vien/khoa-hoc-cua-toi/[courseSlug]"
mkdir -p "src/app/hoc-vien/don-hang"
mkdir -p "src/app/hoc-vien/ho-so"

# App - Admin
mkdir -p "src/app/admin/khoa-hoc/tao-moi"
mkdir -p "src/app/admin/khoa-hoc/[id]/bai-hoc"
mkdir -p "src/app/admin/san-pham/tao-moi"
mkdir -p "src/app/admin/san-pham/[id]"
mkdir -p "src/app/admin/don-hang/[id]"
mkdir -p "src/app/admin/blog/tao-moi"
mkdir -p "src/app/admin/blog/[id]"
mkdir -p "src/app/admin/danh-muc"
mkdir -p "src/app/admin/nguoi-dung/[id]"
mkdir -p "src/app/admin/danh-gia"
mkdir -p "src/app/api/health"
mkdir -p "src/app/api/sitemap"

# Components
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/seo
mkdir -p src/components/course
mkdir -p src/components/shop
mkdir -p src/components/blog
mkdir -p src/components/tables/columns
mkdir -p src/components/shared

# Other
mkdir -p src/hooks
mkdir -p src/lib/api
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/providers
mkdir -p src/config
mkdir -p public/images
```

### C5. File Cau Hinh Frontend

**.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_APP_NAME=MIXIGUI
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**.env.example**
```env
NEXT_PUBLIC_API_URL=https://your-api.railway.app/api
NEXT_PUBLIC_APP_NAME=MIXIGUI
NEXT_PUBLIC_APP_URL=https://mixigui.vercel.app
```

**src/config/site.ts** (quan trong cho SEO)
```typescript
export const siteConfig = {
  name: "MIXIGUI",
  description: "Website day dan online cho Gen Z tai TP.HCM - hoc guitar, ukulele, piano tu co ban den nang cao",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  keywords: ["day dan online", "hoc guitar", "hoc ukulele", "hoc piano", "mixigui"],
  author: "MIXIGUI Team",
  locale: "vi_VN",
};
```

**next-sitemap.config.js**
```javascript
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  changefreq: "weekly",
  priority: 0.7,
  sitemapSize: 5000,
  exclude: ["/admin/*", "/hoc-vien/*"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: ["/admin", "/hoc-vien"] },
    ],
  },
};
```

**tailwind.config.ts**
```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### C6. Chay Frontend

```powershell
cd E:\Projects\MIXIGUI\frontend

npm run dev
```

Truy cap: http://localhost:3000

---

## PHAN D: CAU HINH SUPABASE DATABASE

### D1. Thong Tin Supabase Da Co

Du an nay da co Supabase project san. Dung tao moi.

| Thong tin | Gia tri |
|-----------|---------|
| Project ID | vcomczhnpnejndojrqcd |
| API URL | https://vcomczhnpnejndojrqcd.supabase.co |
| DB Host | aws-1-ap-southeast-1.pooler.supabase.com:5432 |
| DB User | postgres.vcomczhnpnejndojrqcd |
| Region | ap-southeast-1 (Singapore) |

### D2. Cau Hinh Backend Ket Noi Supabase

Cap nhat `application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://aws-1-ap-southeast-1.pooler.supabase.com:5432/postgres
    username: postgres.vcomczhnpnejndojrqcd
    password: ${SUPABASE_DB_PASSWORD}
    driver-class-name: org.postgresql.Driver
```

Tao file `.env` trong thu muc `backend` (KHONG commit file nay):

```env
SUPABASE_DB_PASSWORD=your_password_here
JWT_SECRET=mixigui-256-bit-secret-must-be-32-chars-minimum
```

### D3. Cau Hinh Frontend Ket Noi Supabase

Cap nhat `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vcomczhnpnejndojrqcd.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZjb21jemhucG5lam5kb2pycWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzOTAxODgsImV4cCI6MjA4ODk2NjE4OH0.tsVt311kQngMfzl9l7Dvg_JvRjD3Ij7qp7enNacHqzM
```

### D4. Kiem Tra Database

Vao Supabase Dashboard > Table Editor, kiem tra 11 bang da ton tai:

| Bang | Mo ta |
|------|-------|
| users | Nguoi dung (STUDENT, INSTRUCTOR, ADMIN) |
| categories | Danh muc (COURSE, PRODUCT, BLOG) |
| courses | Khoa hoc day dan |
| lessons | Bai hoc trong khoa |
| lesson_resources | Tai nguyen bai hoc (PDF, audio) |
| enrollments | Dang ky khoa hoc |
| products | San pham nhac cu |
| orders | Don dat hang |
| order_items | Chi tiet don hang |
| blog_posts | Bai viet blog |
| reviews | Danh gia khoa hoc / san pham |
| faqs | Cau hoi thuong gap |

---

## PHAN E: BUOC NANG CAO

### E1. Cau Hinh Git Repository

```powershell
cd E:\Projects\MIXIGUI

git init

# Tao .gitignore
@"
# IDE
.vscode/
*.iml

# Backend
backend/target/
backend/.env
backend/*.log

# Frontend
frontend/node_modules/
frontend/.next/
frontend/out/

# Environment
.env
.env.local
.env.*.local
*.env

# OS
.DS_Store
Thumbs.db

# Logs
logs/
*.log
npm-debug.log*

# Build
dist/
build/
"@ | Out-File -FilePath .gitignore -Encoding utf8

# Ket noi GitHub da co
git remote add origin https://github.com/doanpham16112005-crypto/MIXIGUI.git

git add .
git commit -m "Initial commit: MIXIGUI project structure"
git push -u origin main
```

### E2. Docker Setup

**backend/Dockerfile**
```dockerfile
FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
COPY src src
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
```

**frontend/Dockerfile**
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### E3. GitHub Actions CI/CD

**.github/workflows/ci.yml**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  backend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up JDK 21
        uses: actions/setup-java@v4
        with:
          java-version: '21'
          distribution: 'temurin'

      - name: Cache Maven packages
        uses: actions/cache@v4
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}

      - name: Build and Test Backend
        working-directory: ./backend
        run: ./mvnw clean verify

  frontend-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json

      - name: Install dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Lint
        working-directory: ./frontend
        run: npm run lint

      - name: Build
        working-directory: ./frontend
        run: npm run build
```

### E4. Deploy: Railway (Backend) + Vercel (Frontend)

**Backend len Railway:**

1. Truy cap: https://railway.app/
2. "New Project" > "Deploy from GitHub repo"
3. Chon repo MIXIGUI > thu muc `backend`
4. Them Environment Variables:

| Bien | Gia tri |
|------|---------|
| SPRING_PROFILES_ACTIVE | prod |
| SUPABASE_DB_PASSWORD | [mat khau supabase] |
| JWT_SECRET | [chuoi bi mat 32+ ky tu] |

**Frontend len Vercel:**

1. Truy cap: https://vercel.com/
2. "Add New Project" > Import GitHub repo MIXIGUI
3. Root Directory: `frontend`
4. Them Environment Variables:

| Bien | Gia tri |
|------|---------|
| NEXT_PUBLIC_API_URL | https://[ten-app].railway.app/api |
| NEXT_PUBLIC_APP_URL | https://[ten-app].vercel.app |

### E5. SEO Checklist (Quan Trong Cho Do An)

Day la cac yeu cau SEO Onpage cho moi trang:

| Tieu chi SEO | Cach thuc hien trong Next.js 15 |
|-------------|--------------------------------|
| Title tag unique | generateMetadata() moi page |
| Meta description | generateMetadata() - 150-160 ky tu |
| URL slug tieng Viet | /khoa-hoc/[slug], /san-pham/[slug] |
| Heading H1 | Moi page chi co 1 the H1 |
| Alt text hinh anh | alt cho moi the img |
| Open Graph | og:title, og:description, og:image |
| JSON-LD Schema | Course, Product, BlogPosting, BreadcrumbList |
| Canonical URL | canonical trong metadata |
| Sitemap XML | next-sitemap tu dong sinh |
| robots.txt | next-sitemap tu dong tao |
| Page speed | Next.js Image Optimization, lazy loading |

**Vi du generateMetadata cho trang khoa hoc:**
```typescript
// src/app/(public)/khoa-hoc/[slug]/page.tsx
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const course = await getCourseBySlug(params.slug);
  return {
    title: `${course.title} | MIXIGUI`,
    description: course.meta_description,
    openGraph: {
      title: course.title,
      description: course.meta_description,
      images: [{ url: course.thumbnail_url }],
      type: "website",
      locale: "vi_VN",
    },
    alternates: {
      canonical: `/khoa-hoc/${params.slug}`,
    },
  };
}
```

### E6. Security Checklist

| Ky thuat bao mat | Cach thuc hien |
|-----------------|----------------|
| SQL Injection | JPA Parameterized Queries |
| XSS | OWASP Encoder (backend), CSP header (frontend) |
| CSRF | JWT SameSite cookie |
| Authentication | JWT + Refresh Token, BCrypt password |
| Access Control | Spring Security RBAC (ADMIN, INSTRUCTOR, STUDENT) |
| File Upload | Validate file type, kich thuoc, luu Supabase Storage |
| Information Disclosure | Custom error messages, khong lo stack trace |
| Rate Limiting | Spring Security request limit (optional) |

### E7. Chien Luoc Testing

| Loai Test | Framework | Thu muc |
|-----------|-----------|---------|
| Unit Test Backend | JUnit 5, Mockito | src/test/java/.../modules |
| Integration Test | Spring Boot Test | src/test/java/.../integration |
| Unit Test Frontend | Jest, React Testing Library | __tests__/ |
| E2E Test | Playwright | e2e/ |

---

## CHECKLIST KHOI TAO

| Buoc | Mo ta | Trang thai |
|------|-------|------------|
| 1 | Cai dat JDK 21 | [ ] |
| 2 | Cai dat Node.js 20+ | [ ] |
| 3 | Cai dat VS Code Extensions | [ ] |
| 4 | Tao thu muc du an E:\Projects\MIXIGUI | [ ] |
| 5 | Khoi tao Spring Boot Backend | [ ] |
| 6 | Them pom.xml va application.yml | [ ] |
| 7 | Tao cau truc thu muc Backend | [ ] |
| 8 | Khoi tao Next.js 15 Frontend | [ ] |
| 9 | Cai dat npm dependencies | [ ] |
| 10 | Tao cau truc thu muc Frontend | [ ] |
| 11 | Cau hinh .env.local va site.ts | [ ] |
| 12 | Ket noi Backend voi Supabase | [ ] |
| 13 | Chay Backend: http://localhost:8080/api/swagger-ui.html | [ ] |
| 14 | Chay Frontend: http://localhost:3000 | [ ] |
| 15 | Git init va ket noi GitHub | [ ] |
| 16 | Cau hinh next-sitemap va robots.txt | [ ] |
| 17 | Trien khai Railway (Backend) | [ ] |
| 18 | Trien khai Vercel (Frontend) | [ ] |
| 19 | Kiem tra SEO voi Google Search Console | [ ] |
| 20 | Kiem tra Lighthouse score | [ ] |

---

## TAI LIEU THAM KHAO

| Tai lieu | URL |
|----------|-----|
| Spring Boot 3.4 Docs | https://docs.spring.io/spring-boot/docs/current/reference/html/ |
| Spring Security | https://docs.spring.io/spring-security/reference/ |
| Next.js 15 Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Supabase Docs | https://supabase.com/docs |
| React Query | https://tanstack.com/query/latest |
| next-sitemap | https://github.com/iamvishnusankar/next-sitemap |
| JSON-LD Schema | https://schema.org/ |

---

**Du an:** MIXIGUI - Website Day Dan Online
**Phien ban:** 1.0.0
**Cap nhat:** 2026-03-16

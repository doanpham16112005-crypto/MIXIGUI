# HƯỚNG DẪN KHỞI TẠO DỰ ÁN GOATWEDDINGS

## THÔNG TIN DỰ ÁN

| Thuộc tính | Giá trị |
|------------|---------|
| Tên dự án | GoatWeddings - Quản Lý Tiệc Cưới |
| Kiến trúc | Modular Monolith, Multi-tenant SaaS |
| Backend | Spring Boot 3.4.x (Java 21) |
| Frontend | Next.js 15 (App Router) |
| Database | PostgreSQL (Supabase) |
| IDE | Visual Studio Code |
| OS | Windows 10 |

---

## MỤC LỤC

1. [Phần A: Chuẩn Bị Môi Trường](#phần-a-chuẩn-bị-môi-trường)
2. [Phần B: Khởi Tạo Backend Spring Boot](#phần-b-khởi-tạo-backend-spring-boot)
3. [Phần C: Khởi Tạo Frontend Next.js 15](#phần-c-khởi-tạo-frontend-nextjs-15)
4. [Phần D: Cấu Hình Supabase Database](#phần-d-cấu-hình-supabase-database)
5. [Phần E: Bước Nâng Cao](#phần-e-bước-nâng-cao)

---

## PHẦN A: CHUẨN BỊ MÔI TRƯỜNG

### A1. Kiểm Tra Phần Mềm Đã Cài

Mở PowerShell và chạy các lệnh sau:

```powershell
# Kiểm tra Java
java -version

# Kiểm tra Node.js
node -v

# Kiểm tra npm
npm -v

# Kiểm tra Git
git --version
```

### A2. Yêu Cầu Phiên Bản

| Phần mềm | Phiên bản yêu cầu | Lệnh cài đặt |
|----------|-------------------|--------------|
| JDK | 21.0.x | Tải từ Oracle hoặc Adoptium |
| Node.js | 20.x LTS hoặc 22.x | nodejs.org |
| npm | 10.x+ | Đi kèm Node.js |
| Git | 2.40+ | git-scm.com |

### A3. Cấu Hình Biến Môi Trường (Windows)

```powershell
# Thêm JAVA_HOME vào System Environment Variables
setx JAVA_HOME "C:\Program Files\Java\jdk-21" /M

# Kiểm tra
echo %JAVA_HOME%
```

### A4. Cài Đặt VS Code Extensions

| Extension | ID | Mục đích |
|-----------|-----|----------|
| Extension Pack for Java | vscjava.vscode-java-pack | Java development |
| Spring Boot Extension Pack | vmware.vscode-boot-dev-pack | Spring Boot tools |
| ES7+ React/Redux/React-Native | dsznajder.es7-react-js-snippets | React snippets |
| Tailwind CSS IntelliSense | bradlc.vscode-tailwindcss | Tailwind support |
| Prettier | esbenp.prettier-vscode | Code formatter |
| ESLint | dbaeumer.vscode-eslint | JavaScript linter |
| Thunder Client | rangav.vscode-thunder-client | API testing |

---

## PHẦN B: KHỞI TẠO BACKEND SPRING BOOT

### B1. Tạo Thư Mục Dự Án

```powershell
# Tạo thư mục gốc
mkdir D:\Projects\GoatWeddings
cd D:\Projects\GoatWeddings

# Tạo thư mục cho backend và frontend
mkdir backend
mkdir frontend
```

### B2. Khởi Tạo Spring Boot Project

**Cách 1: Sử dụng Spring Initializr (Khuyến nghị)**

1. Truy cập: https://start.spring.io/
2. Cấu hình như sau:

| Thuộc tính | Giá trị |
|------------|---------|
| Project | Maven |
| Language | Java |
| Spring Boot | 3.4.1 |
| Group | com.goatweddings |
| Artifact | backend |
| Name | backend |
| Package name | com.goatweddings |
| Packaging | Jar |
| Java | 21 |

3. Chọn Dependencies:

| Dependency | Mục đích |
|------------|----------|
| Spring Web | REST API |
| Spring Data JPA | Database ORM |
| Spring Security | Authentication/Authorization |
| Spring Validation | Input validation |
| PostgreSQL Driver | Kết nối Supabase |
| Lombok | Reduce boilerplate |
| Spring Boot DevTools | Hot reload |
| Spring Boot Actuator | Monitoring |

4. Click "Generate" và giải nén vào thư mục `backend`

**Cách 2: Sử dụng VS Code**

1. Nhấn `Ctrl + Shift + P`
2. Gõ: `Spring Initializr: Create a Maven Project`
3. Làm theo wizard

### B3. Cấu Trúc Thư Mục Backend (Modular Monolith)

```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/
│   │   │       └── goatweddings/
│   │   │           ├── GoatWeddingsApplication.java
│   │   │           │
│   │   │           ├── common/                    # Shared components
│   │   │           │   ├── config/
│   │   │           │   │   ├── SecurityConfig.java
│   │   │           │   │   ├── JwtConfig.java
│   │   │           │   │   ├── CorsConfig.java
│   │   │           │   │   └── OpenApiConfig.java
│   │   │           │   ├── security/
│   │   │           │   │   ├── JwtTokenProvider.java
│   │   │           │   │   ├── JwtAuthenticationFilter.java
│   │   │           │   │   ├── CustomUserDetailsService.java
│   │   │           │   │   └── TenantContext.java
│   │   │           │   ├── exception/
│   │   │           │   │   ├── GlobalExceptionHandler.java
│   │   │           │   │   ├── ResourceNotFoundException.java
│   │   │           │   │   ├── BadRequestException.java
│   │   │           │   │   └── UnauthorizedException.java
│   │   │           │   ├── dto/
│   │   │           │   │   ├── ApiResponse.java
│   │   │           │   │   └── PagedResponse.java
│   │   │           │   ├── util/
│   │   │           │   │   ├── ValidationUtil.java
│   │   │           │   │   ├── SecurityUtil.java
│   │   │           │   │   └── DateTimeUtil.java
│   │   │           │   └── constant/
│   │   │           │       └── AppConstants.java
│   │   │           │
│   │   │           ├── modules/                   # Business modules
│   │   │           │   │
│   │   │           │   ├── auth/                  # MODULE: Authentication
│   │   │           │   │   ├── controller/
│   │   │           │   │   │   └── AuthController.java
│   │   │           │   │   ├── service/
│   │   │           │   │   │   ├── AuthService.java
│   │   │           │   │   │   └── AuthServiceImpl.java
│   │   │           │   │   ├── dto/
│   │   │           │   │   │   ├── LoginRequest.java
│   │   │           │   │   │   ├── LoginResponse.java
│   │   │           │   │   │   ├── RefreshTokenRequest.java
│   │   │           │   │   │   └── ChangePasswordRequest.java
│   │   │           │   │   └── repository/
│   │   │           │   │
│   │   │           │   ├── system/                # MODULE: System (sys_)
│   │   │           │   │   ├── tenant/
│   │   │           │   │   │   ├── controller/
│   │   │           │   │   │   │   └── TenantController.java
│   │   │           │   │   │   ├── service/
│   │   │           │   │   │   │   ├── TenantService.java
│   │   │           │   │   │   │   └── TenantServiceImpl.java
│   │   │           │   │   │   ├── repository/
│   │   │           │   │   │   │   └── TenantRepository.java
│   │   │           │   │   │   ├── entity/
│   │   │           │   │   │   │   └── Tenant.java
│   │   │           │   │   │   └── dto/
│   │   │           │   │   │       ├── TenantRequest.java
│   │   │           │   │   │       └── TenantResponse.java
│   │   │           │   │   ├── user/
│   │   │           │   │   │   ├── controller/
│   │   │           │   │   │   ├── service/
│   │   │           │   │   │   ├── repository/
│   │   │           │   │   │   ├── entity/
│   │   │           │   │   │   └── dto/
│   │   │           │   │   └── setting/
│   │   │           │   │       ├── controller/
│   │   │           │   │       ├── service/
│   │   │           │   │       ├── repository/
│   │   │           │   │       ├── entity/
│   │   │           │   │       └── dto/
│   │   │           │   │
│   │   │           │   ├── catalog/               # MODULE: Catalog (cat_)
│   │   │           │   │   ├── hall/
│   │   │           │   │   │   ├── controller/
│   │   │           │   │   │   │   └── HallController.java
│   │   │           │   │   │   ├── service/
│   │   │           │   │   │   ├── repository/
│   │   │           │   │   │   ├── entity/
│   │   │           │   │   │   │   ├── Hall.java
│   │   │           │   │   │   │   └── HallType.java
│   │   │           │   │   │   └── dto/
│   │   │           │   │   ├── food/
│   │   │           │   │   │   ├── controller/
│   │   │           │   │   │   ├── service/
│   │   │           │   │   │   ├── repository/
│   │   │           │   │   │   ├── entity/
│   │   │           │   │   │   └── dto/
│   │   │           │   │   ├── service/
│   │   │           │   │   │   ├── controller/
│   │   │           │   │   │   ├── service/
│   │   │           │   │   │   ├── repository/
│   │   │           │   │   │   ├── entity/
│   │   │           │   │   │   └── dto/
│   │   │           │   │   └── pricehistory/
│   │   │           │   │       ├── service/
│   │   │           │   │       ├── repository/
│   │   │           │   │       └── entity/
│   │   │           │   │
│   │   │           │   ├── booking/               # MODULE: Booking (bkg_)
│   │   │           │   │   ├── controller/
│   │   │           │   │   │   └── BookingController.java
│   │   │           │   │   ├── service/
│   │   │           │   │   │   ├── BookingService.java
│   │   │           │   │   │   └── BookingServiceImpl.java
│   │   │           │   │   ├── repository/
│   │   │           │   │   │   ├── BookingRepository.java
│   │   │           │   │   │   ├── BookingFoodRepository.java
│   │   │           │   │   │   └── BookingServiceRepository.java
│   │   │           │   │   ├── entity/
│   │   │           │   │   │   ├── Booking.java
│   │   │           │   │   │   ├── BookingFood.java
│   │   │           │   │   │   └── BookingService.java
│   │   │           │   │   └── dto/
│   │   │           │   │       ├── BookingRequest.java
│   │   │           │   │       ├── BookingResponse.java
│   │   │           │   │       └── BookingSearchRequest.java
│   │   │           │   │
│   │   │           │   └── invoice/               # MODULE: Invoice (inv_)
│   │   │           │       ├── controller/
│   │   │           │       │   └── InvoiceController.java
│   │   │           │       ├── service/
│   │   │           │       │   ├── InvoiceService.java
│   │   │           │       │   ├── InvoiceServiceImpl.java
│   │   │           │       │   └── PaymentService.java
│   │   │           │       ├── repository/
│   │   │           │       │   ├── InvoiceRepository.java
│   │   │           │       │   └── PaymentRepository.java
│   │   │           │       ├── entity/
│   │   │           │       │   ├── Invoice.java
│   │   │           │       │   └── Payment.java
│   │   │           │       └── dto/
│   │   │           │           ├── InvoiceRequest.java
│   │   │           │           ├── InvoiceResponse.java
│   │   │           │           └── PaymentRequest.java
│   │   │           │
│   │   │           └── report/                    # MODULE: Report
│   │   │               ├── controller/
│   │   │               │   └── ReportController.java
│   │   │               ├── service/
│   │   │               │   └── ReportService.java
│   │   │               └── dto/
│   │   │                   └── MonthlyRevenueReport.java
│   │   │
│   │   └── resources/
│   │       ├── application.yml
│   │       ├── application-dev.yml
│   │       ├── application-prod.yml
│   │       └── db/
│   │           └── migration/                     # Flyway migrations
│   │               ├── V1__init_schema.sql
│   │               └── V2__seed_data.sql
│   │
│   └── test/
│       └── java/
│           └── com/
│               └── goatweddings/
│                   ├── modules/
│                   │   ├── auth/
│                   │   ├── booking/
│                   │   └── invoice/
│                   └── integration/
│
├── pom.xml
├── .gitignore
├── README.md
└── Dockerfile
```

### B4. File pom.xml Hoàn Chỉnh

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
    
    <groupId>com.goatweddings</groupId>
    <artifactId>backend</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>GoatWeddings Backend</name>
    <description>Wedding Management System - Backend API</description>
    
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
# application.yml - Cấu hình chung
spring:
  application:
    name: goatweddings-backend
  profiles:
    active: dev

---
# application-dev.yml
spring:
  config:
    activate:
      on-profile: dev
  
  datasource:
    url: jdbc:postgresql://localhost:5432/goatweddings
    username: ${DB_USERNAME:postgres}
    password: ${DB_PASSWORD:postgres}
    driver-class-name: org.postgresql.Driver
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: true
    properties:
      hibernate:
        format_sql: true
        dialect: org.hibernate.dialect.PostgreSQLDialect
  
  security:
    user:
      name: admin
      password: admin

# JWT Configuration
jwt:
  secret: ${JWT_SECRET:your-256-bit-secret-key-here-must-be-at-least-32-characters}
  expiration: 86400000      # 24 hours in milliseconds
  refresh-expiration: 604800000  # 7 days

# Server
server:
  port: 8080
  servlet:
    context-path: /api

# Logging
logging:
  level:
    com.goatweddings: DEBUG
    org.springframework.security: DEBUG

# Springdoc OpenAPI
springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

### B6. Tạo Cấu Trúc Thư Mục Backend

```powershell
cd D:\Projects\GoatWeddings\backend

# Tạo cấu trúc common
mkdir -p src/main/java/com/goatweddings/common/config
mkdir -p src/main/java/com/goatweddings/common/security
mkdir -p src/main/java/com/goatweddings/common/exception
mkdir -p src/main/java/com/goatweddings/common/dto
mkdir -p src/main/java/com/goatweddings/common/util
mkdir -p src/main/java/com/goatweddings/common/constant

# Tạo cấu trúc modules
# Auth module
mkdir -p src/main/java/com/goatweddings/modules/auth/controller
mkdir -p src/main/java/com/goatweddings/modules/auth/service
mkdir -p src/main/java/com/goatweddings/modules/auth/dto

# System module
mkdir -p src/main/java/com/goatweddings/modules/system/tenant/controller
mkdir -p src/main/java/com/goatweddings/modules/system/tenant/service
mkdir -p src/main/java/com/goatweddings/modules/system/tenant/repository
mkdir -p src/main/java/com/goatweddings/modules/system/tenant/entity
mkdir -p src/main/java/com/goatweddings/modules/system/tenant/dto

mkdir -p src/main/java/com/goatweddings/modules/system/user/controller
mkdir -p src/main/java/com/goatweddings/modules/system/user/service
mkdir -p src/main/java/com/goatweddings/modules/system/user/repository
mkdir -p src/main/java/com/goatweddings/modules/system/user/entity
mkdir -p src/main/java/com/goatweddings/modules/system/user/dto

mkdir -p src/main/java/com/goatweddings/modules/system/setting/controller
mkdir -p src/main/java/com/goatweddings/modules/system/setting/service
mkdir -p src/main/java/com/goatweddings/modules/system/setting/repository
mkdir -p src/main/java/com/goatweddings/modules/system/setting/entity
mkdir -p src/main/java/com/goatweddings/modules/system/setting/dto

# Catalog module
mkdir -p src/main/java/com/goatweddings/modules/catalog/hall/controller
mkdir -p src/main/java/com/goatweddings/modules/catalog/hall/service
mkdir -p src/main/java/com/goatweddings/modules/catalog/hall/repository
mkdir -p src/main/java/com/goatweddings/modules/catalog/hall/entity
mkdir -p src/main/java/com/goatweddings/modules/catalog/hall/dto

mkdir -p src/main/java/com/goatweddings/modules/catalog/food/controller
mkdir -p src/main/java/com/goatweddings/modules/catalog/food/service
mkdir -p src/main/java/com/goatweddings/modules/catalog/food/repository
mkdir -p src/main/java/com/goatweddings/modules/catalog/food/entity
mkdir -p src/main/java/com/goatweddings/modules/catalog/food/dto

mkdir -p src/main/java/com/goatweddings/modules/catalog/service/controller
mkdir -p src/main/java/com/goatweddings/modules/catalog/service/service
mkdir -p src/main/java/com/goatweddings/modules/catalog/service/repository
mkdir -p src/main/java/com/goatweddings/modules/catalog/service/entity
mkdir -p src/main/java/com/goatweddings/modules/catalog/service/dto

mkdir -p src/main/java/com/goatweddings/modules/catalog/pricehistory/service
mkdir -p src/main/java/com/goatweddings/modules/catalog/pricehistory/repository
mkdir -p src/main/java/com/goatweddings/modules/catalog/pricehistory/entity

# Booking module
mkdir -p src/main/java/com/goatweddings/modules/booking/controller
mkdir -p src/main/java/com/goatweddings/modules/booking/service
mkdir -p src/main/java/com/goatweddings/modules/booking/repository
mkdir -p src/main/java/com/goatweddings/modules/booking/entity
mkdir -p src/main/java/com/goatweddings/modules/booking/dto

# Invoice module
mkdir -p src/main/java/com/goatweddings/modules/invoice/controller
mkdir -p src/main/java/com/goatweddings/modules/invoice/service
mkdir -p src/main/java/com/goatweddings/modules/invoice/repository
mkdir -p src/main/java/com/goatweddings/modules/invoice/entity
mkdir -p src/main/java/com/goatweddings/modules/invoice/dto

# Report module
mkdir -p src/main/java/com/goatweddings/modules/report/controller
mkdir -p src/main/java/com/goatweddings/modules/report/service
mkdir -p src/main/java/com/goatweddings/modules/report/dto

# Resources
mkdir -p src/main/resources/db/migration

# Test
mkdir -p src/test/java/com/goatweddings/modules
mkdir -p src/test/java/com/goatweddings/integration
```

### B7. Chạy Backend

```powershell
cd D:\Projects\GoatWeddings\backend

# Build project
./mvnw clean install -DskipTests

# Chạy ứng dụng
./mvnw spring-boot:run
```

---

## PHẦN C: KHỞI TẠO FRONTEND NEXT.JS 15

### C1. Khởi Tạo Next.js Project

```powershell
cd D:\Projects\GoatWeddings

# Tạo Next.js project với App Router
npx create-next-app@latest frontend --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Chọn các options:

| Câu hỏi | Lựa chọn |
|---------|----------|
| Would you like to use TypeScript? | Yes |
| Would you like to use ESLint? | Yes |
| Would you like to use Tailwind CSS? | Yes |
| Would you like to use `src/` directory? | Yes |
| Would you like to use App Router? | Yes |
| Would you like to customize the default import alias? | Yes (@/*) |

### C2. Cài Đặt Dependencies

```powershell
cd D:\Projects\GoatWeddings\frontend

# UI Components
npm install @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-select @radix-ui/react-toast @radix-ui/react-tabs

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

# Dev Dependencies
npm install -D @types/node prettier prettier-plugin-tailwindcss
```

### C3. Cấu Trúc Thư Mục Frontend

```
frontend/
├── src/
│   ├── app/                           # App Router
│   │   ├── (auth)/                    # Auth layout group
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── forgot-password/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (dashboard)/               # Dashboard layout group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   │
│   │   │   ├── halls/                 # Quản lý sảnh (BM1)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── foods/                 # Quản lý món ăn
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── services/              # Quản lý dịch vụ
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── bookings/              # Đặt tiệc cưới (BM2, BM3)
│   │   │   │   ├── page.tsx           # Danh sách & tra cứu
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx       # Chi tiết
│   │   │   │   └── new/
│   │   │   │       └── page.tsx       # Tạo mới
│   │   │   │
│   │   │   ├── invoices/              # Hóa đơn (BM4)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── new/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── reports/               # Báo cáo (BM5)
│   │   │   │   ├── page.tsx
│   │   │   │   └── monthly/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── settings/              # Cài đặt (QĐ6)
│   │   │   │   ├── page.tsx
│   │   │   │   ├── hall-types/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── regulations/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   ├── users/                 # Quản lý user
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx
│   │   │   │
│   │   │   └── layout.tsx             # Dashboard layout
│   │   │
│   │   ├── api/                       # API Routes (nếu cần)
│   │   │   └── health/
│   │   │       └── route.ts
│   │   │
│   │   ├── layout.tsx                 # Root layout
│   │   ├── page.tsx                   # Home page (redirect)
│   │   ├── loading.tsx                # Global loading
│   │   ├── error.tsx                  # Global error
│   │   ├── not-found.tsx              # 404 page
│   │   └── globals.css                # Global styles
│   │
│   ├── components/                    # Shared components
│   │   ├── ui/                        # Base UI components
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── select.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── toast.tsx
│   │   │   ├── table.tsx
│   │   │   ├── card.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   ├── form.tsx
│   │   │   ├── label.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── spinner.tsx
│   │   │   └── index.ts               # Barrel export
│   │   │
│   │   ├── layout/                    # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── nav-item.tsx
│   │   │   ├── user-menu.tsx
│   │   │   └── breadcrumb.tsx
│   │   │
│   │   ├── forms/                     # Form components
│   │   │   ├── booking-form.tsx
│   │   │   ├── hall-form.tsx
│   │   │   ├── food-form.tsx
│   │   │   ├── service-form.tsx
│   │   │   ├── invoice-form.tsx
│   │   │   └── login-form.tsx
│   │   │
│   │   ├── tables/                    # Table components
│   │   │   ├── data-table.tsx
│   │   │   ├── bookings-table.tsx
│   │   │   ├── halls-table.tsx
│   │   │   ├── invoices-table.tsx
│   │   │   └── columns/
│   │   │       ├── booking-columns.tsx
│   │   │       └── invoice-columns.tsx
│   │   │
│   │   └── shared/                    # Shared components
│   │       ├── page-header.tsx
│   │       ├── confirm-dialog.tsx
│   │       ├── empty-state.tsx
│   │       ├── error-boundary.tsx
│   │       └── loading-screen.tsx
│   │
│   ├── hooks/                         # Custom hooks
│   │   ├── use-auth.ts
│   │   ├── use-toast.ts
│   │   ├── use-debounce.ts
│   │   ├── use-local-storage.ts
│   │   └── use-media-query.ts
│   │
│   ├── lib/                           # Utilities & configs
│   │   ├── api/                       # API client
│   │   │   ├── client.ts              # Axios instance
│   │   │   ├── auth.ts                # Auth APIs
│   │   │   ├── bookings.ts            # Booking APIs
│   │   │   ├── halls.ts               # Hall APIs
│   │   │   ├── foods.ts               # Food APIs
│   │   │   ├── services.ts            # Service APIs
│   │   │   ├── invoices.ts            # Invoice APIs
│   │   │   └── reports.ts             # Report APIs
│   │   │
│   │   ├── utils.ts                   # Utility functions
│   │   ├── constants.ts               # App constants
│   │   ├── validations.ts             # Zod schemas
│   │   └── formatters.ts              # Format functions
│   │
│   ├── stores/                        # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── ui-store.ts
│   │   └── index.ts
│   │
│   ├── types/                         # TypeScript types
│   │   ├── api.ts                     # API response types
│   │   ├── auth.ts
│   │   ├── booking.ts
│   │   ├── hall.ts
│   │   ├── food.ts
│   │   ├── service.ts
│   │   ├── invoice.ts
│   │   ├── report.ts
│   │   └── index.ts
│   │
│   ├── providers/                     # Context providers
│   │   ├── query-provider.tsx         # React Query
│   │   ├── auth-provider.tsx
│   │   ├── toast-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   └── config/                        # App config
│       ├── site.ts                    # Site metadata
│       ├── navigation.ts              # Nav items
│       └── env.ts                     # Environment vars
│
├── public/
│   ├── images/
│   │   └── logo.svg
│   └── favicon.ico
│
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .prettierrc
├── .eslintrc.json
└── package.json
```

### C4. Tạo Cấu Trúc Thư Mục Frontend

```powershell
cd D:\Projects\GoatWeddings\frontend

# App directories
mkdir -p "src/app/(auth)/login"
mkdir -p "src/app/(auth)/forgot-password"
mkdir -p "src/app/(dashboard)/dashboard"
mkdir -p "src/app/(dashboard)/halls/[id]"
mkdir -p "src/app/(dashboard)/halls/new"
mkdir -p "src/app/(dashboard)/foods/[id]"
mkdir -p "src/app/(dashboard)/services/[id]"
mkdir -p "src/app/(dashboard)/bookings/[id]"
mkdir -p "src/app/(dashboard)/bookings/new"
mkdir -p "src/app/(dashboard)/invoices/[id]"
mkdir -p "src/app/(dashboard)/invoices/new"
mkdir -p "src/app/(dashboard)/reports/monthly"
mkdir -p "src/app/(dashboard)/settings/hall-types"
mkdir -p "src/app/(dashboard)/settings/regulations"
mkdir -p "src/app/(dashboard)/users/[id]"
mkdir -p "src/app/api/health"

# Components
mkdir -p src/components/ui
mkdir -p src/components/layout
mkdir -p src/components/forms
mkdir -p src/components/tables/columns
mkdir -p src/components/shared

# Other directories
mkdir -p src/hooks
mkdir -p src/lib/api
mkdir -p src/stores
mkdir -p src/types
mkdir -p src/providers
mkdir -p src/config

# Public
mkdir -p public/images
```

### C5. File Cấu Hình Frontend

**.env.local**
```env
# API
NEXT_PUBLIC_API_URL=http://localhost:8080/api

# App
NEXT_PUBLIC_APP_NAME=GoatWeddings
NEXT_PUBLIC_APP_VERSION=1.0.0
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
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

### C6. Chạy Frontend

```powershell
cd D:\Projects\GoatWeddings\frontend

# Chạy development server
npm run dev
```

Truy cập: http://localhost:3000

---

## PHẦN D: CẤU HÌNH SUPABASE DATABASE

### D1. Tạo Project Trên Supabase

1. Truy cập: https://supabase.com/
2. Đăng nhập/Đăng ký tài khoản
3. Click "New Project"
4. Điền thông tin:

| Field | Value |
|-------|-------|
| Name | goatweddings |
| Database Password | [Strong password] |
| Region | Southeast Asia (Singapore) |

### D2. Lấy Connection String

1. Vào Project Settings > Database
2. Copy Connection String (URI)

```
postgresql://postgres:[PASSWORD]@db.[PROJECT_REF].supabase.co:5432/postgres
```

### D3. Chạy SQL Schema

1. Vào SQL Editor trong Supabase Dashboard
2. Paste nội dung file `goatweddings_schema.sql`
3. Click "Run"

### D4. Cấu Hình Backend Kết Nối Supabase

Cập nhật `application-dev.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://db.[PROJECT_REF].supabase.co:5432/postgres
    username: postgres
    password: ${SUPABASE_DB_PASSWORD}
```

---

## PHẦN E: BƯỚC NÂNG CAO

### E1. Cấu Hình Git Repository

```powershell
cd D:\Projects\GoatWeddings

# Khởi tạo Git
git init

# Tạo .gitignore
@"
# IDE
.idea/
.vscode/
*.iml

# Backend
backend/target/
backend/*.log
backend/.mvn/

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

# Commit đầu tiên
git add .
git commit -m "Initial commit: Project structure setup"
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

**docker-compose.yml (Root)**
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=prod
      - DB_URL=${SUPABASE_DB_URL}
      - DB_USERNAME=${SUPABASE_DB_USER}
      - DB_PASSWORD=${SUPABASE_DB_PASSWORD}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - redis

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8080/api
    depends_on:
      - backend

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
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

### E4. Railway Deployment

1. Truy cập: https://railway.app/
2. Kết nối GitHub repository
3. Tạo 2 services: Backend và Frontend
4. Cấu hình Environment Variables
5. Deploy

### E5. Security Checklist

| Kỹ thuật bảo mật | Implementation |
|------------------|----------------|
| SQL Injection | JPA Parameterized Queries, Input Validation |
| XSS | OWASP Encoder, Content-Security-Policy |
| CSRF | CSRF Token, SameSite Cookie |
| Authentication | JWT + Refresh Token, BCrypt |
| Access Control | Spring Security RBAC, RLS |
| Path Traversal | Whitelist file paths |
| Command Injection | Avoid Runtime.exec() |
| File Upload | File type validation, size limit |
| SSRF | URL whitelist, disable redirects |
| Information Disclosure | Custom error messages |

### E6. Testing Strategy

| Loại Test | Framework | Thư mục |
|-----------|-----------|---------|
| Unit Test (Backend) | JUnit 5, Mockito | src/test/java/.../modules |
| Integration Test | Spring Boot Test | src/test/java/.../integration |
| Unit Test (Frontend) | Jest, React Testing Library | __tests__/ |
| E2E Test | Playwright | e2e/ |

---

## CHECKLIST KHỞI TẠO

| Bước | Mô tả | Trạng thái |
|------|-------|------------|
| 1 | Cài đặt JDK 21 | [ ] |
| 2 | Cài đặt Node.js 20+ | [ ] |
| 3 | Cài đặt VS Code Extensions | [ ] |
| 4 | Tạo thư mục dự án | [ ] |
| 5 | Khởi tạo Spring Boot Backend | [ ] |
| 6 | Tạo cấu trúc thư mục Backend | [ ] |
| 7 | Khởi tạo Next.js Frontend | [ ] |
| 8 | Tạo cấu trúc thư mục Frontend | [ ] |
| 9 | Tạo Supabase Project | [ ] |
| 10 | Chạy SQL Schema | [ ] |
| 11 | Kết nối Backend - Supabase | [ ] |
| 12 | Test API với Swagger | [ ] |
| 13 | Test Frontend | [ ] |
| 14 | Git init và commit | [ ] |
| 15 | Setup Docker (Optional) | [ ] |
| 16 | Setup CI/CD (Optional) | [ ] |

---

## TÀI LIỆU THAM KHẢO

| Tài liệu | URL |
|----------|-----|
| Spring Boot Docs | https://docs.spring.io/spring-boot/docs/current/reference/html/ |
| Spring Security | https://docs.spring.io/spring-security/reference/ |
| Next.js Docs | https://nextjs.org/docs |
| Tailwind CSS | https://tailwindcss.com/docs |
| Supabase Docs | https://supabase.com/docs |
| React Query | https://tanstack.com/query/latest |

---

**Tác giả:** GoatWeddings Team  
**Phiên bản:** 1.0.0  
**Cập nhật:** 2025

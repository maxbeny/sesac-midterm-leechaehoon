# 백엔드 과제 가이드

백엔드 과제에 대한 요구사항 및 채점 항목에 대한 안내 가이드입니다.

## 목차

1. [개요](#1-개요)
2. [프로젝트구조](#2-프로젝트-구조)
3. [기능 요구사항 및 배점](#3-기능-요구사항-및-배점)

## 1. 개요

- Todo를 관리하는 백엔드 과제입니다.
- 프론트엔드 과제 연동없이 REST API 서버의 역할만 구현하면 됩니다.
- 과제는 **10점 만점**이며 미준수 시 감점되는 항목은 별도로 표시해두었으니 반드시 숙지해주세요.
  - 해당 과제의 최저점은 2점 입니다. (기본점수 2점)
- 해당 과제의 평가 요소는 코드가 얼마나 효율적인가 등이 아닌 **평가 가이드에 맞추어 코드를 작성했는가** 이므로 가이드에 따라 과제를 구현해주세요.

## 2. 프로젝트 구조

프로젝트 구조는 MVC 패턴을 따릅니다. 폴더명과 파일명은 다음과 같이 만들어져 있습니다.
(\*파일 삭제 및 추가시 1점 감점)

```txt
backend/
ㄴ config/
    ㄴ config.json
ㄴ controller/
    ㄴ Ctodo.js
ㄴ models/
    ㄴ index.js
    ㄴ Todo.js
ㄴ node_modules/
ㄴ routes/
    ㄴ todo.js
ㄴ api.http
ㄴ app.js
ㄴ package-lock.json
ㄴ package.json
```

### 2.1. config/config.json

- 데이터베이스 설정 정보를 기록하는 JSON 파일입니다.
- 원활한 채점을 위해 로컬 데이터베이스가 아닌 AWS RDS를 사용하여 데이터베이스 설정 정보는 제공됩니다. [제공된 가이드](https://uncovered-nutmeg-b8e.notion.site/MySQL-Workbench-55565fdb537249d6a4bf667ab9fe12eb?pvs=4)에 따라 데이터베이스에 연결하여 프로젝트를 진행해주세요.

  ```json
  {
    "development": {
      "username": "user_숫자",
      "password": "codingon_숫자",
      "database": "db_숫자",
      "host": "sesac.crc4ixxthqzf.ap-northeast-2.rds.amazonaws.com",
      "dialect": "mysql"
    }
  }
  > json 파일 예시
  ```

### 2.2 contoller/Ctodo.js

- 컨트롤러 코드를 정의하는 파일입니다.

### 2.3 models/

- 모델 관련 코드를 정의하는 파일입니다. 해당 프로젝트에서는 `sequelize` 를 사용하여 프로젝트를 작성해야 합니다.
- `index.js`: sequelize 관련 설정 코드를 기입해두었습니다.
- `Todo.js`: 해당 프로젝트는 단일 테이블(Todo)를 사용합니다. 해당 파일은 Todo 테이블에 연결할 Todo 모델을 정의해두었습니다.

### 2.3 routes/todo.js

- 라우터를 정의하는 파일입니다.

### 2.4 app.js

- 해당 프로젝트의 진입점에 해당하는 파일입니다.

### 2.5 api.http

- 해당 프로젝를 채점할 때 사용할 REST API 테스트 문서입니다.

## 3. 기능 요구사항 및 배점

3.1. [Todo 전체 조회](#32-todo-전체-조회-총-배점-25점)  
3.2. [Todo 추가](#33-todo-추가-총-배점-25점)  
3.3. [특정 ID의 Todo 조회](#34-특정-id의-todo-조회-총-배점-25점)  
3.4. [특정 ID의 Todo 수정](#35-특정-id의-todo-수정-총-배점-25점)  
3.5. [특정 ID의 Todo 삭제](#36-특정-id의-todo-삭제-총-배점-25점)

> 채점 시나리오 대로 기능 요구사항을 정의하였습니다. 구현 안내 사항을 지키지 않을 경우, 감점 처리되거나 채점이 어렵습니다.

- `node_modules/` 폴더는 .gitignore 파일에 추가하여 Git 으로 관리되지 않도록 만들어두었습니다.
- port 는 `8080` 으로 설정해두었습니다. (\*변경 시 1점 감점)
- 데이터베이스는 `MySQL` 을 사용해야 합니다.
- ORM 으로 `sequelize` 를 사용해야 합니다.

### 3.1 Todo 전체 조회 (총 배점 2점)

#### 채점 가이드

- (배점 2점) 전체 Todo 목록이 보이는가?

#### 요구사항

> API 명세

```http
### 투두 전체 조회
GET http://localhost:8080/todos
```

> Response Ex

```json
[
  {
    "id": 1,
    "title": "아침 운동하기",
    "done": false,
    "createdAt": "2024-07-29T04:56:21.000Z",
    "updatedAt": "2024-07-29T04:56:21.000Z"
  },
  {
    "id": 2,
    "title": "점심 식사 준비하기",
    "done": false,
    "createdAt": "2024-07-29T04:56:21.000Z",
    "updatedAt": "2024-07-29T04:56:21.000Z"
  },
  {
    "id": 3,
    "title": "저녁에 책 읽기",
    "done": false,
    "createdAt": "2024-07-29T04:56:21.000Z",
    "updatedAt": "2024-07-29T04:56:21.000Z"
  },
  {
    "id": 4,
    "title": "코딩 과제 완성하기",
    "done": false,
    "createdAt": "2024-07-29T04:56:21.000Z",
    "updatedAt": "2024-07-29T04:56:21.000Z"
  }
]
```

### 3.2 Todo 추가 (총 배점 1.5점)

#### 채점 가이드

- (배점 1점) 요청의 본문에 `title` 필드만 작성하거나 `title`, `done` 필드 모두 작성하는 경우, Todo 항목이 추가되는가?
- (배점 0.5점) 요청의 본문에 `done` 필드만 작성하는 경우, Todo 항목이 추가되지 않고 에러 메세지가 나오는가?

#### 3.2.1 요청의 본문에 `title`, `done` 필드 모두 작성하는 경우

> API 명세

```http
### 투두 생성
POST http://localhost:8080/todos
Content-Type: application/json; charset=UTF-8

{
  "title": "점심 맛있게 먹기",
  "done": true
}
```

> Response Ex

```json
{
  "id": 5,
  "title": "점심 맛있게 먹기",
  "done": true,
  "updatedAt": "2024-07-29T06:31:24.894Z",
  "createdAt": "2024-07-29T06:31:24.894Z"
}
```

#### 3.2.2 요청의 본문에 `title` 필드만 작성하는 경우

- `todo` 모델 정의 시 `done` 필드에 기본값(`false`)이 설정되어 있으므로 `title` 필드 값만 요청의 본문에 실어도 문제 없이 동작해야 합니다.

> API 명세

```http
### 투두 생성
POST http://localhost:8080/todos
Content-Type: application/json; charset=UTF-8

{
  "title": "책 읽기"
}

```

> Response Ex

```json
{
  "done": false,
  "id": 6,
  "title": "책 읽기",
  "updatedAt": "2024-07-29T06:31:46.163Z",
  "createdAt": "2024-07-29T06:31:46.163Z"
}
```

#### 3.2.3 요청의 본문에 `done` 필드만 작성하는 경우

- `todo` 모델 정의 시 `title` 필드는 `null`을 허용하지 않으며, 기본값이 없으므로 요청의 본문에 `done` 필드만 넣는 경우 서버 에러가 발생합니다.

> API 명세

```http
### 투두 생성
POST http://localhost:8080/todos
Content-Type: application/json; charset=UTF-8

{
  "done": false
}
```

> Response Ex

```json
{
  "message": "Internal Server Error"
}
```

### 3.3 특정 ID의 Todo 조회 (총 배점 1.5점)

#### 채점 가이드

- (배점 1점) 존재하는 Todo ID 로 조회하는 경우, 데이터가 잘 응답되는가?
- (배점 0.5점) 존재하지 않는 Todo ID 로 조회하는 경우, 에러 메세지가 잘 응답되는가?

#### 3.3.1 존재하는 Todo ID 로 조회하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 조회
GET http://localhost:8080/todos/1
```

> Response Ex

```json
{
  "id": 1,
  "title": "아침 운동하기",
  "done": false,
  "createdAt": "2024-07-29T04:56:21.000Z",
  "updatedAt": "2024-07-29T04:56:21.000Z"
}
```

#### 3.3.2 존재하지 않는 Todo ID 로 조회하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 조회
GET http://localhost:8080/todos/10
```

> Response Ex

```json
{
  "message": "Todo not found"
}
```

### 3.4 특정 ID의 Todo 수정 (총 배점 1.5점)

#### 채점 가이드

- (배점 1점) 존재하는 Todo ID 로 수정하는 경우, Todo가 잘 수정되는가?
  - Todo 는 `title`, `done` 두 속성에 대해 수정 가능합니다.
  - 두 속성 중 하나라도 수정되었다면 `updatedAt` 컬럼 값이 변경됩니다.
- (배점 0.5점) 존재하지 않는 Todo ID 로 삭제하는 경우, 에러 메세지가 잘 응답되는가?

#### 3.4.1 존재하는 Todo ID 로 수정하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 수정
PATCH http://localhost:8080/todos/2
Content-Type: application/json; charset=UTF-8

{
  "done": true
}
```

> Response Ex

```json
{
  "id": 2,
  "title": "점심 식사 준비하기",
  "done": true,
  "createdAt": "2024-07-29T04:56:21.000Z",
  "updatedAt": "2024-07-29T05:04:52.000Z"
}
```

#### 3.4.2 존재하지 않는 Todo ID 로 수정하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 수정
PATCH http://localhost:8080/todos/10
Content-Type: application/json; charset=UTF-8

{
  "done": true
}
```

> Response Ex

```json
{
  "message": "Todo not found"
}
```

### 3.5 특정 ID의 Todo 삭제 (총 배점 1.5점)

#### 채점 가이드

- (배점 1점) 존재하는 Todo ID 로 삭제하는 경우, Todo가 잘 삭제되는가?
- (배점 0.5점) 존재하지 않는 Todo ID 로 삭제하는 경우, 에러 메세지가 잘 응답되는가?

#### 3.5.1 존재하는 Todo ID 로 삭제하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 삭제
DELETE http://localhost:8080/todos/1
```

> Response Ex

```json
{
  "message": "Todo deleted successfully",
  "deletedId": "1"
}
```

#### 3.5.2 존재하지 않는 Todo ID 로 삭제하는 경우

> API 명세

```http
### 특정 ID를 갖는 투두 삭제
DELETE http://localhost:8080/todos/10
```

> Response Ex

```json
{
  "message": "Todo not found"
}
```

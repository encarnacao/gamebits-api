# typescript-poc

Proof of Concept for TypeScript Study

This is a simple project to study TypeScript. It's an API of a review aggregator for videogames with a simple CRUD of reviews and users, using Prisma as ORM and PostgreSQL as database.

## How to run

1. Clone this repository
2. Install dependencies with `npm install`
3. Create a PostgreSQL database, there's a script in root folder to create the database and the tables
4. Configure .env file with your database credentials
5. Run `npm run prisma:generate` to generate the Prisma Client
6. Run `npm run dev` to start the server

## Simple API Documentation

### User Routes

<details>
<summary><code>POST</code> <code>/users/signup</code></summary>

Body

```json
{
	"name": "John Doe",
	"email": "john@email.com",
	"password": "secretpassword",
	"picture_url": "https://picsum.photos/300/300"
}
```

Response - `201 CREATED`

```json
{
	"id": "1",
	"name": "John Doe",
	"email": "john@email.com",
	"picture_url": "https://picsum.photos/300/300",
	"created_at": "2021-03-01T00:00:00.000Z"
}
```

</details>

---

<details>
<summary><code>POST</code> <code>/users/signin</code></summary>

Body

```json
{
	"email": "john@email.com",
	"password": "secretpassword"
}
```

Response - `200 OK`

```json
{
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImlhdCI6MTY4MTA1Mzc2N30.5ZUfRvvETQcJ57_PxF7v7mkdO-nZpa3C9QR1g1PEcXY"
}
```

</details>

### Review Routes

<details>
<summary><code>POST</code> <code>/reviews</code> - Authenticated Route</summary>

Body

```json
{
	"rating": 6.5,
	"review": "This game is Ok",
	"game": "Castlevania: Rondo of Blood"
}
```

Response - `201 CREATED`

```json
{
	"id": 3,
	"user_id": 1,
	"game_id": 2,
	"rating": "6.5",
	"review": "This game is Ok",
	"created_at": "2023-04-09T19:20:24.755Z"
}
```

</details>

---

<details>
<summary><code>GET</code> <code>/reviews</code></summary>

Query Params:
| Key | Type | Data type | Description |
| --- | --- | --- | --- |
| user | Optional| string | User name |
| game |  Optional | string | Game name |


Response - `200 OK`

```json
[
    {
        "id": 3,
        "username_id": 1,
        "username": "John Doe",
        "picture_url": "https://picsum.photos/300/300",
        "game": "Castlevania: Rondo of Blood",
        "rating": "6.5",
        "review_text": "This game is Ok",
        "comments": [
            {
                "id": 4,
                "username_id": 2,
                "username": "Caio",
                "picture_url": null,
                "comment_text": "Good Review"
            }
        ]
    }
]
```
</details>

### Comment Routes

<details>
<summary><code>POST</code> <code>/comments/:review_id</code> - Authenticated Route</summary>

Body

```json
{
    "comment": "Good Review!"
}
```

Response - `201 CREATED`

```json
{
    "id": 4,
    "review_id": 3,
    "user_id": 2,
    "text": "Good Review",
    "created_at": "2023-04-09T19:20:24.755Z"
}
```
</details>

---
<details>
<summary><code>PUT</code> <code>/comments/:comment_id</code> - Authenticated Route</summary>
Body

```json
{
    "comment": "New Text!"
}
```

Response - `200 OK`

```json
{
    "id": 4,
    "review_id": 3,
    "user_id": 2,
    "text": "New Text!",
    "created_at": "2023-04-09T19:20:24.755Z"
}
```
</details>

---
<details>
<summary><code>DELETE</code> <code>/comments/:comment_id</code> - Authenticated Route</summary>

Response - `204 NO CONTENT`

</details>
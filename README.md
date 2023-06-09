# GameBits - A Review Aggregator for Videogames

This started as a simple project to study TypeScript, as a Proof of Concept, and I plan to keep working on it. It's an API of a review aggregator for videogames with a simple CRUD of reviews and users, using Prisma as ORM and PostgreSQL as database. It also has a simple authentication system using JWT. I'm also using the IGDB database to search for games and ocasionally populate my own database. Other technologies used in this project are:

-   Express
-   Express Async Erros
-   JOI
-   Bcrypt

## How to run

1. Clone this repository
2. Install dependencies with `npm install`
3. Configure .env file with your database credentials, you need to create a PostgreSQL database and a user with access to it.
4. Create a PostgreSQL database using migrations with `npm run prisma:migrate`
5. Run `npm run prisma:generate` to generate the Prisma Client
6. Optional: You can seed the database with some data using `npm run prisma:seed`, this will create a user with usernaem `first_user`, email `user@email.com` and password `123456`
7. Run `npm run dev` to start the server

## Simple API Documentation

### User Routes

<details>
<summary><code>POST</code> <code>/users/signup</code></summary>

Body

```json
{
	"username": "JohnDoede",
	"email": "john@email.com",
	"password": "secretpassword",
}
```

Response - `201 CREATED`

```json
{
	"id": "1",
	"username": "JohnDoede",
	"email": "john@email.com",
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

### Games Routes

<details>
<summary><code>POST</code> <code>/games</code></summary>
Query Params:

| Key  | Type     | Data type | Description |
| ---- | -------- | --------- | ----------- |
| name | Required | string    | Game name   |

Response - `200 OK`

```json
[
	{
        "id": 239064,
        "coverUrl": "https://images.igdb.com/igdb/image/upload/t_cover_big/co66qs.jpg",
        "name": "Grand Theft Auto V",
        "releaseDate": "14/06/2022",
        "platformNames": "PS4, XONE, PS5, Series X",
        "summary": "This bundle contains the original version of Grand Theft Auto V, the standalone game Grand Theft Auto Online and the story mode add-on of Grand Theft Auto V."
    },
]
```
</details>

## Features

-   [x] Create User
-   [x] Login
-   [X] Search Games


## Planned Features

I'm planning to continue this project, so I'll add more features in the future.
-   [ ] Create Review
-   [ ] Comment Review
-   [ ] Delete Comments
-   [ ] Edit Comments
-   [ ] Edit Review
-   [ ] Delete Review
-   [ ] Follow Users
-   [ ] Add completion time to reviews
-   [ ] Add review images
-   [ ] Integrate with an Game Database API to get more information about games
-   [ ] Implement testing

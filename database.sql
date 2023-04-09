CREATE TABLE "users" (
    "id" serial NOT NULL,
    "name" varchar(50) NOT NULL,
    "picture_url" TEXT,
    "email" varchar(60) NOT NULL UNIQUE,
    "password" varchar(60) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "users_pk" PRIMARY KEY ("id")
);

CREATE TYPE rating_value AS ENUM (
    '0',
    '0.5',
    '1',
    '1.5',
    '2',
    '2.5',
    '3',
    '3.5',
    '4',
    '4.5',
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10'
);

CREATE TABLE "reviews" (
    "id" serial NOT NULL,
    "user_id" int NOT NULL,
    "game_id" int NOT NULL,
    "rating" rating_value NOT NULL,
    "review" TEXT NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "reviews_pk" PRIMARY KEY ("id")
);

CREATE TABLE "games" (
    "id" serial NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "games_pk" PRIMARY KEY ("id")
);

CREATE TABLE "comments" (
    "id" serial NOT NULL,
    "review_id" int NOT NULL,
    "user_id" int NOT NULL,
    "text" varchar(250) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT NOW(),
    CONSTRAINT "comments_pk" PRIMARY KEY ("id")
);

ALTER TABLE
    "reviews"
ADD
    CONSTRAINT "reviews_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;

ALTER TABLE
    "reviews"
ADD
    CONSTRAINT "reviews_fk1" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE;

ALTER TABLE
    "comments"
ADD
    CONSTRAINT "comments_fk0" FOREIGN KEY ("review_id") REFERENCES "reviews"("id") ON DELETE CASCADE;

ALTER TABLE
    "comments"
ADD
    CONSTRAINT "comments_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;
/* Replace with your SQL commands */
CREATE TABLE "books" (
    "id" SERIAL PRIMARY KEY,
    "title" varchar(255),
    "author" varchar(255),
    "published_at" timestamptz,
    "created_at" timestamptz DEFAULT NOW(),
    "updated_at" timestamptz DEFAULT NOW()
);
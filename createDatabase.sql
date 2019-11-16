CREATE DATABASE dadjokes;

\connect dadjokes

CREATE TABLE jokes
(
    joke_id bigserial PRIMARY KEY,
    joke_text text
);

CREATE TABLE tellings
(
    telling_id bigserial PRIMARY KEY,
    teller text NOT NULL,
    joke_id bigint NOT NULL references jokes(joke_id),
    joke_time timestamp NOT NULL DEFAULT now()
);

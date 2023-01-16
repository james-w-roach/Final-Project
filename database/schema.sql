set client_min_messages to warning;

create schema if not exists "public";

create table if not exists "public"."itineraries" (
  "tripId"      serial,
  "tripName"    text           not null,
  "locations"   json           not null,
  "userId"      integer           not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("tripId")
);

create table if not exists "public"."users" (
  "userId"         serial,
  "username"       text           not null,
  "hashedPassword" text           not null,
  "createdAt"      timestamptz(6) not null default now(),
  primary key ("userId"),
  unique ("username")
);

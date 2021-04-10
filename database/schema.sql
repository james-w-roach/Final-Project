set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

create table "public"."itineraries" (
  "tripId"      serial,
  "tripName"    text           not null,
  "locations"   text           not null,
  "createdAt"   timestamptz(6) not null default now(),
  primary key ("tripId")
);

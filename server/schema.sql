CREATE SCHEMA IF NOT EXISTS "public";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-----------------------------
-- users
-----------------------------
CREATE TABLE "public"."users" (
  "id" uuid DEFAULT uuid_generate_v4(),
  "name" character varying(128) NOT NULL,
  "email" character varying(128) NOT NULL UNIQUE,
  "created_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY ("id")
);

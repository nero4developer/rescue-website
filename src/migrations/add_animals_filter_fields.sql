-- Add temperament, goodWith, special hasMany select fields to animals
-- Run this in Supabase SQL Editor > "Run without RLS" before restarting the dev server

CREATE TYPE "public"."enum_animals_temperament" AS ENUM(
  'calm-gentle',
  'playful-energetic',
  'shy-patience',
  'social-butterfly',
  'independent'
);

CREATE TYPE "public"."enum_animals_good_with" AS ENUM(
  'children',
  'other-dogs',
  'cats',
  'first-time-owners'
);

CREATE TYPE "public"."enum_animals_special" AS ENUM(
  'urgent',
  'quirky',
  'senior'
);

CREATE TABLE "animals_temperament" (
  "order" integer NOT NULL,
  "parent_id" integer NOT NULL,
  "value" "enum_animals_temperament",
  "id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE "animals_good_with" (
  "order" integer NOT NULL,
  "parent_id" integer NOT NULL,
  "value" "enum_animals_good_with",
  "id" serial PRIMARY KEY NOT NULL
);

CREATE TABLE "animals_special" (
  "order" integer NOT NULL,
  "parent_id" integer NOT NULL,
  "value" "enum_animals_special",
  "id" serial PRIMARY KEY NOT NULL
);

ALTER TABLE "animals_temperament"
  ADD CONSTRAINT "animals_temperament_parent_fk"
  FOREIGN KEY ("parent_id") REFERENCES "public"."animals"("id")
  ON DELETE cascade ON UPDATE no action;

ALTER TABLE "animals_good_with"
  ADD CONSTRAINT "animals_good_with_parent_fk"
  FOREIGN KEY ("parent_id") REFERENCES "public"."animals"("id")
  ON DELETE cascade ON UPDATE no action;

ALTER TABLE "animals_special"
  ADD CONSTRAINT "animals_special_parent_fk"
  FOREIGN KEY ("parent_id") REFERENCES "public"."animals"("id")
  ON DELETE cascade ON UPDATE no action;

CREATE INDEX "animals_temperament_order_idx" ON "animals_temperament" USING btree ("order");
CREATE INDEX "animals_temperament_parent_idx" ON "animals_temperament" USING btree ("parent_id");
CREATE INDEX "animals_good_with_order_idx" ON "animals_good_with" USING btree ("order");
CREATE INDEX "animals_good_with_parent_idx" ON "animals_good_with" USING btree ("parent_id");
CREATE INDEX "animals_special_order_idx" ON "animals_special" USING btree ("order");
CREATE INDEX "animals_special_parent_idx" ON "animals_special" USING btree ("parent_id");

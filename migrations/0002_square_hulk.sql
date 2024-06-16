CREATE TABLE IF NOT EXISTS "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "users_table_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "tasks_table" RENAME COLUMN "createdAt" TO "created_at";--> statement-breakpoint
ALTER TABLE "tasks_table" RENAME COLUMN "updatedAt" TO "updated_at";--> statement-breakpoint
ALTER TABLE "tasks_table" ADD COLUMN "user_id" integer;
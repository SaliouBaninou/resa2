CREATE TYPE "public"."automation_detail_type" AS ENUM('TYPE', 'CONTRIBUTION', 'OBSTACLE', 'AUTRE');--> statement-breakpoint
CREATE TABLE "automation_details" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"response_id" uuid NOT NULL,
	"type" "automation_detail_type" NOT NULL,
	"label" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "responses" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"fonction" text NOT NULL,
	"departement" text NOT NULL,
	"anciennete" integer,
	"procedes_automatises" text NOT NULL,
	"niveau_automatisation" text,
	"impact_productivite" integer,
	"impact_qualite" integer,
	"competences_locales" text,
	"impact_moyen_long_terme" text,
	"recommandations" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "automation_details" ADD CONSTRAINT "automation_details_response_id_responses_id_fk" FOREIGN KEY ("response_id") REFERENCES "public"."responses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "responses" ADD CONSTRAINT "responses_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE cascade ON UPDATE no action;
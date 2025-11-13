import { pgTable, text, timestamp, boolean, uuid, integer, pgEnum } from "drizzle-orm/pg-core";

// ===============================
// ENUMS
// ===============================

// Type d'enregistrement dans la table automation_details
export const automationDetailType = pgEnum("automation_detail_type", [
  "TYPE",          // Types d’automatisation utilisés
  "CONTRIBUTION",  // Contributions (réduction des coûts, rapidité, etc.)
  "OBSTACLE",      // Obstacles à l’automatisation
  "AUTRE"          // Pour ajouter d’autres catégories si besoin
]);

// ===============================
// TABLES PRINCIPALES
// ===============================

// Entreprises
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(), // Nom de l’entreprise
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Réponses du questionnaire
export const responses = pgTable("responses", {
  id: uuid("id").defaultRandom().primaryKey(),

  companyId: uuid("company_id")
    .references(() => companies.id, { onDelete: "cascade" })
    .notNull(),

  fonction: text("fonction").notNull(), // Fonction dans l’entreprise
  departement: text("departement").notNull(), // Département / Service
  anciennete: integer("anciennete"), // Ancienneté (en mois)

  procedesAutomatises: text("procedes_automatises").notNull(), // Oui / Non / Partiellement
  niveauAutomatisation: text("niveau_automatisation"), // Très faible / Faible / Moyen / Élevé / Très élevé

  impactProductivite: integer("impact_productivite"), // Note 1–5
  impactQualite: integer("impact_qualite"), // Note 1–5

  competencesLocales: text("competences_locales"), // Oui largement / limitées / insuffisantes

  impactMoyenLongTerme: text("impact_moyen_long_terme"), // Champ texte libre
  recommandations: text("recommandations"), // Champ texte libre

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Détails de l’automatisation (choix multiples)
export const automationDetails = pgTable("automation_details", {
  id: uuid("id").defaultRandom().primaryKey(),

  responseId: uuid("response_id")
    .references(() => responses.id, { onDelete: "cascade" })
    .notNull(),

  type: automationDetailType("type").notNull(), // TYPE, CONTRIBUTION, OBSTACLE, AUTRE
  label: text("label").notNull(), // Exemple: "Automates programmables"

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});




export const schema = {user, session, account, verification};
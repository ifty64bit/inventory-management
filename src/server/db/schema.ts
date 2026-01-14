import { relations } from "drizzle-orm";
import {
	boolean,
	integer,
	jsonb,
	pgTable,
	serial,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { timestamps } from "./columns.helpers";

export const users = pgTable("users", {
	id: serial().primaryKey(),
	name: text("name").notNull(),
	username: text("username").notNull().unique(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull().default(false),
	image: text("image"),
	...timestamps,
});

export const sessions = pgTable("sessions", {
	id: serial("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	ipAddress: text("ip_address").notNull(),
	userAgent: text("user_agent").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	...timestamps,
});

export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey(),
	accountId: text("account_id").notNull().unique(),
	providerId: text("provider_id").notNull(),
	userId: integer("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	...timestamps,
});

export const verifications = pgTable("verifications", {
	id: serial("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	...timestamps,
});

export const itemTypes = pgTable("item_types", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description"),
	schema: jsonb("schema")
		.$type<{
			fields: Array<{
				key: string;
				type: "string" | "number" | "boolean";
				label: string;
			}>;
		}>()
		.notNull(),
	...timestamps,
});

export const itemTypesRelations = relations(itemTypes, ({ many }) => ({
	items: many(items),
}));

export const items = pgTable("items", {
	id: serial("id").primaryKey(),
	name: text("name").notNull(),
	sku: text("sku").notNull().unique(),
	typeId: integer("type_id")
		.notNull()
		.references(() => itemTypes.id, { onDelete: "cascade" }),
	attributes: jsonb("attributes").$type<Record<string, any>>().notNull(),
	...timestamps,
});

export const itemsRelations = relations(items, ({ one }) => ({
	type: one(itemTypes, {
		fields: [items.typeId],
		references: [itemTypes.id],
	}),
}));

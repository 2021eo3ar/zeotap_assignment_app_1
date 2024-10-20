import { pgTable, text, jsonb, serial } from 'drizzle-orm/pg-core';

export const rules = pgTable('rules', {
  id: serial('id').primaryKey(),
  ruleName: text('rule_name').notNull(),
  ast: jsonb('ast').notNull(), // Store AST as a JSON object
  createdAt: text('created_at').default('NOW()'),
});

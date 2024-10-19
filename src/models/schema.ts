import { pgTable,serial,text } from "drizzle-orm/pg-core";


export const rules = pgTable("rules", {
    id : serial("id").primaryKey(),
    rule_string : text("rule-string"),
    ast : text('ast')
})
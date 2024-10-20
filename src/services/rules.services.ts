// services/rule.service.ts

import postgresdb from "../config/db.config"; // Database configuration
import { rules } from "../models/schema"; // Drizzle ORM schema
import { parseRuleStringToAST } from "../utils/ruleParser"; // AST parser for parsing rules
import { combineASTs } from "../utils/astCombiner"; // AST combiner utility
import { evaluateAST } from "../utils/astEvaluator"; // AST evaluator utility
import { eq, inArray } from "drizzle-orm";

// Service for creating a new rule
export const createRuleService = async (ruleName: string, ruleString: string) => {
  const ast = parseRuleStringToAST(ruleString);
  
  // Insert the rule into the database
  await postgresdb.insert(rules).values({
    ruleName,
    ast: JSON.stringify(ast), // Store AST as a JSON string if necessary
  });
  
  return { ruleName, ast }; // Return the created rule data
};

// Service for combining multiple rules by their IDs
export const combineRuleService = async (ruleIds: number[]) => {
  // Fetch rules based on the IDs
  const fetchedRules = await postgresdb
    .select()
    .from(rules)
    .where(inArray(rules.id, ruleIds));

  // Parse and combine the ASTs of the fetched rules
  const astList = fetchedRules.map((rule: any) => JSON.parse(rule.ast));
  const combinedAST = combineASTs(astList);

  return combinedAST; // Return the combined AST
};

// Service for evaluating a rule based on user data
export const evaluateRuleService = async (ruleId: number, userData: any) => {
  // Fetch the rule from the database
  const [rule]: any = await postgresdb
    .select()
    .from(rules)
    .where(eq(rules.id, ruleId)) // Use .eq() for filtering
    .limit(1); // Get only one record

  if (!rule) {
    throw new Error("Rule not found");
  }

  // Parse the rule's AST and evaluate it based on user data
  const ast: any = JSON.parse(rule.ast);
  const result = evaluateAST(ast, userData);

  return result; // Return the evaluation result
};

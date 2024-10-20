import { Request, Response } from "express";
import { createRuleService, combineRuleService, evaluateRuleService } from "../services/rules.services"; // Importing the service functions
import { validateRule } from "../validators/rules.validator"; // Validation utility

export const createRuleController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ruleName, ruleString } = req.body; 

    // Validate the rule string and AST
    const validatedRule = validateRule({ ruleString });
    if (!validatedRule) {
      return res.status(400).json({ message: "Invalid rule string" });
    }

    // Call the service to create a new rule
    const createdRule = await createRuleService(ruleName, ruleString);

    return res.status(201).json({ message: "Rule created successfully", createdRule });
  } catch (error) {
    console.error("Error in createRuleController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const combineRuleController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ruleIds } = req.body; 

    // Call the service to combine rules
    const combinedAST = await combineRuleService(ruleIds);

    return res.status(200).json({ message: "Rules combined successfully", combinedAST });
  } catch (error) {
    console.error("Error in combineRuleController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const evaluateRuleController = async (req: Request, res: Response): Promise<any> => {
  try {
    const { ruleId, userData } = req.body; 

    // Call the service to evaluate the rule
    const result = await evaluateRuleService(ruleId, userData);

    return res.status(200).json({ message: "Rule evaluated", result });
  } catch (error) {
    console.error("Error in evaluateRuleController:", error);
    res.status(500).json({ message: "Server error" });
  }
};

import { Router } from "express";
import { combineRuleController,evaluateRuleController,createRuleController } from "../controllers/rules.controller";

const router = Router();

router.post("/createRule", createRuleController),
router.post("/evaluateRule",combineRuleController),
router.post("/combine-rule",evaluateRuleController )

export default router
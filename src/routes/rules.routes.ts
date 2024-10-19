import { Router } from "express";
import { combieRuleController,evaluateRuleController,createRuleController } from "../controllers/rules.controller";

const router = Router();

router.post("/createRule", createRuleController),
router.post("/evaluateRule",combieRuleController),
router.post("/combine-rule",evaluateRuleController )

export default router
import {
  companies,
  responses,
  automationDetails,
  automationDetailType,
} from "../db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

export type Company = InferSelectModel<typeof companies>;
export type NewCompany = InferInsertModel<typeof companies>;

export type Response = InferSelectModel<typeof responses>;
export type NewResponse = InferInsertModel<typeof responses>;

export type AutomationDetail = InferSelectModel<typeof automationDetails>;
export type NewAutomationDetail = InferInsertModel<typeof automationDetails>;

export type AutomationDetailType = (typeof automationDetailType.enumValues)[number];

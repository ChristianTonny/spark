/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as assessments from "../assessments.js";
import type * as availabilitySlots from "../availabilitySlots.js";
import type * as bulkOperations from "../bulkOperations.js";
import type * as careerChats from "../careerChats.js";
import type * as careers from "../careers.js";
import type * as educators from "../educators.js";
import type * as mentorApplications from "../mentorApplications.js";
import type * as messages from "../messages.js";
import type * as migrations_fixRelatedCareerIds from "../migrations/fixRelatedCareerIds.js";
import type * as migrations from "../migrations.js";
import type * as notifications from "../notifications.js";
import type * as professionals from "../professionals.js";
import type * as savedCareers from "../savedCareers.js";
import type * as seed from "../seed.js";
import type * as studentProfiles from "../studentProfiles.js";
import type * as testHelpers from "../testHelpers.js";
import type * as userSettings from "../userSettings.js";
import type * as users from "../users.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  assessments: typeof assessments;
  availabilitySlots: typeof availabilitySlots;
  bulkOperations: typeof bulkOperations;
  careerChats: typeof careerChats;
  careers: typeof careers;
  educators: typeof educators;
  mentorApplications: typeof mentorApplications;
  messages: typeof messages;
  "migrations/fixRelatedCareerIds": typeof migrations_fixRelatedCareerIds;
  migrations: typeof migrations;
  notifications: typeof notifications;
  professionals: typeof professionals;
  savedCareers: typeof savedCareers;
  seed: typeof seed;
  studentProfiles: typeof studentProfiles;
  testHelpers: typeof testHelpers;
  userSettings: typeof userSettings;
  users: typeof users;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};

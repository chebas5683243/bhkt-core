import { Webhook } from "svix";
import {
  AUTHORIZED_PARTIES,
  CLERK_PUBLIC_KEY,
  CLERK_WEBHOOK_SECRET,
} from "../config";
import { preferencesRepo } from "../repositories";
import { ClerkServiceImpl } from "./ClerkServiceImpl";
import { SecurityServiceImpl } from "./SecurityServiceImpl";
import { PreferencesServiceImpl } from "./PreferencesServiceImpl";

export const preferencesService = new PreferencesServiceImpl({
  preferencesRepo,
});

export const securityService = new SecurityServiceImpl({
  config: {
    clerkPublickKey: CLERK_PUBLIC_KEY,
    authorizedParties: AUTHORIZED_PARTIES?.split(",") || [],
  },
});

export const clerkService = new ClerkServiceImpl({
  config: {
    clerkWebhookVerifier: new Webhook(CLERK_WEBHOOK_SECRET || ""),
  },
});

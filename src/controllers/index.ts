import { clerkService, securityService, preferencesService } from "../services";
import { PreferencesController } from "./PreferencesController";
import { SecurityController } from "./SecurityController";
import { ClerkController } from "./ClerkController";

export const preferencesController = new PreferencesController({
  service: preferencesService,
});

export const securityController = new SecurityController({
  securityService,
});

export const clerkController = new ClerkController({
  clerkService,
  preferencesService,
});

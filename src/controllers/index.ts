import { clerkService, securityService, settingsService } from "../services";
import { SettingsController } from "./SettingsController";
import { SecurityController } from "./SecurityController";
import { ClerkController } from "./ClerkController";

export const settingsController = new SettingsController({
  service: settingsService,
});

export const securityController = new SecurityController({
  securityService,
});

export const clerkController = new ClerkController({
  clerkService,
  settingsService,
});

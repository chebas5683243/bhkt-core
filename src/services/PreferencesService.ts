import { Preferences } from "../domains/Preferences";

export interface PreferencesService {
  findByUserId(preferences: Preferences): Promise<Preferences>;
  update(preferences: Preferences): Promise<Preferences>;
  createDefaultPreferences(userId: string): Promise<Preferences>;
}

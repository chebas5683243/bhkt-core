import { Preferences } from "../domains/Preferences";

export interface PreferencesRepository {
  findByUserId(userId: string): Promise<Preferences>;
  update(preferences: Preferences): Promise<Preferences>;
  create(preferences: Preferences): Promise<Preferences>;
}

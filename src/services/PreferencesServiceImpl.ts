import { Preferences } from "../domains/Preferences";
import { PreferencesRepository } from "../repositories/PreferencesRepository";
import { PreferencesService } from "./PreferencesService";

export interface PreferencesServiceProps {
  preferencesRepo: PreferencesRepository;
}

export class PreferencesServiceImpl implements PreferencesService {
  constructor(private props: PreferencesServiceProps) {}

  async findByUserId(preference: Preferences): Promise<Preferences> {
    const preferences = this.props.preferencesRepo.findByUserId(
      preference.user?.id!,
    );
    return preferences;
  }

  async update(preference: Preferences): Promise<Preferences> {
    const response = await this.props.preferencesRepo.update(preference);
    return response;
  }

  async createDefaultPreferences(userId: string): Promise<Preferences> {
    const response = await this.props.preferencesRepo.create(
      new Preferences({
        user: {
          id: userId,
        },
      }),
    );
    return response;
  }
}

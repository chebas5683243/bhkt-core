import { BadRequestError } from "../errors/BadRequestError";
import { PreferenceGroup } from "../types/Preferences";
import {
  PreferencesValidator,
  type PreferencesValidatorMethods,
} from "../validators/PreferencesValidator";
import { User } from "./User";

export class Preferences {
  id: string;

  q1: PreferenceGroup;

  q2: PreferenceGroup;

  q3: PreferenceGroup;

  q4: PreferenceGroup;

  q5: PreferenceGroup;

  q6: PreferenceGroup;

  q7: PreferenceGroup;

  q8: PreferenceGroup;

  q9: PreferenceGroup;

  q10: PreferenceGroup;

  q11: PreferenceGroup;

  q12: PreferenceGroup;

  q13: PreferenceGroup;

  q14: PreferenceGroup;

  q15: PreferenceGroup;

  q16: PreferenceGroup;

  q17: PreferenceGroup;

  q18: PreferenceGroup;

  q19: PreferenceGroup;

  q20: PreferenceGroup;

  user: Partial<User>;

  lastUpdateDate: number;

  constructor(data?: Partial<Preferences>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  static instanceFor(
    instanceSchema: PreferencesValidatorMethods,
    data?: Partial<Preferences>,
  ) {
    const validation = PreferencesValidator[instanceSchema].safeParse(data);

    if (!validation.success) {
      throw new BadRequestError({
        message: `InvalidPreferencesAttributes : ${JSON.stringify(validation.error.errors)}`,
      });
    }

    return new Preferences(validation.data);
  }
}

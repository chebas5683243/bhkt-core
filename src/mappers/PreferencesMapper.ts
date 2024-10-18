import { Preferences } from "../domains/Preferences";

export class PreferencesMapper {
  static marshalPreferences(preferences: Preferences): Record<string, any> {
    return {
      id: preferences.id,
      userId: preferences.user.id,
      q1: preferences.q1,
      q2: preferences.q2,
      q3: preferences.q3,
      q4: preferences.q4,
      q5: preferences.q5,
      q6: preferences.q6,
      q7: preferences.q7,
      q8: preferences.q8,
      q9: preferences.q9,
      q10: preferences.q10,
      q11: preferences.q11,
      q12: preferences.q12,
      q13: preferences.q13,
      q14: preferences.q14,
      q15: preferences.q15,
      q16: preferences.q16,
      q17: preferences.q17,
      q18: preferences.q18,
      q19: preferences.q19,
      q20: preferences.q20,
    };
  }

  static unmarshalPreferences(item: Record<string, any>): Preferences {
    return new Preferences({
      id: item.id,
      user: { id: item.userId },
      q1: item.q1,
      q2: item.q2,
      q3: item.q3,
      q4: item.q4,
      q5: item.q5,
      q6: item.q6,
      q7: item.q7,
      q8: item.q8,
      q9: item.q9,
      q10: item.q10,
      q11: item.q11,
      q12: item.q12,
      q13: item.q13,
      q14: item.q14,
      q15: item.q15,
      q16: item.q16,
      q17: item.q17,
      q18: item.q18,
      q19: item.q19,
      q20: item.q20,
    });
  }
}

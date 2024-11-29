export interface PasswordRule {
  id: number;
  description: string;
  validator: (password: string) => boolean;
  errorMessage: string;
}

export interface GameState {
  currentPassword: string;
  activeRules: PasswordRule[];
  currentRuleIndex: number;
  isGameOver: boolean;
  errors: string[];
}
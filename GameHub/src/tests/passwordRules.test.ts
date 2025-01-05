import { passwordRules } from "@/lib/password-rules";
import { getRomanNumeralValue } from "@/lib/password-utils";

// Test Cases for Each Rule
describe("Password Rules Functional Tests", () => {
  const testCases = [
    {
      ruleId: 1,
      description: "Your password must be at least 6 characters long",
      validPassword: "abcdef",
      invalidPassword: "abc",
    },
    {
      ruleId: 2,
      description: "Password cannot include the word 'password'",
      validPassword: "secure123!",
      invalidPassword: "mypassword",
    },
    {
      ruleId: 3,
      description: "Must contain at least one repeated character",
      validPassword: "helloo",
      invalidPassword: "abcdef",
    },
    {
      ruleId: 4,
      description: "Include at least one punctuation mark",
      validPassword: "hello!",
      invalidPassword: "hello",
    },
    {
      ruleId: 5,
      description: "Start and end with different letters",
      validPassword: "abcde",
      invalidPassword: "anana",
    },
    {
      ruleId: 6,
      description: "Must contain at least three vowels",
      validPassword: "education",
      invalidPassword: "bcdfgh",
    },
    {
      ruleId: 7,
      description: "Include at least one sequence of consecutive letters",
      validPassword: "abc123",
      invalidPassword: "acegik",
    },
    {
      ruleId: 8,
      description: "Must contain at least one palindrome",
      validPassword: "madam123",
      invalidPassword: "abcdefg",
    },
    {
      ruleId: 9,
      description: "Include at least one digit that is a prime number",
      validPassword: "abc3def",
      invalidPassword: "abc146",
    },
    {
      ruleId: 10,
      description: "Must contain a word spelled backward",
      validPassword: "olleh123",
      invalidPassword: "carrac",
    },
    {
      ruleId: 11,
      description: "All the numbers must add up to 30",
      validPassword: "9993",
      invalidPassword: "abcdefg",
    },
    {
      ruleId: 12,
      description: "The password should include at least one Roman numeral",
      validPassword: "IVtest",
      invalidPassword: "test123",
    },
    {
      ruleId: 13,
      description: "All Roman numeral values must add up to 35",
      validPassword: "XXXV",
      invalidPassword: "XXI",
    },
    {
      ruleId: 14,
      description: "The product of all numbers must be greater than 10,000",
      validPassword: "10001m1",
      invalidPassword: "5552",
    },
    {
      ruleId: 15,
      description: "The password must only contain valid words",
      validPassword: "hello world",
      invalidPassword: "invalid#wrd123",
    },
  ];

  // Loop through each test case and validate
  testCases.forEach(({ ruleId, description, validPassword, invalidPassword }) => {
    const rule = passwordRules.find((r) => r.id === ruleId);

    if (!rule) throw new Error(`Rule with ID ${ruleId} not found`);

    test(`${description} - Valid Password`, () => {
      expect(rule.validator(validPassword)).toBe(true);
    });

    test(`${description} - Invalid Password`, () => {
      expect(rule.validator(invalidPassword)).toBe(false);
    });
  });
});

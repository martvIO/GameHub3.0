/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClient } from "./api";

// Function to set a cookie
function setCookie(name: string, value: string, days: number) {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

const client = new HttpClient('http://127.0.0.1:8000');

function getCookie(name: string): string | null {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
  return null;
}

export async function login(email: string, password: string) {
  try {
    const requestData = {
      email: email,
      password: password,
    };

    const response = await client.post('/login', requestData, {
      accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (response.success) {
      const data = response.data;

      // Check if the response contains a "detail" field indicating an error
      if (data?.detail === "Invalid email or password") {
        return {
          success: false,
          message: "Invalid email or password. Please try again.",
          statusCode: response.statusCode,
        };
      }

      // Save the token in a cookie if login is successful
      if (data?.token) {
        setCookie('token', data.token, 7); // Save for 7 days
        console.log('Token saved to cookies');
        return { success: true, message: "Login successful!", token: data.token };
      }

      // Handle unexpected cases
      return {
        success: false,
        message: "Unexpected response format. Please try again.",
        statusCode: response.statusCode,
      };
    } else {
      // Handle generic errors from the API
      console.error('Error during login:', response.error);
      return {
        success: false,
        message: response.error?.detail || "Login failed. Please try again.",
        statusCode: response.statusCode,
      };
    }
  } catch (error: any) {
    console.error('Unexpected Error during login:', error.message || error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
      statusCode: 0, // Indicates network or other failure
    };
  }
}

export async function signup(username: string, email: string, password: string) {
  try {
    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    const response = await client.post('/signup', signupData, {
      accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (response.success) {
      console.log('Signup successful:', response.data.message || "Signup successful!");
      return {
        success: true,
        message: response.data.message || "Signup successful!",
      };
    } else {
      const errorDetail = response.error?.detail;
      console.log(response);
      console.log(response.error);
      console.log(response.error?.detail);
      if (errorDetail === "Username already registered") {
        return { success: false, message: "This username is already in use.", statusCode: response.statusCode };
      } else if (errorDetail === "Email already registered") {
        return { success: false, message: "This email is already in use.", statusCode: response.statusCode };
      }
      console.error('Error during signup:', errorDetail || response.error);
      return {
        success: false,
        message: errorDetail || "Signup failed. Please try again.",
        statusCode: response.statusCode,
      };
    }
  } catch (error: any) {
    console.error('Unexpected Error during signup:', error.message || error);
    return {
      success: false,
      message: error.message || "An unexpected error occurred.",
      statusCode: 0, // Indicates network or other failure
    };
  }
}

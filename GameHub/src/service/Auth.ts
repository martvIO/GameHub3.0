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


export async function login(email,password) {
    try {
      const requestData = {
        "email": email,
        "password": password
      };
      const response = await client.post('/login', requestData, {
        accept: 'application/json',
        'Content-Type': 'application/json',
      });
  
      console.log('Login Response:', response);
  
      // Save the token in a cookie
      setCookie('access_token', response.access_token, 7); // Save for 7 days
      console.log('Token saved to cookies');
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
  

export async function signup(username,email,password) {
    try {
        const signupData = {
            "username": username,
            "email": email,
            "password": password 
          };
      const response = await client.post('/signup', signupData, {
        accept: 'application/json',
        'Content-Type': 'application/json',
      });
  
      console.log('Signup Response:', response);
    } catch (error) {
      console.error('Error during signup:', error);
    }
  }
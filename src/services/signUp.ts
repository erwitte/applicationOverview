import { signUp } from 'aws-amplify/auth';

type RegisterUserInput = {
  email: string;
  password: string;
};

export const registerUser = async ({ email, password }: RegisterUserInput) => {
  try {
    const result = await signUp({
      username: email,
      password,
    });
    return result;
  } catch (error) {
    // Senior tip: Log the error to an observability tool here later
    console.error("Error during registration:", error);
    throw error; // Let the component handle the UI-specific error message
  }
};
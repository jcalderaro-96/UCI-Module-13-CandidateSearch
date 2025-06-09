// src/api/API.ts

export interface User {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name?: string;
  email?: string;
  location?: string;
  company?: string;
}

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

// Note: We ensure data returned from this API matches the `User[]` shape.
const searchGithub = async (): Promise<User[]> => {
  try {
    const start = 1
    const response = await fetch(`https://api.github.com/users?since=${start}`, { headers });
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const data: User[] = await response.json();
    // Users returned from /users endpoint do NOT include fields like name, email, location, company.
    // If you want to get these fields, you'd have to call `searchGithubUser` for each login separately.

    return data;
  } catch (err) {
    return [];
  }
};

const searchGithubUser = async (username: string): Promise<User> => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, { headers });
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }
    const data: User = await response.json();
    return data;
  } catch (err) {
    return {} as User;
  }
};

export { searchGithub, searchGithubUser };

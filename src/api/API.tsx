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
  bio?: string;
}

const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
};

const searchGithub = async (): Promise<User[]> => {
  try {
    const start = 1; // get real users
    const response = await fetch(`https://api.github.com/users?since=${start}&per_page=5`, { headers });
    if (!response.ok) {
      throw new Error('Invalid API response, check the network tab');
    }

    const users: User[] = await response.json();
    console.log("Basic user list:", users);

    // Fetch detailed info for each user
    const detailedUsers = await Promise.all(
      users.map(async (user) => {
        const details = await searchGithubUser(user.login);
        return {
          ...user,
          name: details.name,
          email: details.email,
          location: details.location,
          company: details.company,
          bio: details.bio,
        };
      })
    );

    console.log("Detailed user data:", detailedUsers);

    // fallback if somehow empty
    if (detailedUsers.length === 0) {
      console.warn("API returned no users, using fallback.");
      return fakeCandidates();
    }

    return detailedUsers;
  } catch (err) {
    console.error("API error:", err);
    return fakeCandidates(); // fallback to fake data
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
    console.error(`Error fetching details for ${username}:`, err);
    return {} as User;
  }
};

function fakeCandidates(): User[] {
  return [
    {
      login: "testuser1",
      id: 1,
      avatar_url: "https://via.placeholder.com/150",
      html_url: "https://github.com/testuser1",
      name: "Test User 1",
      email: "test1@example.com",
      location: "California",
      company: "Test Company 1",
      bio: "This is a test user bio 1.",
    },
    {
      login: "testuser2",
      id: 2,
      avatar_url: "https://via.placeholder.com/150",
      html_url: "https://github.com/testuser2",
      name: "Test User 2",
      email: "test2@example.com",
      location: "California",
      company: "Test Company 2",
      bio: "This is a test user bio 2.",
    },
  ];
}

export { searchGithub, searchGithubUser };

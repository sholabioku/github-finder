import axios from 'axios';

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: {
    Authorization: `token ${GITHUB_TOKEN}`,
  },
});

// Get search users results from GitHub API
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

// Get single user  from GitHub API
export const getUser = async (login) => {
  const response = await github.get(`/users/${login}`);

  if (response.status === 404) {
    window.location = '/notFound';
  } else {
    return response.data;
  }
};

// Fetch user repos from GitHub API
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_pg: 10,
  });

  const response = await github.get(`/users/${login}/repos?${params}`);

  return response.data;
};

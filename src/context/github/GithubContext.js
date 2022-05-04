import { createContext, useReducer } from 'react';
import githubReducer from './githubReducer';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    repos: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Get search users results from GitHub API
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({ type: 'SEARCH_USERS', payload: items });
  };

  // Get single user  from GitHub API
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    if (response.status === 404) {
      window.location = '/notFound';
    } else {
      const data = await response.json();

      dispatch({
        type: 'GET_USER',
        payload: data,
      });
    }
  };

  // Fetch user repos from GitHub API
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: 'created',
      per_pg: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({ type: 'GET_REPOS', payload: data });
  };

  const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

  const setLoading = () => {
    dispatch({ type: 'SET_LOADING' });
  };

  return (
    <GitHubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;

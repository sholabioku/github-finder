import { createContext, useState } from 'react';

const GitHubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  return (
    <GitHubContext.Provider value={{ loading, users, fetchUsers }}>
      {children}
    </GitHubContext.Provider>
  );
};

export default GitHubContext;

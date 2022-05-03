import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import GitHubContext from '../context/github/GithubContext';

const User = () => {
  const params = useParams();
  const { user, getUser } = useContext(GitHubContext);

  useEffect(() => {
    getUser(params.login);
  }, []);

  return <div>{user.login}</div>;
};

export default User;

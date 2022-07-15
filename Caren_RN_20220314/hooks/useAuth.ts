import {AuthContext} from '../AuthContext';
import React from 'react';

export default () => {
  const {isInitialized, isSignedIn, isIntro, signIn, signOut} =
    React.useContext(AuthContext);
  return {isInitialized, isSignedIn, isIntro, signIn, signOut};
};

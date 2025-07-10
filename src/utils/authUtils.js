const AUTH_KEY = 'pm_dashboard_auth';

export const loadAuthState = () => {
  try {
    const authData = localStorage.getItem(AUTH_KEY);
    if (authData) {
      return JSON.parse(authData);
    }
    return null;
  } catch (error) {
    console.error('Error loading auth state:', error);
    return null;
  }
};

export const saveAuthState = (authData) => {
  try {
    localStorage.setItem(AUTH_KEY, JSON.stringify(authData));
  } catch (error) {
    console.error('Error saving auth state:', error);
  }
};

export const clearAuthState = () => {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch (error) {
    console.error('Error clearing auth state:', error);
  }
};

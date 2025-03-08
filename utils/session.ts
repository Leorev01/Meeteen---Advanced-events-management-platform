// utils/session.ts

export const saveSessionToLocalStorage = (user: any, session: string) => {
    if (typeof window !== 'undefined') {
      const sessionData = { user, session };
      localStorage.setItem('session', JSON.stringify(sessionData)); // Save to localStorage
    }
  };
  
  export const getSessionFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const sessionData = localStorage.getItem('session');
      return sessionData ? JSON.parse(sessionData) : null;
    }
    return null;
  };
  
  export const clearSessionFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('session');
    }
  };
  
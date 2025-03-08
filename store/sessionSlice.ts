import { Session } from '@supabase/supabase-js';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SessionState {
  user: any | null;
  session: Session | null;
}

const initialState: SessionState = {
  user: null,
  session: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    // Set session
    setSession: (state, action: PayloadAction<{ user: any; session: Session }>) => {
      state.user = action.payload.user;
      state.session = action.payload.session;
      if (typeof window !== 'undefined') {
        localStorage.setItem('session', JSON.stringify(action.payload));
      }
    },
    
    // Clear session
    clearSession: (state) => {
      state.user = null;
      state.session = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('session');
      }
    },
  },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;

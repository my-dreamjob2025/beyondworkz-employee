import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, {
  setAccessToken,
  setRefreshToken,
  clearTokens,
  getRefreshToken,
} from "../../services/api";

const initialState = {
  user: null,
  loading: true,
};

export const initAuth = createAsyncThunk("auth/init", async (_, { rejectWithValue }) => {
  try {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return null;
    }

    const { data } = await api.post("/auth/refresh", {
      refreshToken,
      panel: "employee",
    });

    if (data.success && data.accessToken) {
      setAccessToken(data.accessToken);
      return data.user;
    }

    clearTokens();
    return null;
  } catch {
    clearTokens();
    return rejectWithValue();
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  try {
    const refreshToken = getRefreshToken();
    await api.post("/auth/logout", {
      refreshToken,
      panel: "employee",
    });
  } catch {
    // Proceed even if server call fails
  } finally {
    clearTokens();
  }
  return null;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { accessToken, refreshToken, user } = action.payload;
      setAccessToken(accessToken);
      setRefreshToken(refreshToken || null);
      state.user = user;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // initAuth
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(initAuth.rejected, (state) => {
        state.user = null;
        state.loading = false;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

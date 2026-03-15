import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { login, logout, initAuth } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.auth);

  const loginUser = useCallback(
    (accessToken, refreshToken, userData) => {
      dispatch(login({ accessToken, refreshToken, user: userData }));
    },
    [dispatch]
  );

  const logoutUser = useCallback(async () => {
    await dispatch(logout());
  }, [dispatch]);

  const initAuthUser = useCallback(async () => {
    await dispatch(initAuth());
  }, [dispatch]);

  return {
    user,
    loading,
    login: loginUser,
    logout: logoutUser,
    initAuth: initAuthUser,
  };
};

export default useAuth;

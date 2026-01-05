import {
  loginService,
  logoutService,
  refreshTokenService,
  signupService,
} from "../services/auth.service.js";

/* LOGIN */
export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);

    // 🍪 Set refresh token cookie
    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: false,          // true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      success: true,
      accessToken: result.accessToken,
      user: {
        id: result.user._id,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* SIGNUP */
export const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);

    res.status(201).json({
      success: true,
      accessToken: result.accessToken,
      user: {
        id: result.user._id,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* REFRESH */
export const refresh_Token = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    const result = await refreshTokenService(refreshToken);

    res.status(200).json({
      success: true,
      accessToken: result.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/* LOGOUT */
export const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    await logoutService(refreshToken);

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

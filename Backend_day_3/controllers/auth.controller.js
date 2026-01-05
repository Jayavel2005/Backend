import { loginService, signupService } from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const result = await loginService(req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      token: result.token,
      user: {
        id: result.user._id,
        email: result.user.email,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signup = async (req, res, next) => {
  try {
    const result = await signupService(req.body);
    res.status(201).json({
      success: true,
      token: result.token,
      data: {
        id: result.user._id,
        email: result.user.email,
        role: result.user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

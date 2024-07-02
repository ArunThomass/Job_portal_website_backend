export const sendToken = (user, statusCode, res, message) => {
  try {
    const token = user.getJWTToken();
    const options = {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true, 
      sameSite: "None"  
    };
  
    res.status(statusCode).cookie("token", token, options).json({
      success: true,
      user,
      message,
      token,
    });
    
  } catch (error) {
    console.error('Error in sendToken:', error);
    res.status(500).json({
      success: false,
      message: 'Token generation failed',
    });
  }
    
  }
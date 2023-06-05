import * as bcrypt from 'bcryptjs';
import User from '../database/models/Users';

class LoginService {
  getLogin = async (email: string, password: string) => {
    const userInfo = await User.findOne({ where: { email } });
    if (!userInfo) return null;
    const isValidLogin = await bcrypt.compare(password, userInfo.password);
    if (!isValidLogin) return null;
    return userInfo;
  };
}

export default LoginService;

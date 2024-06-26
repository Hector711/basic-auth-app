import User from './user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from './jwt.js';
import { TOKEN_SECRET } from '../../token.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const userFound = await User.findOne({ email });
    if (userFound) {
      return res.status(400).json(['The email already exist']);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    // guardas el usuario
    const userSaved = await newUser.save();
    // creas el token de acceso
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // comprobacion email
    const userFound = await User.findOne({ email });
    if (!userFound) {
      res.status(400).json({ message: 'User not found' });
    }
    // comprobacion contraseña
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    // creación del token de acceso
    const token = await createAccessToken({ id: userFound._id });
    // respuesta: metemos el token en la cookie ?
    res.cookie('token', token, {
      sameSite: 'none',
      secure: true,
      httpOnly: false,
    });
    // respuesta: lo que mandamos al cliente
    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) {
    res.status(400).json({ messgae: 'User not found' });
  }
  return res.json({
    id: userFound._id,
    username: userFound.username,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return (401).json({ message: 'Unauthorized' });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: 'Unauthorized' });

    const userFound = User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: 'Unauthorized' });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
    });
  });
};

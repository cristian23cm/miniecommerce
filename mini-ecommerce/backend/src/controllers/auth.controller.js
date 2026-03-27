import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Correo y contraseña son requeridos" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "La contraseña debe tener mínimo 6 caracteres" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ msg: "El correo ya está registrado" });
    }

    const hash = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hash });
    await user.save();

    res.status(201).json({ msg: "Usuario creado exitosamente" });
  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: "Correo y contraseña son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ msg: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ msg: "Error interno del servidor" });
  }
};

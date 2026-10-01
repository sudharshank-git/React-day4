import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as Model from "../models/authModel.js";
import * as Schema from "../schemas/authSchema.js";
import { HttpError } from "../utils/httpError.js";
import { validate } from "../utils/validate.js";

const SALT_ROUNDS = 10;
const TOKEN_TTL = process.env.JWT_EXPIRES_IN || "5m";

export const registerUser = async (req, res) => {
  const { username, email, password } = validate(Schema.registerSchema, req.body);
  const normalizedEmail = email.toLowerCase();

  if (await Model.findUserByEmail(normalizedEmail)) {
    throw new HttpError(409, "User already registered");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await Model.createUser({
    username,
    email: normalizedEmail,
    passwordHash,
  });
  if (!user) throw new HttpError(400, "Unable to register");

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = validate(Schema.loginSchema, req.body);

  const user = await Model.findUserByEmail(email.toLowerCase());
  // Same message for "no such user" and "wrong password" so accounts can't be probed.
  const valid = user && (await bcrypt.compare(password, user.password));
  if (!valid) throw new HttpError(401, "Invalid email or password");

  const token = jwt.sign(
    { username: user.username, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: TOKEN_TTL }
  );
  res.status(200).json({ message: "Login successful", token });
};

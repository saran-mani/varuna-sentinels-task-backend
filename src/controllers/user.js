import pool from "../utils/db.js";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789abcdefghijklmnopqrstuvwxyz", 10); // 10 is the length of the ID

export const getAllUsers = async (req, res) => {
  try {
    const [row] = await pool.query("SELECT * FROM user WHERE isActive = 1");

    res.status(200).json({
      status: "success",
      data: row,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({
        status: "error",
        message: "All fields (Name, email, phone) are required.",
      });
    }

    const id = nanoid();
    console.log(id);
    const result = await pool.query(
      "INSERT INTO user (id, name, email, phone) VALUES (?, ?, ?, ?)",
      [id, name, email, phone]
    );
    res.status(201).json({
      status: "success",
      message: "User added successfully.",
    });
  } catch (error) {
    console.error("Unexpected error:", error.message);
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

export const getAUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query(
      "SELECT * FROM user WHERE id=? AND isActive = 1",
      [id]
    );

    res.status(200).json({
      status: "success",
      data: row,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

export const editUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const [row] = await pool.query(
      "UPDATE user SET name=?,email=?,phone=? WHERE id=?",
      [name, email, phone, id]
    );
    res.status(200).json({
      status: "success",
      message: "User deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [row] = await pool.query("UPDATE user SET isActive=0 WHERE id=?", [
      id,
    ]);
    res.status(200).json({
      status: "success",
      message: "User deleted succesfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "An unexpected error occurred.",
    });
  }
};

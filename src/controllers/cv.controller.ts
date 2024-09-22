import { Request, Response } from "express";

export const createCv = async (req: Request, res: Response) => {
  try {
    res.send("Health ok!");
  } catch (error) {
    console.log("ERROR:IN CREATE-CV CONTROLLER", error);
    res.status(500).json("ERROR:IN CREATE-CV CONTROLLER");
  }
};

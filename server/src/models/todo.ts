import { Schema, model } from "mongoose";
import { Todo } from "../types/todo";

const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    status: {
      required: true,
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default model<Todo>("Todo", todoSchema);

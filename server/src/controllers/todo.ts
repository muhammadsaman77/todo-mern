import { Request, Response } from "express";

import TodoModel from "../models/todo";
import { Todo } from "../types/todo";

export const getTodos = async (req: Request, res: Response) => {
  const todos: Todo[] = await TodoModel.find();
  res.status(200).json({ todos });
};
export const getTodo = async (req: Request, res: Response) => {
  await TodoModel.findById(req.params.id, (err, result) => {
    if (err) {
      res.status(400).json({
        error: err,
      });
    } else {
      res.status(200).json({
        result,
      });
    }
  });
};

export const addTodo = async (req: Request, res: Response): Promise<void> => {
  const body: Pick<Todo, "title" | "status"> = req.body;
  if (!body.status || !body.title) {
    res.status(401).json({
      status: 401,
      errorMessage: `ValidationError: Todo validation failed: title: ${body.title}, status: ${body.status}`,
    });
    return;
  }
  const newTodoModel = new TodoModel({
    title: body.title,
    status: body.status,
  });
  const newTodo = await newTodoModel.save();
  const updatedAllTodoAfterSave = await TodoModel.find();
  res.status(201).json({
    message: "Todo Succesfully added!",
    addedTodo: newTodo,
    allTodoAfterAddition: updatedAllTodoAfterSave,
  });
};
export const updateTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
    body,
  } = req;
  if (!body.title || !body.status) {
    res.status(401).json({
      status: 401,
      errorMessage: `ValidationError : _id or required body properties is not defined.`,
    });
    return;
  }
  const updatedTodo = await TodoModel.findByIdAndUpdate({ _id: id }, body);
  const updatedAllTodosAfterUpdate = await TodoModel.find();
  if (!updatedTodo) {
    res.status(501).json({
      status: 501,
      errorMessage: "Edit todo failed. Not implemented",
    });
    return;
  }
  res.status(200).json({
    message: "Todo successfully edited",
    updatedTodo,
    todos: updatedAllTodosAfterUpdate,
  });
};
export const removeTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
    params: { id },
  } = req;
  if (!id) {
    res.status(401).json({
      status: 401,
      message: "ValidationError: Params _id is not defined.",
    });
    return;
  }
  const removeTodo = await TodoModel.findByIdAndDelete(id);
  const updatedAllTodosAfterRemove = await TodoModel.find();
  if (!removeTodo) {
    res.status(501).json({
      status: 501,
      message: "Remove todo failed. Not Implemented",
    });
    return;
  }
  res.status(200).json({
    message: "Todo Succesfully removed",
    removeTodo,
    todos: updatedAllTodosAfterRemove,
  });
};

import { z } from "zod";

export const insertTodoSchema = z.object({
  title: z.string().min(5),
});

export type InsertTodoData = z.infer<typeof insertTodoSchema>;

export const editTodoSchema = z.object({
  title: z.string(),
  is_completed: z.boolean(),
});

export type EditTodoData = z.infer<typeof editTodoSchema>;

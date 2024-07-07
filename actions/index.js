"use server";
import client from "@/db";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const db = await client.db("next-todos");

/**
 * GET all todos
 * @returns
 */
export async function getTodos() {
  try {
    const todos = await db.collection("todos").find().toArray();
    return todos;
  } catch (e) {
    console.log(e);
  }
}

/**
 * Creates a new todo
 * @param {*} text
 */
export async function createTodo(text) {
  const todo = await db.collection("todos").insertOne({ text });
  console.log(todo);
  revalidatePath("/");
}

/**
 * Delete a todo by the id
 * @param {*} id
 */
export async function deleteTodo(id) {
  await db
    .collection("todos")
    .findOneAndDelete({ _id: ObjectId.createFromHexString(id) });
  revalidatePath("/");
}


/**
 * Updates a todo by the id
 * @param {*} id 
 * @param {*} newText 
 */
export async function updateTodo(id, newText) {
  await db
    .collection("todos")
    .findOneAndUpdate(
      { _id: ObjectId.createFromHexString(id) },
      { $set: { text: newText } },
    );
  revalidatePath("/");
}

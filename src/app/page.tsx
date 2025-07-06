"use client";

import React, {useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Circle, Clock, Edit3, Plus, Save } from "lucide-react";

interface Todo {
  readonly _id: string;
  todo: string;
  isCompleted: boolean;
  isUpdated?: boolean;
}

const Page: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { _id: "1", todo: "Buy groceries", isCompleted: false },
    { _id: "2", todo: "Call Alice", isCompleted: true, isUpdated: true },
  ]);
  const [todo, setTodo] = useState<string>("");
  // const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const addTodo = async (): Promise<void> => {
    try {
      const response = await axios.post("/api/todo", {
        todo: todo,
        isCompleted: false,
      });
      setTodos((prevTodos) => [...prevTodos, response.data.newTodo]);
      if (response.status === 200) getTodos();
      //   alert("Todo added succesfully");

      setTodo("");
    } catch (error: unknown) {
      throw error;
    }
  };

  const updateTodo = async (todo: Todo): Promise<void> => {
    try {
      await axios.put("/api/todo", {
        _id: todo._id,
        todo: todo.todo,
        isCompleted: todo.isCompleted,
        isUpdated: todo.isUpdated,
      });
      alert("Todo updated succesfully");

      setTodos((prevTodos) =>
        prevTodos.map((t) =>
          t?._id === todo?._id
            ? { ...t, isCompleted: todo.isCompleted, isUpdated: true }
            : t
        )
      );
    } catch (error: unknown) {
      throw error;
    }
  };
  const getTodos = async (): Promise<void> => {
    try {
      const response = await axios.get("/api/todo");
      setTodos(response.data?.allTodos);
    } catch (error: unknown) {
      console.log(error);
      throw error;
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full flex inset-0 items-center justify-center min-h-screen py-8">
        <div className="w-1/2 min-w-[600px] max-w-4xl flex flex-col space-y-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Todo Manager
            </h1>
            <p className="text-gray-600">Stay organized and productive</p>
          </div>

          {/* Add Todo Section - Matching your original structure */}
          <div className="w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/30 p-8">
            <div className="w-full space-y-4">
              <Input
                type="text"
                placeholder="What needs to be done?"
                className="w-full h-14 px-6 text-lg bg-white/70 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-0 transition-all duration-300"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
              />
              <Button
                className="w-full h-14 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                onClick={() => addTodo()}
              >
                <Plus className="w-5 h-5" />
                Add Todo
              </Button>
            </div>
          </div>

          {/* Todo List Section - Matching your original logic */}
          <div className="space-y-4">
            {todos?.length === 0 ? (
              <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-12 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Circle className="w-8 h-8 text-blue-400" />
                </div>
                <p className="text-xl text-gray-600 font-medium">No todos</p>
                <p className="text-gray-500 mt-2">
                  Add your first todo to get started!
                </p>
              </div>
            ) : (
              (todos || []).map((todoItem: Todo) => (
                <div
                  key={todoItem._id}
                  className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-6 transition-all duration-300 hover:shadow-xl hover:bg-white/90"
                >
                  <div className="flex items-center gap-4">
                    {/* Checkbox - Your original logic */}
                    <div className="flex-shrink-0">
                      <input
                        type="checkbox"
                        checked={todoItem.isCompleted}
                        onChange={(): void => {
                          // setIsCompleted(
                          //   (todoItem.isCompleted = !todoItem.isCompleted)
                          // );
                          setIsUpdated(!isUpdated);
                          updateTodo(todoItem);
                        }}
                        className="w-6 h-6 text-blue-500 bg-white border-2 border-gray-300 rounded-full focus:ring-blue-500 focus:ring-2 cursor-pointer transition-all duration-200"
                      />
                    </div>

                    {/* Todo Content - Your original conditional logic */}
                    <div className="flex-1">
                      {editingTodo?._id === todoItem?._id ? (
                        <Input
                          type="text"
                          placeholder="Edit Todo"
                          value={editingTodo.todo}
                          onChange={(e) =>
                            setEditingTodo({
                              ...editingTodo,
                              todo: e.target.value,
                            })
                          }
                          className="w-full h-12 px-4 bg-white/70 border-2 border-blue-300 rounded-xl focus:border-blue-500 focus:ring-0"
                          autoFocus
                        />
                      ) : (
                        <div className="space-y-2">
                          <p
                            className={`text-lg font-medium transition-all duration-300 ${
                              todoItem.isCompleted
                                ? "line-through text-gray-500"
                                : "text-gray-800"
                            }`}
                          >
                            {todoItem.todo}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Status Indicators - Your original logic */}
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          todoItem.isCompleted
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                        }`}
                      >
                        {todoItem.isCompleted ? "Completed" : "Not Completed"}
                      </span>

                      {todoItem.isUpdated && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-200 rounded-full text-sm font-medium flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          Updated
                        </span>
                      )}
                    </div>

                    {/* Edit Button - Your original conditional logic */}
                    <div className="flex-shrink-0">
                      {editingTodo?._id === todoItem?._id ? (
                        <button
                          onClick={(): void => {
                            updateTodo(editingTodo);
                            setEditingTodo(null);
                          }}
                          className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <Save className="w-4 h-4" />
                          Update
                        </button>
                      ) : (
                        <button
                          onClick={(): void => {
                            setEditingTodo(todoItem);
                          }}
                          className="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200 flex items-center gap-2"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Stats Section */}
          {todos?.length > 0 && (
            <div className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30 p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {todos?.length}
                  </div>
                  <div className="text-gray-600 text-sm">Total Tasks</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {todos?.filter((t) => t.isCompleted).length}
                  </div>
                  <div className="text-gray-600 text-sm">Completed</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-600">
                    {todos?.filter((t) => !t.isCompleted).length}
                  </div>
                  <div className="text-gray-600 text-sm">Pending</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;

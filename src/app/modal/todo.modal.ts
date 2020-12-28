export interface listTodo {
  id: number;
  name: string;
  tasks: number;
}

export interface Task {
  id: number;
  listId: number;
  name: string;
  completed: boolean;
  createdAt: string;
  completedAt: string;
}

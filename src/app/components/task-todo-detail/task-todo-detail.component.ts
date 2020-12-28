import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/modal/todo.modal';
import { AuthService } from 'src/app/services/auth.service';
import { TasksService } from 'src/app/services/tasks.service';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';

@Component({
  selector: 'app-task-todo-detail',
  templateUrl: './task-todo-detail.component.html',
  styleUrls: ['./task-todo-detail.component.scss'],
})
export class TaskTodoDetailComponent implements OnInit {
  tasksList: Task[] = [];
  listTitle: string;
  listId: number;
  constructor(
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
    private tasksService: TasksService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.router.queryParams.subscribe((router) => {
      this.listTitle = router.list;
    });
  }

  ngOnInit(): void {
    this.router.params.subscribe((router) => {
      this.getTasks(router.id);
      this.listId = router.id;
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  getTasks(id: number) {
    this.tasksService.getTasks(id).subscribe(
      (data) => {
        this.tasksList = data;
      },
      (err) => {
        this.openSnackBar('Get task data failed');
      }
    );
  }

  addNewTask(taskName: string) {
    if (taskName.trim() === '') {
      this.openSnackBar('Task name is empty');
      return;
    }
    this.tasksService.createTask(this.listId, taskName).subscribe(
      (res) => {
        this.tasksList.unshift(res);
        this.openSnackBar('Create task successfully');
      },
      (err) => {
        this.openSnackBar('Create task failed');
      }
    );
  }

  editTask(task: Task) {
    const dialogRef = this.dialog.open(EditTaskDialogComponent, {
      width: '250px',
      data: task,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== task.name) {
        this.tasksList.map((item) => {
          if (item.id === task.id) {
            item.name = result;
            this.tasksService.modifyTask(this.listId, task.id, item).subscribe(
              () => {
                this.openSnackBar('Modify task successfully');
              },
              (err) => {
                this.openSnackBar('Modify task failed');
              }
            );
          }
        });
      }
    });
  }

  checkedDoneTask(task: Task) {
    task.completed = !task.completed;
    this.tasksService.modifyTask(this.listId, task.id, task).subscribe(
      () => {
        this.openSnackBar('Task has been updated');
      },
      (err) => {
        this.openSnackBar('Modify task failed');
      }
    );
  }

  deleteTask(task: Task) {
    this.tasksService.deleteTask(this.listId, task.id).subscribe(
      () => {
        this.tasksList = this.tasksList.filter((item) => item.id !== task.id);
        this.openSnackBar('Task has been remove');
      },
      (err) => {
        this.openSnackBar('Delete task failed');
      }
    );
  }

  backToList() {
    this.route.navigate(['/main-page']);
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.route.navigate(['']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { pipe } from 'rxjs';
import { first } from 'rxjs/operators';
import { listTodo } from 'src/app/modal/todo.modal';
import { AuthService } from 'src/app/services/auth.service';
import { ListsService } from 'src/app/services/lists.service';
import { EditListDialogComponent } from './edit-list-dialog/edit-list-dialog.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  listTodoItem: listTodo[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private listsService: ListsService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTodoLists();
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }

  addNewList(name: string) {
    if (name.trim() === '') {
      this.openSnackBar('Name list is empty');
      return;
    }
    this.listsService.addNewList(name).subscribe(
      (res) => {
        this.listTodoItem.unshift(res);
        this.openSnackBar('Add new list success');
      },
      (err) => {
        this.openSnackBar('Add new list failed');
      }
    );
  }

  deleteList(id: number) {
    this.listsService.deleteList(id).subscribe(
      () => {
        this.listTodoItem = this.listTodoItem.filter((item) => item.id !== id);
        this.openSnackBar('List has been remove');
      },
      (err) => {
        this.openSnackBar('Delete list Failed');
      }
    );
  }

  editList(item: listTodo) {
    const dialogRef = this.dialog.open(EditListDialogComponent, {
      width: '250px',
      data: item,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result !== item.name) {
        this.listsService.modifyList(item.id, result).subscribe(
          () => {
            this.listTodoItem.map((i) => {
              if (i.id === item.id) {
                item.name = result;
              }
            });
            this.openSnackBar('The list has been modify');
          },
          (err) => {
            this.openSnackBar('Modify list Failed');
          }
        );
      }
    });
  }

  loadTodoLists() {
    this.listsService
      .getLists()
      .pipe(first())
      .subscribe(
        (data) => {
          this.listTodoItem = data;
        },
        (err) => {
          this.openSnackBar('Do not have any value');
        }
      );
  }

  logOut() {
    this.authService.logout().subscribe(() => {
      localStorage.clear();
      this.router.navigate(['']);
    });
  }
}

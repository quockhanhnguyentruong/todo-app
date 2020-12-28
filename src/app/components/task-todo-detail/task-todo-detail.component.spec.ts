import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTodoDetailComponent } from './task-todo-detail.component';

describe('TaskTodoDetailComponent', () => {
  let component: TaskTodoDetailComponent;
  let fixture: ComponentFixture<TaskTodoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskTodoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTodoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

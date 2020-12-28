import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-list-dialog',
  templateUrl: './edit-list-dialog.component.html',
  styleUrls: ['./edit-list-dialog.component.scss'],
})
export class EditListDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {}
}

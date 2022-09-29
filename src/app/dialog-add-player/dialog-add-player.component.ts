import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name = '';

  constructor(private dialog: MatDialogRef<DialogAddPlayerComponent>) {}

  ngOnInit(): void {
  }

  /**
   * closes new player dialog
   */
  onNoClick(){
    this.dialog.close();
  }

}

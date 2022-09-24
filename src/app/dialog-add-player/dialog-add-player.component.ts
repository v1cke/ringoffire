import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  templateUrl: './dialog-add-player.component.html',
  styleUrls: ['./dialog-add-player.component.scss']
})
export class DialogAddPlayerComponent implements OnInit {
  name = '';
  // avatar: string = '';
  // allProfileIcons: any = [];
  // nameAndAvatar: any = [];

  constructor(private dialog: MatDialogRef<DialogAddPlayerComponent>) {
    // for (let i = 1; i<5; i++) {
    //   this.allProfileIcons.push(`${i}`)
    // }
   }

  ngOnInit(): void {
  }

  /**
   * closes new player dialog
   */
  onNoClick(){
    this.dialog.close();
  }

  //  /**
  //  * saving the variables in an array
  //  */
  //   mergevalues() {
  //     this.nameAndAvatar[0] = (this.name);
  //     this.nameAndAvatar[1] = (this.avatar);
  //   }

}

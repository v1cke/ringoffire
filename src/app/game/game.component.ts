import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, doc, onSnapshot, DocumentReference, docSnapshots } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { setDoc, collection, getDoc } from '@firebase/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  doc = DocumentReference;
  pickCardAnimation = false;
  currentCard = '';
  game!: Game;
  games$: Observable<any>;
  gameArray: any;
  gameText: string = '';
  gameId: string;
  coll: any;
  gameOver: boolean = false;
  gameById: any;

  constructor(private firestore: Firestore, public dialog: MatDialog, private route: Router, private router: ActivatedRoute) {
    this.coll = collection(firestore, 'games');
  }

  ngOnInit(): void {
    this.newGame();
     this.router.params.subscribe(async (params) => {
      this.gameId = params['id'];
      onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const newGame: any = doc.data();
        // console.log(newGame);
        this.updateGameData(newGame);
      });
    })
  }


  /**
* updates the game variable
*
* @param newGame - data loaded from firebase
*/
  updateGameData(newGame: any) {
    this.game.players = newGame.game.players;
    this.game.stack = newGame.game.stack;
    this.game.playedCards = newGame.game.playedCards;
    this.game.currentPlayer = newGame.game.currentPlayer;
    this.game.playedCards = newGame.game.playedCards;
  }
  

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
    });
  }


  newGame() {
    this.game = new Game();
  }


  /**
   * save the game on firebase
   */
   saveGame() {
    setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });
  }


  takeCard() {
    if (this.game.players.length > 0) {
      if (!this.pickCardAnimation) {
        this.currentCard = this.game.stack.pop();
        this.pickCardAnimation = true;

        this.game.currentPlayer++;
        this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
        setTimeout(() => {
          this.game.playedCards.push(this.currentCard);
          this.pickCardAnimation = false;
        }, 1500);
      }
    }
  }
}

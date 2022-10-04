import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { Firestore, collectionData, docData, setDoc, onSnapshot, DocumentReference, docSnapshots } from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CollectionReference, DocumentData, addDoc, collection, deleteDoc, doc, updateDoc } from '@firebase/firestore';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})

export class GameComponent implements OnInit {
  doc = DocumentReference;
  game!: Game;
  games$: Observable<any>;
  gameArray: any;
  gameText: string = '';
  gameId: string;
  coll: any;
  gameOver: boolean = false;

  constructor(private firestore: Firestore, public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.coll = collection(firestore, 'games');
  }


  /**
   * opens game with saved data of its ID
   */
  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(async (params) => {
      this.gameId = params['id'];
      onSnapshot(doc(this.firestore, "games", params['id']), (doc) => {
        const newGame: any = doc.data();
        this.updateGameData(newGame);
      });
    })
  }


  /**
   * creates new game
   */
  newGame() {
    this.game = new Game();
  }


  /**
   * save the game on firebase
   */
  saveGame() {
    setDoc(doc(this.coll, this.gameId), { game: this.game.toJson() });
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
    this.game.pickCardAnimation = newGame.game.pickCardAnimation;
    this.game.currentCard = newGame.game.currentCard;

  }


  /**
   * opens new dialog to enter playername
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 2) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  /**
   * turns above card from stack with animation, if cards remain
   * after card animation current player changes
   */
  takeCard() {
    if (this.game.stack.length == 0) {
      this.gameOver = true;
      this.restart();
    } else if (this.game.players.length > 1) {
      if (!this.game.pickCardAnimation) {
        this.cardsAnimation();
        setTimeout(() => {
          this.nextPlayer();
        }, 1000);
      }
    }
  }
  
  
  /**
   * pick card from stack
   */
  cardsAnimation(){
    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    console.log('cards left on stack:', this.game.stack.length);
    
  }
  
  
  /**
   * changes current player after 1.5 seconds after cardanimation
   */
  nextPlayer(){
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1500);
  }
  
  
  restart(){
    setTimeout(() => {
      deleteDoc(doc(this.coll, this.gameId));
      this.router.navigateByUrl('');
    }, 5000);
    
  }
}

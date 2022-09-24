import { NgStyle } from '@angular/common';
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {

  cardAction = [
    { title: 'Waterfall', description: "Everyone picks up their drink and starts drinking at the same time as the player to his or her left. No one is allowed to stop drinking until the person to their left stops." },
    { title: 'You', description: "No, not you. Pick someone to take a sip of their drink." },
    { title: 'Me', description: "Okay, now you have to drink. Bottoms up!" },
    { title: 'Floor', description: "Everyone has to touch the floor in “not it” or “shot not” fashion. The last person to touch the floor has to drink." },
    { title: 'Guys', description: "All the dudes, take a drink." },
    { title: 'Chicks', description: "Now all the ladies, take a drink." },
    { title: 'Heaven', description: "Everyone has to point up to the sky (or ceiling, more likely). The last person to do so drinks." },
    { title: 'Mate', description: "Choose a partner to drink with you. That person now has to drink every time you drink and vice versa, until one of you chooses a new mate." },
    { title: 'Rhyme', description: "Say a word. The person that comes after you in the card drawing lineup then has to say a word that rhymes with your word. (We recommend “orange.”) Continue rhyming around the circle until someone either says a word that doesn't rhyme, says a nonsense word or can't think of anything to say—that person has to drink." },
    { title: 'Categories', description: "Pick any category of things (states, spirits, classic cocktails, primary colors if you hate the fourth person from you). Everyone then has to name something within that category. The person who can't think of anything or is out of options drinks." },
    { title: 'Never Have I Ever ', description: "Here's a fun way to get to know your opponents—maybe a little too well—through a rousing minigame of Never Have I Ever. Everyone puts up three fingers and takes turns naming things you haven't done, which you suspect (or know) others have. Every time you have done something, put a finger down. The first person out of fingers has to drink." },
    { title: 'Question Master', description: "If you draw a queen, you are the question master. During your time as question master, you get to ask anyone a question at any time. That person then has to respond to your question with another question to avoid having to drink. If the person responds with anything other than a question or fails to respond at all, he or she has to drink. You reign supreme as question master until another queen is drawn by a different player -- who then becomes the new question master and may seek to exact some inquisitive revenge." },
    { title: 'Make a Rule', description: "As the King of Kings, you get to make up a rule that everyone has to follow. If anyone dare forget to obey your rules, they have to drink (that includes you). One of our favorites: Make a rule that the person drinking has to compliment you before they take a sip, or drink until they do. You can choose whether the rule stands throughout the game or is canceled when someone else draws a king and instates a new rule." },
  ];

  title = '';
  description = '';
  @Input() card: string;

  constructor() { }

  ngOnInit(): void {
  }


  /**
   * assigning card no.
   * @returns correct no.
   */
  ngOnChanges(): void {
    if (this.card) {
      let cardNumber: any = this.card.split('_')[1];
      this.title = this.cardAction[cardNumber - 1].title;
      this.description = this.cardAction[cardNumber - 1].description;
    }
  }
}

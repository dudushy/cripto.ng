/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppComponent } from '../../app.component';
import { DbService } from '../../services/db/db.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  title = 'GameComponent';

  gameRunning = false;
  currentWord = '';
  gameArray: any = [];
  wordArray: any = [];
  letterArray: any = [];

  sampleArray: any = [
    { word: 'radioterapia', description: 'Técnica empregada no tratamento do câncer.' },
    { word: 'cafe com leite', description: 'A política que alternou paulistas e mineiros no poder.' },
    { word: 'gnomo e duende', description: 'Dois seres de contos de fadas.' },
    { word: 'energia solar', description: 'Aciona os sistemas dos satélites.' },
    { word: 'ultravioleta', description: 'A radiação que bronzeia e causa câncer.' },
    { word: 'deselegancia', description: 'Ação indecorosa.' },
    { word: 'infelicidade', description: 'Desgraça; infortúnio.' },
    { word: 'aparecimento', description: 'Ato de tornar-se visível.' },
  ];

  constructor(
    public db: DbService,
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);

    this.gameRunning = this.db.get('gameRunning') || false;
    console.log(`[${this.title}#constructor] gameRunning`, this.gameRunning);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    window.addEventListener('keypress', (event: any) => {
      console.log(`[${this.title}#window.onkeypress] event`, event);
      console.log(`[${this.title}#window.onkeypress] event.key`, event.key);

      this.currentWord += event.key;

      if (this.currentWord.length > 12 || event.key === 'Enter') {
        this.currentWord = '';
      }

      console.log(`[${this.title}#window.onkeypress] currentWord`, this.currentWord);
    });
  }

  startGame() {
    console.log(`[${this.title}#startGame]`);

    this.gameRunning = true;
    this.db.set('gameRunning', this.gameRunning);

    this.gameArray = this.sampleArray;
    console.log(`[${this.title}#startGame] gameArray`, this.gameArray);

    // this.wordArray = this.gameArray.map((item) => item.word);
    console.log(`[${this.title}#startGame] wordArray`, this.wordArray);

    // this.letterArray = this.wordArray.map((word) => word.split(''));
    console.log(`[${this.title}#startGame] letterArray`, this.letterArray);

    this.updateView();
  }

  stopGame() {
    console.log(`[${this.title}#stopGame]`);

    this.gameRunning = false;
    this.db.set('gameRunning', this.gameRunning);

    this.updateView();
  }

  updateView() {
    console.log(`[${this.title}#updateView]`);

    this.cdr.detectChanges;
    this.app.updateView(this.title);
  }

  redirectTo(url: any) {
    this.app.redirectTo(url, this.title);

    this.updateView();
  }
}

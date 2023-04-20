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
  wordLength = 12;
  currentWord = '';
  gameArray: any = [];
  indexArray: any = [];

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

    // this.gameRunning = this.db.get('gameRunning') || false;
    console.log(`[${this.title}#constructor] gameRunning`, this.gameRunning);

    // this.wordLength = this.db.get('wordLength') || 12;
    console.log(`[${this.title}#constructor] wordLength`, this.wordLength);

    // this.currentWord = this.db.get('currentWord') || '';
    console.log(`[${this.title}#constructor] currentWord`, this.currentWord);

    // this.gameArray = this.db.get('gameArray') || [];
    console.log(`[${this.title}#constructor] gameArray`, this.gameArray);

    // this.indexArray = this.db.get('indexArray') || [];
    console.log(`[${this.title}#constructor] indexArray`, this.indexArray);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    window.addEventListener('keydown', (event: any) => {
      // console.log(`[${this.title}#window.keydown] event`, event);
      console.log(`[${this.title}#window.keydown] event.key`, event.key);

      if (event.key === 'Backspace') {
        this.currentWord = this.currentWord.slice(0, -1);
        return;
      }

      if (event.key === 'Enter') {
        this.updateIndexArray(this.currentWord);
        this.currentWord = '';
        return;
      }

      this.currentWord += event.key;

      if (this.currentWord.length > 12) {
        this.updateIndexArray(this.currentWord.slice(0, -1));
        this.currentWord = '';
        return;
      }
    });
  }

  updateIndexArray(word: any) {
    console.log(`[${this.title}#updateIndexArray] word`, word);

    console.log(`[${this.title}#updateIndexArray] (BEFORE) indexArray`, this.indexArray);

    for (const [key, value] of Object.entries(this.gameArray)) {
      console.log(`[${this.title}#updateIndexArray] gameArray[${key}]`, value);

      if (word === this.gameArray[key].word) {
        console.log(`[${this.title}#updateIndexArray] MATCH!`);

        for (const letter of word) {
          console.log(`[${this.title}#updateIndexArray] letter`, letter);
          console.log(`[${this.title}#updateIndexArray] indexArray[${letter}]`, this.indexArray[letter]);

          if (this.indexArray[letter]?.active) {
            console.log(`[${this.title}#updateIndexArray] letter already active!`);
            continue;
          }

          this.indexArray[letter].active = true;
        }
      }
    }

    console.log(`[${this.title}#updateIndexArray] (AFTER) indexArray`, this.indexArray);

    this.saveGame();
  }

  createIndexArray(array: any) {
    console.log(`[${this.title}#createIndexArray] array`, array);

    this.indexArray = [];

    for (const [key, value] of Object.entries(array)) {
      console.log(`[${this.title}#updateLetterArray] array[${key}]`, value);

      for (const letter of array[key].word) {
        console.log(`[${this.title}#updateLetterArray] letter`, letter);

        if (this.indexArray[letter]) {
          console.log(`[${this.title}#updateLetterArray] letter already exists!`);
          continue;
        }

        const id = Object.keys(this.indexArray).length;
        console.log(`[${this.title}#updateLetterArray] id`, id);

        this.indexArray[letter] = { id: id, active: false };
      }
    }

    console.log(`[${this.title}#createIndexArray] indexArray`, this.indexArray);

    this.saveGame();
  }

  createGameArray(array: any) {
    console.log(`[${this.title}#createGameArray] array`, array);

    this.gameArray = [];

    for (const [key, value] of Object.entries(array)) {
      console.log(`[${this.title}#updateLetterArray] array[${key}]`, value);

      const correctWord = array[key].word.replace(/ /g, '');
      console.log(`[${this.title}#updateLetterArray] correctWord`, correctWord);

      this.gameArray.push({ word: correctWord, description: array[key].description });
    }

    console.log(`[${this.title}#createGameArray] gameArray`, this.gameArray);

    this.createIndexArray(this.gameArray);

    this.saveGame();
  }

  saveGame() {
    console.log(`[${this.title}#saveGame] OUT OF ORDER!`);
    return;
    console.log(`[${this.title}#saveGame]`);

    this.db.set('wordLength', this.wordLength);
    console.log(`[${this.title}#saveGame] wordLength`, this.wordLength);

    // this.db.set('currentWord', this.currentWord);
    // console.log(`[${this.title}#saveGame] currentWord`, this.currentWord);

    this.db.set('gameArray', this.gameArray);
    console.log(`[${this.title}#saveGame] gameArray`, this.gameArray);
    console.log(`[${this.title}#saveGame] {db} gameArray`, this.db.get('gameArray'));

    this.db.set('indexArray', this.indexArray);
    console.log(`[${this.title}#saveGame] indexArray`, this.indexArray);
    console.log(`[${this.title}#saveGame] {db} indexArray`, this.db.get('indexArray'));

    this.updateView();
  }

  startGame() {
    console.log(`[${this.title}#startGame]`);

    this.gameRunning = true;
    this.db.set('gameRunning', this.gameRunning);

    this.createGameArray(this.sampleArray);

    this.saveGame();

    console.log(`[${this.title}#startGame] GAME STARTED!`, this.gameArray, this.indexArray);

    this.updateView();
  }

  stopGame() {
    console.log(`[${this.title}#stopGame]`);

    this.gameRunning = false;
    this.db.set('gameRunning', this.gameRunning);

    this.gameArray = [];
    console.log(`[${this.title}#stopGame] gameArray`, this.gameArray);

    this.updateView();
  }

  defaultOrder() {
    return 0;
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

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

  currentWord = '';

  constructor(
    public db: DbService,
    private cdr: ChangeDetectorRef,
    public app: AppComponent
  ) {
    console.log(`[${this.title}#constructor]`);
  }

  ngOnInit(): void {
    console.log(`[${this.title}#ngOnInit]`);

    window.addEventListener('keypress', (event: any) => {
      console.log(`[${this.title}#window.onkeypress] event`, event);
      console.log(`[${this.title}#window.onkeypress] event.key`, event.key);

      this.currentWord += event.key;

      if (event.key === 'Enter') {
        this.currentWord = '';
      }

      console.log(`[${this.title}#window.onkeypress] currentWord`, this.currentWord);
    });
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

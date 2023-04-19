import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GameComponent } from './components/game/game.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  // { path: '', redirectTo: 'game', pathMatch: 'full' }, //? Redirect to game
  // { path: 'game', component: GameComponent }, //? Game
  { path: '', component: GameComponent }, //? DEFAULT ROUTE
  { path: 'settings', component: SettingsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

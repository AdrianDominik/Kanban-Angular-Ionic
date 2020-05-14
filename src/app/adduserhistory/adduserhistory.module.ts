import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AdduserhistoryPage } from './adduserhistory.page';

const routes: Routes = [
  {
    path: '',
    component: AdduserhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AdduserhistoryPage]
})
export class AdduserhistoryPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UpdateuserhistoryPage } from './updateuserhistory.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateuserhistoryPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [UpdateuserhistoryPage]
})
export class UpdateuserhistoryPageModule {}

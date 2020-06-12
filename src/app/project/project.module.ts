import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { projectPage } from './project.page';
import {MatMenuModule} from '@angular/material/menu';


const routes: Routes = [
  {
    path: '',
    component: projectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatMenuModule
  ],
  declarations: [projectPage]
})
export class projectPageModule {}

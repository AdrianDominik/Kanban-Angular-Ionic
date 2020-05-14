import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import {Component} from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ShowprojectPage } from './showproject.page';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  {
    path: '',
    component: ShowprojectPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DragDropModule
  ],
  declarations: [ShowprojectPage]
})

@Component({
  selector: 'showproject',
  templateUrl: 'showproject.page.html',
  styleUrls: ['showproject.page.scss'],
})
export class ShowprojectPageModule {



}

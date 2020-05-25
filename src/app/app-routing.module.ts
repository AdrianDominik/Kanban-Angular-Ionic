import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'project', loadChildren: './project/project.module#projectPageModule' },
  { path: 'addproject', loadChildren: './addproject/addproject.module#addprojectPageModule' },
  { path: 'addproject/:id/:name', loadChildren: './addproject/addproject.module#addprojectPageModule' },
  { path: 'showproject/:id/:name', loadChildren: './showproject/showproject.module#ShowprojectPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'showproject/:id/:name/addtable', loadChildren: './addtable/addtable.module#AddtablePageModule' },
  { path: 'showproject/:id/:name/updatetable/:idTable/:nameTable', loadChildren: './updatetable/updatetable.module#UpdatetablePageModule' },
  { path: 'showproject/:id/:name/adduserhistory', loadChildren: './adduserhistory/adduserhistory.module#AdduserhistoryPageModule' },
  { path: 'showproject/:id/:name/updateuserhistory/:idUserHistory/:nameUserHistory', loadChildren: './updateuserhistory/updateuserhistory.module#UpdateuserhistoryPageModule' },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

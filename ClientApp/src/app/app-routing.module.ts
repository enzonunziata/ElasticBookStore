import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageBookComponent } from './components/page-book/page-book.component';
import { PageMainComponent } from './components/page-main/page-main.component';

const routes: Routes = [
  { path: '', component: PageMainComponent },
  { path: 'book/:isbn13', component: PageBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

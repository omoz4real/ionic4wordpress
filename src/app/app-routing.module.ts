import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
   {
    path: "home/:category",
    loadChildren: "./home/home.module#HomePageModule"
  },
   {
    path: "posts/:id",
    loadChildren: "./post-detail/post-detail.module#PostDetailPageModule"
  },
  
  { 
  path: 'categories', 
  loadChildren: './categories/categories.module#CategoriesPageModule' 
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

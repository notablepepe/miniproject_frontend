import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowseRecipesComponent } from './components/browse-recipes/browse-recipes.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MealCalendarComponent } from './components/meal-calendar/meal-calendar.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { LoginComponent } from './components/login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { ContactComponent } from './components/contact/contact.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent},
  {
    path: '',
    component: NavBarComponent, // include navbar in all components except user account related
    children: [
      { path: 'profile', component: UserProfileComponent , canActivate:[authGuard]},
      { path: 'browse', component: BrowseRecipesComponent , canActivate:[authGuard]},
      { path: 'favorites', component: FavoritesComponent , canActivate:[authGuard] },
      { path: 'mealcalendar', component: MealCalendarComponent , canActivate:[authGuard]},
      { path: 'shoppinglist', component: ShoppingListComponent , canActivate:[authGuard]},
      { path: 'contactus', component: ContactComponent, canActivate:[authGuard]},
      { path: '', redirectTo: '/login', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

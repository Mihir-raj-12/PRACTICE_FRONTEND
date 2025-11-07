import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// 1. Import all your components and the guard
import { LoginComponent } from './features/login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard/admin-dashboard.component';
import { GuesthouseListComponent } from './features/admin/guesthouse-list/guesthouse-list.component';
import { authGuard } from './core/auth/auth.guard';

// 2. This is the correct route structure
const routes: Routes = [
  // Login Route
  { 
    path: 'login', 
    component: LoginComponent 
  },

  // --- Admin Routes ---
  // All admin routes are children of AdminLayoutComponent
  // and are protected by a *single* guard on the parent.
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard], // <-- The guard protects all children
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'guesthouses', component: GuesthouseListComponent }, // <-- This is now a child
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' } // Default admin route
    ]
  },
  
  // Default route for the whole app
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' 
  },
  
  // Wildcard route (for 404 Not Found)
  { 
    path: '**', 
    redirectTo: '/login' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
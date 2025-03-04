import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AssistantComponent } from './assistant/assistant.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FeedbackTableComponent } from './feedback-table/feedback-table.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { XlsCompareComponent } from './xls-compare/xls-compare.component';


export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'assistant', component: AssistantComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard]},
  { path: 'stat', component: StatisticsComponent, canActivate: [AuthGuard]},
  { path: 'feedback', component: FeedbackTableComponent, canActivate: [AuthGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  { path: 'register', component: RegisterComponent},
  { path: 'xls', component: XlsCompareComponent, canActivate: [AuthGuard]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '*', redirectTo: '/login' }
];

export const AppRoutes = routes;

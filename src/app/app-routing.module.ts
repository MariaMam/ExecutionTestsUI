import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent, ResetPasswordFormComponent, CreateAccountFormComponent, ChangePasswordFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { ExecutionTestComponent } from './pages/execution-tests/execution-tests.component';
import { ExecutionTestsVerticallyComponent } from './pages/execution-tests-vertically/execution-tests-vertically.component';

const routes: Routes = [
  {
    path: 'execution-tests',
    component: ExecutionTestComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'execution-tests-vertically',
    component: ExecutionTestsVerticallyComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'create-account',
    component: CreateAccountFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'change-password/:recoveryCode',
    component: ChangePasswordFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
    
  imports: [RouterModule.forRoot(routes), DxDataGridModule, DxFormModule ],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [HomeComponent, ExecutionTestComponent]
})
export class AppRoutingModule { }

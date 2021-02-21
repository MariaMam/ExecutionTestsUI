import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxDataGridModule, DxPivotGridModule, DxPopupModule, DxTemplateModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { ExecutionTestsVerticallyComponent } from './pages/execution-tests-vertically/execution-tests-vertically.component';

@NgModule({
  declarations: [
    AppComponent,
    ExecutionTestsVerticallyComponent 
    
  ],
  imports: [
    BrowserModule,   
    DxDataGridModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    CommonModule,
    DxPivotGridModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

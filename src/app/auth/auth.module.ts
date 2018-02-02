import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [LoginComponent, SignupComponent],
    imports: [ReactiveFormsModule, AngularFireAuthModule, SharedModule]
})
export class AuthModule {}

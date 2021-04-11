import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { UserListComponent } from './pages/user/user-management/user-list/user-list.component';
import { RegistrantsListComponent } from './pages/registrants-list/registrants-list.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { SearchFilterPipe } from './pages/search-filter.pipe';
import { MemFilterPipe } from './pages/registrants-list/filter/mem-filter.pipe';
import { UsersmemPipe } from './pages/registrants-list/filter/usersmem.pipe';
import { AttendanceComponent } from './pages/registrants-list/attendance/attendance/attendance.component';
import { AttendanceFilterPipe } from './pages/registrants-list/filter/attendance-filter.pipe';
import { AttendanceStatementComponent } from './pages/registrants-list/attendance/attendance-statement/attendance-statement.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthInterceptor } from './pages/auth/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgxSpinnerModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    UserListComponent,
    RegistrantsListComponent,
    LoginComponent,
    SearchFilterPipe,
    MemFilterPipe,
    UsersmemPipe,
    AttendanceComponent,
    AttendanceFilterPipe,
    AttendanceStatementComponent
],
  providers: [
   {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}

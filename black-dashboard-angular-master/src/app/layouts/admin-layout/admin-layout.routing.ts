import { AttendanceStatementComponent } from './../../pages/members-list/attendance/attendance-statement/attendance-statement.component';
import { DuesStatementComponent } from './../../pages/members-list/dues/dues-statement/dues-statement.component';
import { AttendanceComponent } from './../../pages/members-list/attendance/attendance/attendance.component';
import { DuesListComponent } from './../../pages/members-list/dues/dues-list/dues-list.component';
import { MembersListComponent } from './../../pages/members-list/members-list.component';
import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { UserListComponent } from './../../pages/user/user-management/user-list/user-list.component';
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "user-list", component: UserListComponent },
  { path: "members-list", component: MembersListComponent },
  // { path: "dues-list", component: DuesListComponent },
  // { path: "statement", component: DuesStatementComponent },
  { path: "attendance-statement", component: AttendanceStatementComponent },
  { path: "attendance", component: AttendanceComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },
  // { path: "rtl", component: RtlComponent }
];

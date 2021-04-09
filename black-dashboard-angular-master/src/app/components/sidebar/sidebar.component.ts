import { UserService } from './../../shared/user.service';
import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
  restrict: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: "",
    restrict: "user"
  },
  // {
  //   path: "/icons",
  //   title: "Icons",
  //   rtlTitle: "الرموز",
  //   icon: "icon-atom",
  //   class: "",
  //   restrict: "user"
  // },
  // {
  //   path: "/notifications",
  //   title: "Notifications",
  //   rtlTitle: "إخطارات",
  //   icon: "icon-bell-55",
  //   class: "",
  //   restrict: "user"
  // },
  // {
  //   path: "/user",
  //   title: "User Profile",
  //   rtlTitle: "ملف تعريفي للمستخدم",
  //   icon: "icon-single-02",
  //   class: "",
  //   restrict: "user"
  // },
  {
    path: "/user-list",
    title: "User Management",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: "",
    restrict: "user"
  },
  {
    path: "/registrants-list",
    title: "Registrants Management",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-badge",
    class: "",
    restrict: "user"
  },
  // {
  //   path: "/dues-list",
  //   title: "Financial Management",
  //   rtlTitle: "ملف تعريفي للمستخدم",
  //   icon: "icon-money-coins",
  //   class: "",
  //   restrict: "user"
  // },
  // {
  //   path: "/statement",
  //   title: "Financial Statement",
  //   rtlTitle: "ملف تعريفي للمستخدم",
  //   icon: "icon-money-coins",
  //   class: "",
  //   restrict: "user"
  // },
  {
    path: "/attendance",
    title: "Attendance",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-notes",
    class: "",
    restrict: "user"
  },
  {
    path: "/attendance-statement",
    title: "Attendance Report",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-notes",
    class: "",
    restrict: "user"
  },
  // {
  //   path: "/tables",
  //   title: "Table List",
  //   rtlTitle: "قائمة الجدول",
  //   icon: "icon-puzzle-10",
  //   class: "",
  //   restrict: "user"
  // },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.startFilter();
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }

  startFilter(){
    var payLoad = this.userService.getUserPayload();

    if(payLoad && payLoad.role == 'Admin')
    {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    else
    {
      this.menuItems = ROUTES.filter(menuItem =>
        menuItem.restrict == "user");
    }   
  
  }
}

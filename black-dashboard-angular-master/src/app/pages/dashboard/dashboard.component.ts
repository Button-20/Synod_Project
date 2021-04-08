import { DuesTotal } from './../../shared/duesTotal.model';
import { UserService } from './../../shared/user.service';
import { DuesService } from './../../shared/dues.service';
import { MembersService } from './../../shared/members.service';
import { Component, OnInit } from "@angular/core";
import { AttendanceService } from 'src/app/shared/attendance.service';


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  memTerm: '';

  
  constructor(public membersService: MembersService, public duesService: DuesService, private userService: UserService, private attendanceService: AttendanceService ) {}
  
  ngOnInit(): void {
    this.startFilter();
    this.refreshAllUsersCount();
    this.refreshAllAttendanceCount();
    this.refreshAllMinistersCount();
    this.refreshAllLayCount();
    this.refreshAllVisitorsCount();

}
  
  /////////////////////////////////////////------Admin-------/////////////////////////////////////////////////////

  
  refreshAllUsersCount(){
    this.userService.getAllUserCount().subscribe((res) => {
      this.userService.count = res;
    })
  }

  refreshAllAttendanceCount(){
    this.attendanceService.getAllAttendanceCount().subscribe((res) => {
      this.attendanceService.count = res;
    })
  }

  refreshAllMinistersCount(){
    this.userService.getAllPositionMinistersCount().subscribe((res) => {
      this.userService.ministerscount = res;
    })
  }

  refreshAllLayCount(){
    this.userService.getAllPositionLayCount().subscribe((res) => {
      this.userService.laycount = res;
    })
  }

  refreshAllVisitorsCount(){
    this.userService.getAllPositionVisitorsCount().subscribe((res) => {
      this.userService.visitorscount = res;
    })
  }

  startFilter(){
    var payLoad = this.userService.getUserPayload();
    if(payLoad && payLoad.role == 'Admin'){
      this.memTerm = ''
    }else
      return this.memTerm = payLoad.role;    
  }


}

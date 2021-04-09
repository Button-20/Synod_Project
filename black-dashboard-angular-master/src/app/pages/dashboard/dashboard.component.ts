import { UserService } from '../../shared/user.service';
import { RegistrantsService } from '../../shared/registrant.service';
import { Component, OnInit } from "@angular/core";
import { AttendanceService } from 'src/app/shared/attendance.service';


@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  memTerm: '';

  
  constructor(public registrantsService: RegistrantsService, private userService: UserService, private attendanceService: AttendanceService ) {}
  
  ngOnInit(): void {
    this.startFilter();
    this.refreshAllRegistrantsCount();
    this.refreshAllAttendanceCount();
    this.refreshAllMinistersCount();
    this.refreshAllLayCount();
    this.refreshAllVisitorsCount();

}
  
  /////////////////////////////////////////------Admin-------/////////////////////////////////////////////////////

  
  refreshAllRegistrantsCount(){
    this.registrantsService.getAllRegistrantsCount().subscribe((res) => {
      this.registrantsService.count = res;
    })
  }

  refreshAllAttendanceCount(){
    this.attendanceService.getAllAttendanceCount().subscribe((res) => {
      this.attendanceService.count = res;
    })
  }

  refreshAllMinistersCount(){
    this.registrantsService.getAllPositionMinistersCount().subscribe((res) => {
      this.registrantsService.ministerscount = res;
    })
  }

  refreshAllLayCount(){
    this.registrantsService.getAllPositionLayCount().subscribe((res) => {
      this.registrantsService.laycount = res;
    })
  }

  refreshAllVisitorsCount(){
    this.registrantsService.getAllPositionVisitorsCount().subscribe((res) => {
      this.registrantsService.visitorscount = res;
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

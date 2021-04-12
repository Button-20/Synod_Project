import { UserService } from '../../shared/user.service';
import { RegistrantsService } from '../../shared/registrant.service';
import { Component, OnInit } from "@angular/core";
import { AttendanceService } from 'src/app/shared/attendance.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  memTerm: '';

  
  constructor(private spinner: NgxSpinnerService, public registrantsService: RegistrantsService, private userService: UserService, private attendanceService: AttendanceService ) {}
  
  ngOnInit(): void {
    this.spinner.show();
    this.startFilter();
    this.refreshAllRegistrantsCount();
    this.refreshAllAttendanceCount();
    this.refreshAllMinistersCount();
    this.refreshAllLayCount();
    this.refreshAllVisitorsCount();
    this.refreshAllDelegateCount();
    this.refreshAllObserverCount();

}
  
  /////////////////////////////////////////------Admin-------/////////////////////////////////////////////////////

  
  refreshAllRegistrantsCount(){
    this.registrantsService.getAllRegistrantsCount().subscribe((res) => {
      this.registrantsService.count = res;
      this.spinner.hide();
    })
  }

  refreshAllAttendanceCount(){
    this.attendanceService.getAllAttendanceCount().subscribe((res) => {
      this.attendanceService.count = res;
      this.spinner.hide();
    })
  }

  refreshAllMinistersCount(){
    this.registrantsService.getAllPositionMinistersCount().subscribe((res) => {
      this.registrantsService.ministerscount = res;
      this.spinner.hide();
    })
  }

  refreshAllLayCount(){
    this.registrantsService.getAllPositionLayCount().subscribe((res) => {
      this.registrantsService.laycount = res;
      this.spinner.hide();
    })
  }

  refreshAllVisitorsCount(){
    this.registrantsService.getAllPositionVisitorsCount().subscribe((res) => {
      this.registrantsService.visitorscount = res;
      this.spinner.hide();
    })
  }

  refreshAllDelegateCount(){
    this.registrantsService.getAllCategoryDelegateCount().subscribe((res) => {
      this.registrantsService.delegatecount = res;
      this.spinner.hide();
    })
  }

  refreshAllObserverCount(){
    this.registrantsService.getAllCategoryObserverCount().subscribe((res) => {
      this.registrantsService.observercount = res;
      this.spinner.hide();
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

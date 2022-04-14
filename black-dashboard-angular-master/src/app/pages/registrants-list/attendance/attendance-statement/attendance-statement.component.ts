import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from '../../../../shared/user.service';
import { Attendance } from '../../../../shared/attendance.model';
import { AttendanceService } from 'src/app/shared/attendance.service';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-attendance-statement',
  templateUrl: './attendance-statement.component.html',
  styleUrls: ['./attendance-statement.component.scss']
})
export class AttendanceStatementComponent implements OnInit {

  memTerm: string;
  search: '';
  tempSearch;
  fileName= 'Attendance_Report.xlsx';
  model = {
    _id: '',
    participant: '',
    date: '',
    temperature: ''
  }
  page: Number = 1;
  totalRecords: Number;

  constructor(private spinner: NgxSpinnerService, public attendanceService: AttendanceService, private userService: UserService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.refreshAttendanceList();
  }

  refreshAttendanceList(){
    this.attendanceService.getAttendanceList().subscribe((res) => {
      this.attendanceService.attendance = res as Attendance[];
      this.totalRecords = this.attendanceService.attendance.length;
      this.spinner.hide();
    })
  }

  startFilter(){
    var payLoad = this.userService.getUserPayload();
    if(payLoad && payLoad.classname == 'Admin'){
      this.memTerm = ''
    }else
      return this.memTerm = payLoad.classname;    
  }

  startSearch(startdate, enddate){
    this.tempSearch = this.search;

    this.attendanceService.getDateRangeFilter(startdate, enddate).subscribe((res) => {
      this.attendanceService.attendance = res as Attendance[];
    })
  }

  clearSearch(){
    this.tempSearch = '';
    this.search = '';

      this.model = {
        _id: '',
        participant: '',
        date: '',
        temperature: ''
      }
      
      this.refreshAttendanceList();
  }

  exportexcel(): void 
  {
     /* table id is passed over here */   
     let element = document.getElementById('content'); 
     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

     /* generate workbook and add the worksheet */
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

     /* save to file */
     XLSX.writeFile(wb, this.fileName);
    
  }

  downloadPDF(){
		let DATA = document.getElementById('content');
		let doc = new jsPDF('p','pt', 'a4');
	
		let handleElement = {
		  '#editor':function(element,renderer){
			return true;
		  }
		};
		doc.fromHTML(DATA.innerHTML,15,15,{
		  'width': 200,
		  'elementHandlers': handleElement
		});

      doc.save("Attendance_Statement.pdf")
    
  }



}

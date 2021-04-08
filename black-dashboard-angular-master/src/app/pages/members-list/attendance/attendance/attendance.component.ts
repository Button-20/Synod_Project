import { User } from './../../../../shared/user.model';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Members } from './../../../../shared/members.model';
import { MembersService } from './../../../../shared/members.service';
import { AttendanceService } from './../../../../shared/attendance.service';
import { Component, OnInit } from '@angular/core';
import { Attendance } from 'src/app/shared/attendance.model';
import * as moment from 'moment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  model = {
    _id: '',
    classname: '',
    participant: '',
    date: '',
    temperature: null,
  }
  memTerm: string;
  space: string = " ";
  serverErrorMessages = '';
  userbutton: boolean = false;
  search: '';
  page: Number = 1;
  totalRecords: Number;

  constructor(public attendanceService: AttendanceService, private modalService: NgbModal, public userService: UserService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.startFilter();
    this.refreshUsersList();
    this.refreshAttendanceList();
  }

  refreshUsersList(){
    this.userService.getuserList().subscribe((res) => {
      this.userService.users = res as User[];
    })
  }

  refreshAttendanceList(){
    this.attendanceService.getAttendanceList().subscribe((res) => {
      this.attendanceService.attendance = res as Attendance[];
      this.totalRecords = this.attendanceService.attendance.length;
    })
  }

  open(content, form: NgForm) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
    this.resetForm(form);
  }

  startFilter(){
    var payLoad = this.userService.getUserPayload();
    if(payLoad && payLoad.classname == 'Admin'){
      this.memTerm = ''
      this.userbutton = true;
    }else
      return this.memTerm = payLoad.classname, this.userbutton = true;    
  }

  onSubmit(form: NgForm) {
		if(form.value._id == ''){
			this.attendanceService.postAttendance(form.value).subscribe(
			  res => {
          this.toastr.success('Attendance has been added successfully', 'Attendance Posted');
          this.refreshAttendanceList();
          this.resetForm(form);			  
			  },
			  err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'Attendance Post Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong. Please contact admin.', 'Error 422')
			  }
			);
		  }else{
        this.attendanceService.putAttendance(form.value).subscribe(
			  res => {
          this.toastr.success('Attendance has been updated successfully', 'Attendance Updated');
          this.refreshAttendanceList();
          this.resetForm(form);			  
          },
          err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'Attendance Update Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong. Please contact admin.', 'Error 422')
          
        });
		  }
    }


    resetForm(form: NgForm) {
      var userPayload = this.userService.getUserPayload();
      if(userPayload)
      return this.model = {
        _id: '',
        classname: userPayload.classname,
        participant: '',
        date: '',
        temperature: null,
      }
      else
      return false;
    }

    onDelete(_id: string){
      if(confirm('Are you sure you want to delete this record?') == true){
        this.attendanceService.deleteAttendance(_id).subscribe((res => {
          this.refreshAttendanceList();
        }));
      }
    }
  
    onEdit(content, attendance: Attendance) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  
      this.attendanceService.selectedAttendance = attendance = {
        _id: this.model._id = attendance._id,
        classname: this.model.classname = attendance.classname,
        participant: this.model.participant = attendance.participant,
        date: this.model.date = this.formattedDate(attendance.date),
        temperature: this.model.temperature = attendance.temperature,
      }
    }


    formattedDate(date) {
      return moment(date).format("yyyy-MM-DD")
    }

}

import { Members } from './../../../../shared/members.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { Dues } from './../../../../shared/dues.model';
import { UserService } from './../../../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MembersService } from './../../../../shared/members.service';
import { DuesService } from './../../../../shared/dues.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-dues-list',
  templateUrl: './dues-list.component.html',
  styleUrls: ['./dues-list.component.scss']
})
export class DuesListComponent implements OnInit {

  model = {
    _id: '',
    classname: '',
    membername: '',
    userid: '',
    amount: null,
    dateofpayment: '',
    description: ''
  }
  memTerm: string;
  space: string = " ";
  serverErrorMessages = ''
  userbutton: boolean = false;
  search: '';
  page: Number = 1;
  totalRecords: Number;

  constructor(public duesService: DuesService, private toastr: ToastrService, public membersService: MembersService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.startFilter();
    this.refreshDuesList();
    this.refreshMembersList();
  }

  refreshDuesList(){
    this.duesService.getDuesList().subscribe((res) => {
      this.duesService.dues = res as Dues[];
      this.totalRecords = this.duesService.dues.length;
    })
  }

  refreshMembersList(){
    this.membersService.getMembersList().subscribe((res) => {
      this.membersService.members = res as Members[];
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
      this.userbutton = false;
    }else
      return this.memTerm = payLoad.classname, this.userbutton = true;    
  }
  
  onSubmit(form: NgForm) {
		if(form.value._id == ''){
			this.duesService.postDues(form.value).subscribe(
			  res => {
          this.toastr.success('Dues has been added successfully', 'Dues Posted');
          this.refreshDuesList();
          this.resetForm(form);			  
			  },
			  err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'Dues Post Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong. Please contact admin.', 'Error 422')
			  }
			);
		  }else{
        this.duesService.putDues(form.value).subscribe(
			  res => {
          this.toastr.success('Dues has been updated successfully', 'Dues Updated');
          this.refreshDuesList();
          this.resetForm(form);			  
          },
          err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'Dues Update Failed')
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
        classname: userPayload.classname,
        _id: '',
        userid: userPayload._id,
        membername: '',
        amount: null,
        dateofpayment: '',
        description: ''
      }
      else
      return false;
    }

    onDelete(_id: string){
      if(confirm('Are you sure you want to delete this record?') == true){
        this.duesService.deleteDues(_id).subscribe((res => {
          this.refreshDuesList();
        }));
      }
    }
  
    onEdit(content, dues: Dues) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  
      this.duesService.selectedDues = dues = {
        _id: this.model._id = dues._id,
        classname: this.model.classname = dues.classname,
        membername: this.model.membername = dues.membername,
        userid: this.model.userid = dues.userid,
        amount: this.model.amount = dues.amount,
        dateofpayment: this.model.dateofpayment = this.formattedDate(dues.dateofpayment),
        description: this.model.description = dues.description
      }
    }

    formattedDate(date) {
      return moment(date).format("yyyy-MM-DD")
  }

}

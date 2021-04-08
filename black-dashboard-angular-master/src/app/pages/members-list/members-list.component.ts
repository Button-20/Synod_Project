import { UserService } from './../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Members } from './../../shared/members.model';
import { MembersService } from './../../shared/members.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.scss']
})
export class MembersListComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  model = {
    classname: '',
    _id: '',
    firstname: '',
    lastname: '',
    othername: '',
    gender: '',
    email: '',
    digitaladdress: '',
    phonenumber: null,
    dateofbirth: ''
  }

  serverErrorMessages = ''
  search: string;
  memTerm: string;
  userbutton: boolean = false;
  filterMetadata = { count: 0 };
  page: Number = 1;
  totalRecords: Number;

  constructor(public membersService: MembersService, private toastr: ToastrService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshMembersList();
    this.startFilter();
  }

  refreshMembersList(){
    this.membersService.getMembersList().subscribe((res) => {
      this.membersService.members = res as Members[];
      this.totalRecords = this.membersService.members.length;
    })
  }

  onSubmit(form: NgForm) {
		if(form.value._id == ''){
			this.membersService.postMember(form.value).subscribe(
			  res => {
          this.toastr.success('User has been added successfully', 'User Posted');
          this.refreshMembersList();
          this.resetForm(form);			  
			  },
			  err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'User Post Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong. Please contact admin.', 'Error 422')
			  }
			);
		  }else{
        this.membersService.putMember(form.value).subscribe(
			  res => {
          this.toastr.success('User has been updated successfully', 'User Updated');
          this.refreshMembersList();
          this.resetForm(form);			  
          },
          err => {
          if (err.status === 422) {
          this.toastr.warning( this.serverErrorMessages = err.error.join('<br/>'), 'User Update Failed')
          }
          else
          this.toastr.error( this.serverErrorMessages = 'Something went wrong.Please contact admin.', 'Error 422')
          
        });
		  }
    }
    
    resetForm(form: NgForm) {
      var userPayload = this.userService.getUserPayload();
      if(userPayload)
      return this.model = {
        classname: userPayload.classname,
        _id: '',
        firstname: '',
        lastname: '',
        othername: '',
        gender: '',
        email: '',
        digitaladdress: '',
        phonenumber: null,
        dateofbirth: ''
      }
      else
      return false;
    }

    open(content, form: NgForm) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'});
      this.resetForm(form)
    }

    startFilter(){
      var payLoad = this.userService.getUserPayload();
      if(payLoad && payLoad.classname == 'Admin'){
        this.memTerm = ''
        this.userbutton = false;
      }else
        return this.memTerm = payLoad.classname, this.userbutton = true;    
    }

    onDelete(_id: string){
      if(confirm('Are you sure you want to delete this record?') == true){
        this.membersService.deleteMember(_id).subscribe((res => {
          this.refreshMembersList();
        }));
      }
    }
  
    onEdit(content, mem: Members) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  
      this.membersService.selectedMember = mem = {
        classname: this.model.classname = mem.classname,
        _id: this.model._id = mem._id,
        firstname: this.model.firstname = mem.firstname,
        lastname: this.model.lastname = mem.lastname,
        othername: this.model.othername = mem.othername,
        gender: this.model.gender = mem.gender,
        email: this.model.email = mem.email,
        digitaladdress: this.model.digitaladdress = mem.digitaladdress,
        phonenumber: this.model.phonenumber = mem.phonenumber,
        dateofbirth: this.model.dateofbirth = this.formattedDate(mem.dateofbirth)
      }
    }
  
    formattedDate(date) {
      return moment(date).format("yyyy-MM-DD")
  }

}

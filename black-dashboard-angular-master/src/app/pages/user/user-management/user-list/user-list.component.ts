import { ToastrService } from 'ngx-toastr';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from './../../../../shared/user.model';
import { UserService } from './../../../../shared/user.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  model = {
		_id: "",
		classname: "",
		title: "",
		firstname: "",
		othername: "",
		lastname: "",
		phonenumber: "",
    dateofbirth: "",
    position: "",
    circuit: "",
    category: "",
    circuitorganisation: "",
    email: "",
    password: "",
    role: "",
    loginPermission: false
  }
  serverErrorMessages = ''
  search: string;
  showPass = true;
  page: Number = 1;
  totalRecords: Number;
  fileName= 'Registration_Report.xlsx';


  constructor(public userService: UserService, private modalService: NgbModal, private modal: NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(){
      this.userService.getuserList().subscribe((res) => {
        this.userService.users = res as User[];
        this.totalRecords = this.userService.users.length;
    })
  }
  
  onDelete(_id: string){
		if(confirm('Are you sure you want to delete this record?') == true){
			this.userService.deleteUser(_id).subscribe((res => {
				this.refreshUserList();
			}));
	  }
	}

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    this.showPass = true;

  
    this.model = {
      _id: "",
      classname: "",
      title: "",
      firstname: "",
      othername: "",
      lastname: "",
      phonenumber: "",
      dateofbirth: "",
      position: "",
      circuit: "",
      category: "",
      circuitorganisation: "",
      email: "",
      password: "",
      role: "",
      loginPermission: false
    }
  
  }


  onEdit(content, user: User) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
    this.showPass = false;

    this.userService.selectedUser = user = {
      _id: this.model._id = user._id,
      classname: this.model.classname = user.classname,
      title: this.model.title = user.title,
      firstname: this.model.firstname = user.firstname,
      othername: this.model.othername = user.othername,
      lastname: this.model.lastname = user.lastname,
      phonenumber: this.model.phonenumber = user.phonenumber,
      dateofbirth: this.model.dateofbirth = this.formattedDate(user.dateofbirth),
      position: this.model.position = user.position,
      circuit: this.model.circuit = user.circuit,
      category: this.model.category = user.category,
      circuitorganisation: this.model.circuitorganisation = user.circuitorganisation,
      email: this.model.email = user.email,
      password: this.model.password = user.password,
      role: this.model.role = user.role,
      loginPermission: this.model.loginPermission = user.loginPermission
    }

    
  }


  onSubmit(form: NgForm) {
		if(form.value._id == ''){
			this.userService.postUser(form.value).subscribe(
			  res => {
          this.toastr.success('User has been added successfully', 'User Posted');
          this.refreshUserList();
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
        this.userService.putUser(form.value).subscribe(
			  res => {
          this.toastr.success('User has been updated successfully', 'User Updated');
          this.refreshUserList();
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
      this.model;
      form.resetForm();
    }

    formattedDate(date) {
      return moment(date).format("yyyy-MM-DD")
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
  
  
}

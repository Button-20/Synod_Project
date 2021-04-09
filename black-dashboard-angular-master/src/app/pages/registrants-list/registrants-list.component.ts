import { Registrant } from './../../shared/registrant.model';
import { RegistrantsService } from './../../shared/registrant.service';
import { UserService } from '../../shared/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-registrants-list',
  templateUrl: './registrants-list.component.html',
  styleUrls: ['./registrants-list.component.scss']
})
export class RegistrantsListComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  model = {
    _id: '',
    title: '',
    firstname: '',
    othername: '',
    lastname: '',
    dateofbirth: '',
    phonenumber: '',
    position: '',
    circuit: '',
    category: '',
    circuitorganisation: '',
    email: '',
  }
  fileName= 'Registrants_Report.xlsx';
  serverErrorMessages = ''
  search: string;
  memTerm: string;
  userbutton: boolean = false;
  filterMetadata = { count: 0 };
  page: Number = 1;
  totalRecords: Number;

  constructor(public registrantsService: RegistrantsService, private toastr: ToastrService, private modalService: NgbModal, private userService: UserService) { }

  ngOnInit(): void {
    this.refreshMembersList();
    this.startFilter();
  }

  refreshMembersList(){
    this.registrantsService.getRegistrantsList().subscribe((res) => {
      this.registrantsService.registrants = res as Registrant[];
      this.totalRecords = this.registrantsService.registrants.length;
    })
  }

  onSubmit(form: NgForm) {
		if(form.value._id == ''){
			this.registrantsService.postRegistrant(form.value).subscribe(
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
        this.registrantsService.putRegistrant(form.value).subscribe(
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
        _id: '',
        title: '',
        firstname: '',
        othername: '',
        lastname: '',
        dateofbirth: '',
        phonenumber: '',
        position: '',
        circuit: '',
        category: '',
        circuitorganisation: '',
        email: ''
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
        this.registrantsService.deleteRegistrant(_id).subscribe((res => {
          this.refreshMembersList();
        }));
      }
    }
  
    onEdit(content, registrant: Registrant) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  
      this.registrantsService.selectedRegistrant = registrant = {
        _id: this.model._id = registrant._id,
        title: this.model.title = registrant.title,
        firstname: this.model.firstname = registrant.firstname,
        lastname: this.model.lastname = registrant.lastname,
        othername: this.model.othername = registrant.othername,
        email: this.model.email = registrant.email,
        position: this.model.position = registrant.position,
        circuit: this.model.circuit = registrant.circuit,
        category: this.model.category = registrant.category,
        circuitorganisation: this.model.circuitorganisation = registrant.circuitorganisation,
        phonenumber: this.model.phonenumber = registrant.phonenumber,
        dateofbirth: this.model.dateofbirth = this.formattedDate(registrant.dateofbirth)
      }
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

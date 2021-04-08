import * as XLSX from 'xlsx'; 
import { UserService } from './../../../../shared/user.service';
import { Dues } from './../../../../shared/dues.model';
import { DuesService } from './../../../../shared/dues.service';
import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import * as jsPDF from 'jspdf';


@Component({
  selector: 'app-dues-statement',
  templateUrl: './dues-statement.component.html',
  styleUrls: ['./dues-statement.component.scss']
})
export class DuesStatementComponent implements OnInit {

  memTerm: string;
  search: '';
  tempSearch;
  fileName= 'Financial_Statement.xlsx';
  model = {
    startdate: '',
    enddate: ''
  }
  page: Number = 1;
  totalRecords: Number;

  constructor(public duesService: DuesService, private userService: UserService) { }

  ngOnInit(): void {
    this.startFilter();
    this.refreshDuesList();
  }


  refreshDuesList(){
    this.duesService.getDuesList().subscribe((res) => {
      this.duesService.dues = res as Dues[];
      this.totalRecords = this.duesService.dues.length
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

    this.duesService.getDateRangeFilter(startdate, enddate).subscribe((res) => {
      this.duesService.dues = res as Dues[];
    })
  }

  clearSearch(){
    this.tempSearch = '';
    this.search = '';

      this.model = {
        startdate: '',
        enddate: ''
      }
      
      this.refreshDuesList();
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

      doc.save("Financial_Statement.pdf")
    
  }

  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('content'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, this.fileName);
			
    }

}

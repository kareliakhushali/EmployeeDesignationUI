import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { EmployeeFormComponent } from './employee-form/employee-form.component';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {

  constructor(public empService:EmployeeService,public datepipe: DatePipe,public toast:ToastrService)
  {

  }
//here we are using viewchild to access the child component
@ViewChild(EmployeeFormComponent) emp:EmployeeFormComponent;
  ngOnInit(): void {
this.empService.getEmployees().subscribe(data=>{
  this.empService.listEmployee = data;
})
  }
  populateEmployee(selectedEmployee:Employee)
  {
    console.log(selectedEmployee.doj);
    let dateformat= this.datepipe.transform(selectedEmployee.doj,'yyyy-MM-dd');
    selectedEmployee.doj = dateformat;
    this.empService.employeeData = selectedEmployee;
    console.log("after transform",selectedEmployee.doj);

    if(this.emp.isSlide==='off')
    {
      this.emp.hideShowSlide();
    }

  }
  delete(id:number)
  {
    if(confirm("Do you really want to delete this record?"))
    {
      this.empService.deleteEmployee(id).subscribe(data=>{
      console.log('Record deleted....');
      this.empService.getEmployees().subscribe(data=>{
      this.empService.listEmployee = data;
      //this.toast.error('Success','Record Deleted');
      this.toast.error('Success','Record Deleted');
  });
},
err=>{
  console.log('Record not deleted');
}
);
    }
  }


}

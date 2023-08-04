import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/shared/employee.model';
import { EmployeeService } from 'src/app/shared/employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{
constructor(public empService :EmployeeService,public toast:ToastrService){

}
//view child is a decorator helps to access html dom in backend file
//child component can be accessed in the parent componennt
@ViewChild('checkbox1') checkBox:ElementRef;
isSlide:string = 'off';
  ngOnInit()
  {
this.empService.getDesignation().subscribe(data=>{
this.empService.listDesignation  = data;
});
  }
  submit(form:NgForm)
  {
    this.empService.employeeData.isMarried = form.value.isMarried == true?1:0;
    this.empService.employeeData.isActive = form.value.isActive==true?1:0;
    if(this.empService.employeeData.id==0)
    this.insertEmployee(form);
    else
    this.updateEmployee(form);
    console.log('Event is working');
  }
  insertEmployee(myform:NgForm)
  {
    this.empService.saveEmployee().subscribe(data=>
    {
      this.resetForm(myform);
      this.refreshData();
      this.toast.success('Success','Record Saved');
      //console.log("saved successfully");
    });
  }
  updateEmployee(myform:NgForm)
  {
    this.empService.updateEmployee().subscribe(data=>
      {
        this.resetForm(myform);
        this.refreshData();
        this.toast.warning('Success','Record Updated');
//        console.log("record updated");

      });

  }
  resetForm(myform:NgForm)
  {
    myform.form.reset(myform.value);
    this.empService.employeeData = new Employee();
    this.hideShowSlide();
  }
  refreshData()
  {
    this.empService.getEmployees().subscribe(res=>{
    this.empService.listEmployee = res;
   });
  }
  hideShowSlide()
  {
if(this.checkBox.nativeElement.checked)
{
  this.checkBox.nativeElement.checked = false;
  this.isSlide = 'off';
}
else
{
  this.checkBox.nativeElement.checked = true;
  this.isSlide = 'on';

}
  }


}

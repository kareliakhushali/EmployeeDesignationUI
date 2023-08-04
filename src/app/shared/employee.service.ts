import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Designation, Employee } from './employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private myhttp:HttpClient) { }
  employeeUrl:string = 'https://localhost:44334/api/Employee';
  designationUrl:string = 'https://localhost:44334/api/Designation';
  //storing all the collection of employee in the object
  //getting employee list
  listEmployee:Employee[]=[];
  listDesignation:Designation[]=[];
//object for inserting the data
  employeeData : Employee =  new Employee();
  saveEmployee()
  {
    // to insert the data in the url from the data stored in the object
    return this.myhttp.post(this.employeeUrl,this.employeeData);
  }
  updateEmployee()
  {
    // in the update as we can see in the api that id as well as the object along with that is also passed as the parameter
    return this.myhttp.put(`${this.employeeUrl}/${this.employeeData.id}`,this.employeeData);
  }
  //get method in angular is observable
  // to get the data observable is more preferrable
  getEmployees():Observable<Employee[]>
  {
    //observable of type class Employee
return this.myhttp.get<Employee[]>(this.employeeUrl);
  }
  getDesignation():Observable<Designation[]>
  {
    return this.myhttp.get<Designation[]>(this.designationUrl);
  }
  deleteEmployee(id:number)
  {
return this.myhttp.delete(`${this.employeeUrl}/${id}`);
  }


}

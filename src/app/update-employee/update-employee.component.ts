import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/Employee';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id: number;
  employee: Employee;
  submitted: boolean;
  constructor( private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id)
      .subscribe(data => {
        console.log(data);
        this.employee = data;
      },
        error => console.log(error));
  }

  updateEmployee() {
    this.employeeService.updateEmployee(this.id, this.employee)
      .subscribe(data => {
        console.log(data);
      },
        error => console.log(error));
         this.employee = new Employee();
         this.gotoList();
  }

  gotoList() {
    this.router.navigate(['/employees']);
  }

  onSubmit() {
    this.submitted = true;
    this.updateEmployee();
  }

}

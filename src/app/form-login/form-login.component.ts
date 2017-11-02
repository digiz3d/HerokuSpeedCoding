import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {

  formInput: { login: String, password: String } = { login: '', password: '' };

  constructor(private http: HttpClient, private router: Router) { }


  ngOnInit() {
  }

  //Call by formLogin
  onSubmit() {
    console.log(this.formInput);
    this.http.post('/api/authenticate', { login: this.formInput.login, password: this.formInput.password })
      //Promise
      .subscribe(data => {
        //console.log(data);
        if(data['success'])
        {
          this.router.navigate(['/transaction-list']);
        }
      });
  }

}

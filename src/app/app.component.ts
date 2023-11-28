import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
interface Login {
  username: string;
  password: string;
}


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, HttpClientModule],
  providers: [HttpClient],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'BaseDeDatos';
  loginForm!: FormGroup;
  http = inject(HttpClient);

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit(){
    this.loginForm.value;
    console.log(this.loginForm.value);
     this.login(this.loginForm.value).subscribe({
     next:(res) => {console.log(res)}, 
       error:(err:any) => {console.error(err)}
     })
  }

  login(loginData: Login) {
    return this.http.post("http://localhost:3000/login", {
      username: loginData.username,
      password: loginData.password
    });
  }
}

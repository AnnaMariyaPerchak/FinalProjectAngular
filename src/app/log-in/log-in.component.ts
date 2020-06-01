import { Component, OnInit } from '@angular/core';
import { LogInService } from '../shared/services/log-in.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  login: string;
  password: string;

  constructor(private auth: LogInService, private router: Router) { }

  ngOnInit(): void { }
  
  signIn(): void {
    this.auth.signIn(this.login, this.password);
  }

}

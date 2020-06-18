import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/shared/services/log-in.service';
import { PreferencesService } from 'src/app/shared/services/preferences.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  login: string;
  password: string;

  constructor(private auth: LogInService, 
    private prefService: PreferencesService) { }

  ngOnInit(): void { }
  
  signIn(): void {
    this.auth.signIn(this.login, this.password);
    this.prefService.preference.next(JSON.parse(localStorage.getItem('preference')));
  }

}

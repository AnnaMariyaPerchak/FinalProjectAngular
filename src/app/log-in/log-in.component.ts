import { Component, OnInit } from '@angular/core';
import { LogInService } from '../shared/services/log-in.service';
import { Router } from '@angular/router';
import { PreferencesService } from '../shared/services/preferences.service';
import { IPreference } from '../shared/interfaces/preference.interface';
import { Preference } from '../shared/modules/preference.module';
import { UsersService } from '../shared/services/users.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  login: string;
  password: string;

  constructor(private auth: LogInService, 
    private prefService: PreferencesService,
    private userService:UsersService,
    private router: Router) { }

  ngOnInit(): void { }
  
  signIn(): void {
    this.auth.signIn(this.login, this.password);
    this.prefService.preference.next(JSON.parse(localStorage.getItem('preference')));
  }

}

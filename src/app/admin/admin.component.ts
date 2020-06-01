import { Component, OnInit } from '@angular/core';
import { LogInService } from '../shared/services/log-in.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private auth:LogInService) { }

  ngOnInit(): void {}
  
  logOut(): void {
    this.auth.signOut();
  }
}

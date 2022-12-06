import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogService } from 'src/app/services/log.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(
    private logService:LogService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  adminLogout(){
    this.logService.sendId('');
    this.router.navigate(['/admin']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ApiServService } from '../api-serv.service';
import { stringify } from 'querystring';
import { ListComponent } from '../list/list.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  
  constructor(private api: ApiServService, private listComp: ListComponent, private app: AppComponent) { }

  ngOnInit(): void {
  }
  
  inscription($event){
    let user = $('#utilisateur').val();
    let psw = $('#password').val();

    this.api.inscription(user, psw).subscribe((data: Object) => {
      this.listComp.afficheLists(data);
    });
  }
  
  connexion($event){
    let user = $('#utilisateur').val();
    let psw = $('#password').val();

    this.api.connexion(user, psw).subscribe((data: Object) => {
      this.listComp.afficheLists(data);
    });
  }
}

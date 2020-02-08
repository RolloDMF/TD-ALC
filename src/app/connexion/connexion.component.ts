import { Component, OnInit } from '@angular/core';
import { ApiServService } from '../api-serv.service';
import { ObjetAlc } from '../objetAlc';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  
  constructor(private api: ApiServService) { }

  ngOnInit(): void {
  }

  datas: ObjetAlc;
  
  inscription($event){
    let user = $('#utilisateur').val().toString();
    let psw = $('#password').val().toString();

    this.api.inscription(user, psw);
  }
  
  connexion($event){
    let user = $('#utilisateur').val().toString();
    let psw = $('#password').val().toString();

    this.api.connexion(user, psw);
  }
}

import { Component, OnInit } from '@angular/core';
import { ApiServService } from '../api-serv.service';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit {
  
  constructor(private api: ApiServService) { }
  
  inscription($event){
    let user = $('#utilisateur').val();
    let psw = $('#password').val();

    let liste = this.api.inscription(user, psw);

    console.log(liste);
    
  }
  
  connexion($event){
    console.log("oui");  
  }
  
  ngOnInit(): void {
  }

}

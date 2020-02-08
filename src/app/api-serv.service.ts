import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjetAlc } from './objetAlc';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiServService {
  constructor(private http: HttpClient, private router: Router) { };
  url = "http://92.222.69.104/todo/";
  datas: ObjetAlc;

  inscription(user, psw){

    this.http.get<ObjetAlc>(this.url + "create/" + user + "/" + psw).subscribe((data: ObjetAlc) => {
      this.datas = data;
      this.router.navigate(["listes"]);
    });

  }

  connexion(user, psw){

    let headers = new HttpHeaders()
    .set("login", user)
    .set("password", psw);
    
    this.http.get<ObjetAlc>(this.url + "listes", {
      headers: headers
    }).subscribe((data: ObjetAlc) => {
      this.datas = data;
      this.router.navigate(["listes"]);
    });

  }

  modification(data){
    let d = JSON.stringify(data);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    this.http.post<ObjetAlc>(this.url + "listes", d, {
      headers: headers
    }).subscribe((data: ObjetAlc) => {
      this.datas = data;
      this.router.navigate(["listes"]);
    });
  }
}

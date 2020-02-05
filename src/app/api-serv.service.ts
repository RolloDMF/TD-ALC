import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {
  constructor(private http: HttpClient) { };

  datas: Object;
  url = "http://92.222.69.104/todo/";

  inscription(user, psw){
    console.log(this.url + "create/" + user + "/" + psw);
    
    this.http.get(this.url + "create/" + user + "/" + psw).subscribe(
      data => {
        console.log(data);
        this.datas = "caca";
      }
    );

    return this.datas;
  }
}

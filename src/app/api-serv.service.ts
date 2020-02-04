import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServService {
  constructor(private http: HttpClient) { };

  url = "http://92.222.69.104/todo/";

  inscription(user, psw){
    return this.http.get(this.url + "create/" + user + "/" + psw).map((res:Response) => res.json());
  }
}

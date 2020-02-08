import { Component, OnInit } from '@angular/core';
import { ApiServService } from '../api-serv.service';
import { ObjetAlc } from '../objetAlc';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  datas: ObjetAlc;
  nvlliste:boolean = false;
  nvlelem:boolean = false;
  modifelem:boolean = false;
  currentList;
  currentElem;

  constructor(private api: ApiServService) {}

  ngOnInit(): void {
    this.datas = this.api.datas;
  }

  supprElem(elem){    
    for (let i = 0; i < this.datas.todoListes.length; i++) {
      for (let j = 0; j < this.datas.todoListes[i].elements.length; j++) {
        if (this.datas.todoListes[i].elements[j] == elem) {
          this.datas.todoListes[i].elements.splice(j,1);
        }
      }
    }
    this.api.modification(this.datas);
  }

  supprList(name){
    for (let i = 0; i < this.datas.todoListes.length; i++) {          
      if (this.datas.todoListes[i].name == name) {
        this.datas.todoListes.splice(i,1);
      }
    }
    this.api.modification(this.datas);
  }

  butNvlList(){
    this.nvlliste = true;
  }

  butAn(){
    this.nvlliste = false;
  }

  butNvlElem(liste){
    this.nvlelem = true;
    this.currentList = liste;
  }

  butAnElem(){
    this.nvlelem = false;
  }

  createNvlList(name){
    var index = this.datas.todoListes.length;
    this.datas.todoListes[index] = { "name": name, "elements": [] };
    this.nvlliste = false;
    this.api.modification(this.datas);
  }

  createNvlElem(name){    
    for (let i = 0; i < this.datas.todoListes.length; i++) {          
      if (this.datas.todoListes[i].name == this.currentList) {
        var indexElem = this.datas.todoListes[i].elements.length
        this.datas.todoListes[i].elements[indexElem] = name;
      }
    }
    this.nvlelem = false;
    this.api.modification(this.datas);
  }

  saveElem(elem, name){
    this.currentList = name;
    this.currentElem = elem;

    this.modifelem = true;
    
  }

  modifElem(newelem){
    for (let i = 0; i < this.datas.todoListes.length; i++) {
      if (this.datas.todoListes[i].name == this.currentList) {       
        for (let j = 0; j < this.datas.todoListes[i].elements.length; j++) {
          if (this.datas.todoListes[i].elements[j] == this.currentElem) {
            this.datas.todoListes[i].elements[j] = newelem;
            this.currentElem = "";
            this.currentList = "";
          }
        }
      }
    }
    this.modifelem = false;
    this.api.modification(this.datas);
  }

  butAnModElem(){
    this.modifelem = false;
  }
}
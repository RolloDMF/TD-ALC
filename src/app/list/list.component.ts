import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { ApiServService } from '../api-serv.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(private app: AppComponent, private api: ApiServService) { }

  ngOnInit() {}

  id = 0;
  idElem = 0;
  datas;

  afficheLists(d) { 

    $("#formulaire").remove();
    this.app.connected = true;
    var listeFrame = $('#listes');
    var listes = d.todoListes;

    this.datas = d;
        
    for (let index = 0; index < listes.length; index++) {
        
        var listeName =  listes[index]['name'];

        listeFrame.append('<ul id="liste' + this.id + '" class="created-listes list-group"></ul>');

        var elem = listes[index]['elements'];
        var listeEnCour = $('#liste' + this.id);

        listeEnCour.append('<h2 class="list-group-item">' + listeName + '<button class="supprList btn btn-danger" data-liste="' + listeName + '">X</button></h2>');
        
        for (let j = 0; j < elem.length; j++) {
            listeEnCour.append('<li id=elem-' + this.id + '-' + this.idElem + ' class="element list-group-item">' + elem[j] + '</li>');
            $('#elem-' + this.id + '-' + this.idElem).append('<button class="supprElem btn btn-danger" data-liste="' + listeName + '" data-position="' + j + '">X</button>');
            
            this.idElem++;
        }

        listeEnCour.append('<div class="form-group" id=div' + this.id + ' class=button-frame></div>'); 
        $('#div' + this.id).after('<button class="btn btn-success" data-index="' + this.id + '" data-id="liste' + this.id + '" data-button="div' + this.id + '" id="ajouterElem' + this.id + '"> + </button>');

        $('#ajouterElem' + this.id).click(this.addElem);

        this.id++;
    }

    $('#listes').append('<div id="ajoutFrame"></div>');

    $('#ajoutFrame').append('<button class="btn btn-info" id="ajouter"> Ajout Liste </button>');

    $('#ajouter').click(this.addListe);

    this.datas = d;

    var supprElemButton = $('.supprElem');
    var supprListButton = $('.supprList');

    for (let index = 0; index < supprListButton.length; index++) {
        
        $(supprListButton[index]).click(this.supprList);

    }

    for (let index = 0; index < supprElemButton.length; index++) {

        $(supprElemButton[index]).click(this.supprElem);
        
    }   
  }

  addListe() {

    $("#ajoutFrame").append('<div id="div-tempo-liste" class="form-group"><div>');
    $("#div-tempo-liste").append('<label>Nommez votre nouvelle liste</label>');
    $("#div-tempo-liste").append('<input class="form-control" type="text" id="newListe">');
    $("#div-tempo-liste").append('<button class="btn btn-primary" id="validNewListe">Valider</button>');

    $(this).hide();

    $("#validNewListe").click(this.createList);
    
  }

  addElem() {
            
    var idDiv = $(this).data('button');
    var idName = $(this).data('id');
    var index = $(this).data('index');
    var div = $('#' + idDiv);
    var idButton = $(this).attr('id');

    div.append('<div id=div-tempo-elem></div>')
    $('#div-tempo-elem').append('<label>Nommez votre element liste</label>');
    $('#div-tempo-elem').append('<input type="text" class="form-control" id="newElem">');
    $('#div-tempo-elem').append('<button class="btn btn-primary" id="validNewElem">Valider</button>');

    $(this).hide();

    $("#validNewElem").click([idName, index, idDiv, idButton], this.createElem);

  }

  createList() {

    var name = $('#newListe').val();

    $('#ajoutFrame').before('<ul style="position: relative; left: 250px; opacity: 0;" id="liste' + this.id + '" class="created-listes list-group"></ul>');
    $('#liste' + this.id).append('<h2 class="list-group-item">' + name + '<button id="' + this.id + '" class="supprList btn btn-danger" data-liste="' + name + '">X</button></h2>');
    $('#liste' + this.id).append('<div class="form-group" id=div' + this.id + ' class=button-frame></div>');
    $('#div' + this.id).after('<button class="btn btn-success" data-index="' + this.id + '" data-id="liste' + this.id + '" data-button="div' + this.id + '" id="ajouterElem' + this.id + '"> + </button>')

    $('#' + this.id).click(this.supprList);
    $('#ajouterElem' + this.id).click(this.addElem);

    $('#liste' + this.id).animate({left: '0px', opacity: 1}, 1000);

    this.id++
    
    this.datas.todoListes.push({ "name": name, "elements": [] });

    $(this).parent().remove();
    $('#ajouter').fadeIn(500);

    this.modification();

  }

 createElem(dataElem) {

    var elem = $('#newElem').val();
    var nameListe = ($('#' + dataElem.data[0] + ' h2').html()).split('<')[0];
    

    $('#' + dataElem.data[2]).before('<li style="left: 250px; opacity: 0;" id=elem-' + dataElem.data[1] + '-' + this.idElem + ' class="element list-group-item">' + elem + '</li>');
    $('#elem-' + dataElem.data[1] + '-' + this.idElem).append('<button id="' + this.id + '" class="supprElem btn btn-danger" data-liste="' + nameListe + '" data-position="' + this.idElem + '">X</button>');

    $('#'+ this.id).click(this.supprElem);

    this.id++;
    
    $('#elem-' + dataElem.data[1] + '-' + this.idElem).animate({left: '0px', opacity: 1}, 1000);

    this.idElem++;

    for (let index = 0; index < this.datas.todoListes.length; index++) {
        
        if (this.datas.todoListes[index].name == nameListe) {

          this.datas.todoListes[index].elements.push(elem);

        }
        
    }

    $(this).parent().remove();
    
    $('#' + dataElem.data[3]).show(1000);

    this.modification();

  }

  modification() {

    this.api.modification(this.datas);
    console.log(this.datas);
    
    /*$.ajax({
        url: 'http://92.222.69.104/todo/listes',
        method: 'post',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(this.datas)
    }).done(function () {
        console.log('success');
    }).fail(function () {
        console.log('fail');    
    });*/

  }

  supprList() {

    var name = $(this).data('liste');
    var elem = $(this).parent().parent();

    elem.fadeOut(1000, function(){
        $(this).remove();
    });

    for (let i = 0; i < this.datas.todoListes.length; i++) {
        
        if (this.datas.todoListes[i].name == name) {
          this.datas.todoListes.splice([i],1);
        }
        
    }
    
    this.modification();

  }

  supprElem() {
    
    var name = $(this).data('liste');
    var position = $(this).data('position');
    var elem = $(this).parent()
    
    elem.fadeOut(1000, function(){
        $(this).remove();
    });

    for (let i = 0; i < this.datas.todoListes.length; i++) {
        
        if (this.datas.todoListes[i].name == name) {
          this.datas.todoListes[i].elements.splice([position],1);
        }
        
    }
    
    this.modification();

  }
}


import { Component } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  departamentos = [];
  provincias = [];
  distritos = [];
  dataArchivo = '';

  constructor () {}

  ngOnInit() {
  }

  changeFile($event) : void {
    this.readFile($event.target);
  }

  readFile = function(inputValue: any){
    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();
    var dep = [];
    var prov = [];
    var dist = [];
    myReader.onloadend  = () => {
      // you can perform an action with readed data here
      let dataFile = myReader.result;
      this.dataArchivo = dataFile;
      dataFile = getData(dataFile, "\n");

      for(let data of dataFile){
          data = getData(data, '/');
          if(data.length == 1) {
            var r = isDepartamento(data);
            dep.push(r);
          }

          if(data.length == 2){
            var p = isProvincia(data);
            prov.push(p);
          }

          if(data.length == 3){
            var d = isDistrito(data);
            dist.push(d);
          }
      }
      this.departamentos = dep;
      this.provincias = prov;
      this.distritos = dist;
    }
    myReader.readAsText(file);
    const getData = function (string, delimiter) {
      let dataString = string.split(delimiter);
      let result = [];
      for(let data of dataString){
        if(data.indexOf('“') > -1 || data.indexOf('"') > -1 || data.indexOf("'") > -1) {
          data = data.replace('“', '');
          data = data.replace('”', '');
          data = data.replace('"', '');
          data = data.replace("'", '');
        }
        data = data.trim();
        if(data.length > 0){
          result.push(data);
        }
      }
      return result;
    }

    const isDepartamento = function (arrayDepartamento){
      let result = {};
      var codigo = '', nombre = '';

      for(let data of arrayDepartamento) {
        data = getData(data, ' ');

        if(data.length > 2) {
          for(var _i = 0; _i < data.length; _i++){
            if(_i == 0){
              codigo = data[_i];
            }else{
              nombre += data[_i] + ' ';
            }
          }
        }else{
          codigo = data[0];
          nombre = data[1];
        }

        result = {
            codigo : codigo,
            nombre : nombre,
            codigoPadre : '-',
            nombrePadre : '-'
        }
        return result;
      }
    }

    const isProvincia = function (arrayProvincia) {
      let result = {};
      var dep = getData(arrayProvincia[0], ' ');
      var prov = getData(arrayProvincia[1], ' ');
      var codigo = '', nombre = '', codigoPadre = '', nombrePadre = '';

      if(prov.length > 2) {
        for(var _i = 0; _i < prov.length; _i++){
          if(_i == 0){
            codigo = prov[_i];
          }else{
            nombre += prov[_i] + ' ';
          }
        }
      }else{
        codigo = prov[0];
        nombre = prov[1];
      }

      if(dep.length > 2) {
        for(var _i = 0; _i < dep.length; _i++){
          if(_i == 0){
            codigoPadre = dep[_i];
          }else{
            nombrePadre += dep[_i] + ' ';
          }
        }
      }else{
        codigoPadre = dep[0];
        nombrePadre = dep[1];
      }

      result = {
        codigo : codigo,
        nombre : nombre,
        codigoPadre : codigoPadre,
        nombrePadre : nombrePadre
      }

      return result;
    }

    const isDistrito = function (arrayDistrito) {
      let result = {};
      var prov = getData(arrayDistrito[1], ' ');
      var dist = getData(arrayDistrito[2], ' ');
      var codigo = '', nombre = '', codigoPadre = '', nombrePadre = '';
      if(dist.length > 2) {
        for(var _i = 0; _i < dist.length; _i++){
          if(_i == 0){
            codigo = dist[_i];
          }else{
            nombre += dist[_i] + ' ';
          }
        }
      }else{
        codigo = dist[0];
        nombre = dist[1];
      }

      if(prov.length > 2) {
        for(var _i = 0; _i < prov.length; _i++){
          if(_i == 0){
            codigoPadre = prov[_i];
          }else{
            nombrePadre += prov[_i] + ' ';
          }
        }
      }else{
        codigoPadre = prov[0];
        nombrePadre = prov[1];
      }

      result = {
        codigo : codigo,
        nombre : nombre,
        codigoPadre : codigoPadre,
        nombrePadre : nombrePadre
      }

      return  result;
    }
  }
}

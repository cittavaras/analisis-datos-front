import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import { debounceTime } from 'rxjs/operators';
import {ApiService} from "./api.service";
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';
import { mapToMapExpression } from '@angular/compiler/src/render3/util';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';
import { JsonService} from './json.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [ApiService]
  template: 
  `
    <div>
      <angular-tag-cloud
        [data]="data"
        [width]="options.width"
        [height]="options.height"
        [color]="options.color"
        [overflow]="options.overflow">
      </angular-tag-cloud>
    </div>
  `
})
export class AppComponent implements OnInit{
    title: string;
    form: FormGroup;
    options: CloudOptions = {
      // if width is between 0 and 1 it will be set to the width of the upper element multiplied by the value
      width: 1000,
      // if height is between 0 and 1 it will be set to the height of the upper element multiplied by the value
      height: 400,
      overflow: false,
      zoomOnHover: {
        scale: 1.2,
        transitionTime: 0.3,
        delay: .3
      },
      realignOnResize: true,
    };
    data: CloudData[] = [
      {text: 'RECICLAR', weight: 60, color: '#8AFF33', rotate: 90},
      {text: 'CONTAMINACIÓN', weight: 70, color: '#3D8034', rotate: 10},
      {text: 'BASURA', weight: 45, color: '#3C7534', rotate: 35},
      {text: 'MEDIO AMBIENTE', weight: 100, color: '#187809', rotate: 20},
      {text: '3R', weight: 40, color: '#06C234', rotate: 10},
      {text: 'Biodegradable', weight: 40, color: '#008000', rotate: 12},
      {text: 'Naturaleza', weight: 40, color: '#008000', rotate: 100},
      {text: 'Salud', weight: 40, color: '#008000', rotate: 120},
      {text: 'Desechos', weight: 50, color: '#3C7534', rotate: 35},
      {text: 'Vida', weight: 40, color: '#008000', rotate: 12},
      {text: 'Smog', weight: 30, color: '#3C7534', rotate: 35},
      {text: 'Flora', weight: 40, color: '#008000', rotate: 120},
      {text: 'Fauna', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},
      // ...
    ];
    data2: CloudData[] = [
      {text: 'REDUCIR', weight: 120, color: '#8AFF33', rotate: 90},
      {text: 'NO + BOMBILLAS PLÁSTICAS', weight: 60, color: '#3D8034', rotate: 10},
      {text: 'BOLSAS DE TELA', weight: 45, color: '#3C7534', rotate: 35},
      {text: 'MEDIO AMBIENTE', weight: 100, color: '#187809', rotate: 20},
      {text: '3R', weight: 40, color: '#06C234', rotate: 10},
      {text: 'Biodegradable', weight: 40, color: '#008000', rotate: 12},
      {text: 'Naturaleza', weight: 40, color: '#008000', rotate: 100},
      {text: 'Salud', weight: 40, color: '#008000', rotate: 120},
      {text: 'NO + BOTELLAS PLÁSTICAS', weight: 50, color: '#3C7534', rotate: 35},
      {text: '+Vida', weight: 40, color: '#008000', rotate: 12},
      {text: '-BASURA ACUMULADA', weight: 30, color: '#3C7534', rotate: 35},
      {text: '+Flora', weight: 40, color: '#008000', rotate: 120},
      {text: '+Fauna', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},
      // ...
    ];

data3: CloudData[] = [
      {text: 'REUTILIZAR', weight: 120, color: '#8AFF33', rotate: 90},
      {text: '-CONTAMINACIÓN', weight: 70, color: '#3D8034', rotate: 10},
      {text: '-BASURA', weight: 45, color: '#3C7534', rotate: 35},
      {text: 'MEDIO AMBIENTE', weight: 100, color: '#187809', rotate: 20},
      {text: '3R', weight: 40, color: '#06C234', rotate: 10},
      {text: 'CREA COSAS', weight: 40, color: '#008000', rotate: 12},
      {text: 'AYUDA A LA NATURALEZA', weight: 40, color: '#008000', rotate: 100},
      {text: 'Salud', weight: 40, color: '#008000', rotate: 120},
      {text: 'Desechos', weight: 50, color: '#3C7534', rotate: 35},
      {text: '+IDEAS', weight: 40, color: '#008000', rotate: 12},
      {text: '+VIDA', weight: 30, color: '#3C7534', rotate: 35},
      {text: '+Flora', weight: 40, color: '#008000', rotate: 120},
      {text: '+Fauna', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip'},
      // ...
    ];

    constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private json: JsonService) {

        this.form = fb.group({
                    parametro4: ['', [Validators.required]],
                    parametro3: ['', [Validators.required]],
                    parametro1: [''],
                    parametro2: ['']
            });
    }

    mapa: Mapboxgl.Map;
    palabra:JsonService[]=[]
    key:JsonService[]=[]
    value:JsonService[]=[]
    ngOnInit() {
      this.json.getJson('/json/?data=2').subscribe((res:any)=>
      {
        this.palabra[0]= res.palabra1;
        this.palabra[1]= res.palabra2;
        this.palabra[2]= res.palabra3;
        this.palabra[3]= res.palabra4;
        this.palabra[4]= res.palabra5;
        this.palabra[5]= res.palabra6;
         console.log(this.palabra);
        // var o = JSON.parse(res);
        // console.log(o);
        // var p1 = this.palabra;
        // console.log(p1);
        return this.palabra;
      });
      this.json.getJson('/json/?data=1').subscribe((res:any)=>
      {
        this.key[0]= res.key1;
        this.key[1]= res.key2;
        this.key[2]= res.key3;
         console.log(this.key);
        // var o = JSON.parse(res);
        // console.log(o);
        // var p1 = this.palabra;
        // console.log(p1);
        return this.key;
      });
      this.json.getJson('/json/?data=3').subscribe((res:any)=>
      {
        this.value[0]= res.value1;
        this.value[1]= res.value2;
        this.value[2]= res.value3;
        this.value[3]= res.value4;
        this.value[4]= res.value5;
        this.value[5]= res.value6;
        this.value[6]= res.value7;
        this.value[7]= res.value8;
        this.value[8]= res.value9;
        this.value[9]= res.value10;
        this.value[10]= res.value11;
        this.value[11]= res.value12;
         console.log(this.value);
        // var o = JSON.parse(res);
        // console.log(o);
        // var p1 = this.palabra;
        // console.log(p1);
        return this.value;
      });
        this.json.getJson('/json/?data=1').subscribe((res:any)=>{console.log(res)});
        this.title = "Data analisis"
        Mapboxgl.accessToken = environment.mapboxKey;
        this.mapa = new Mapboxgl.Map({
        container: 'mapa-map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 10,
        center: [-70.9100243,-33.4718999]
        });
         
        this.mapa.on('load', function () {
        /* Sample feature from the `examples.8fgz4egr` tileset:
        {
        "type": "Feature",
        "properties": {
        "ethnicity": "White"
        },
        "geometry": {
        "type": "Point",
        "coordinates": [ -122.447303, 37.753574 ]
        }
        }
        */
        this.mapa.addSource('ethnicity', {
        type: 'vector',
        url: 'mapbox://examples.8fgz4egr'
        });
        this.mapa.addLayer({
        'id': 'population',
        'type': 'circle',
        'source': 'ethnicity',
        'source-layer': 'sf2010',
        'paint': {
        // make circles larger as the user zooms from z12 to z22
        'circle-radius': {
        'base': 1.75,
        'stops': [
        [12, 2],
        [22, 180]
        ]
        },
        // color circles by ethnicity, using a match expression
        // https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
        'circle-color': [
        'match',
        ['get', 'ethnicity'],
        'White',
        '#fbb03b',
        'Black',
        '#223b53',
        'Hispanic',
        '#e55e5e',
        'Asian',
        '#3bb2d0',
        /* other */ '#ccc'
        ]
        }
        });
        });
        }

    // save() {
    //     console.log("Alguien hizo click", this.form.value);
    //         this.apiService.llamarModeloLineal(1000).pipe(
    //             catchError(() => of([]))
    //         )
    //         .subscribe(title => this.title);

    //     }

        
    save2(event: Event) {

		console.log("Alguien hizo click", this.form.value);
		const fecinicio=this.form.value.parametro1;
    const fectermino=this.form.value.parametro2;
    const region=this.form.value.parametro3;
    const palabra=this.form.value.parametro4;
		console.log(fecinicio);
    console.log(fectermino);
    console.log(region);
    console.log(palabra);
            this.apiService.llamarModeloLineal(fecinicio,fectermino,region,palabra).pipe(
                catchError(() => of([]))
            )
            .subscribe(value => this.form.value);
        event.preventDefault();
        const value = this.form.value;
        console.log(value);
        }
}
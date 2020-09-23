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

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [ApiService]
})
export class AppComponent implements OnInit{
    title: string;
    form: FormGroup;

    constructor(
    private fb: FormBuilder,
    private apiService: ApiService) {

        this.form = fb.group({
                    parametro1: ['', [Validators.required]],
                    parametro2: ['', [Validators.required]],
                    parametro3: ['', [Validators.required]]
            });
    }

    mapa: Mapboxgl.Map;
    ngOnInit() {
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


    private buildForm2() {
    this.form = new FormGroup({
      parametro1    : new FormControl('', [Validators.required]),
      parametro2 : new FormControl('', [Validators.required]),
      parametro3 : new FormControl('', [Validators.required])
    });




  }
    save2(event: Event) {

		console.log("Alguien hizo click", this.form.value);
		const fecinicio=this.form.value.parametro1;
    const fectermino=this.form.value.parametro2;
    const region=this.form.value.parametro3;
		console.log(fecinicio);
    console.log(fectermino);
    console.log(region);
            this.apiService.llamarModeloLineal(fecinicio,fectermino,region).pipe(
                catchError(() => of([]))
            )
            .subscribe(value => this.form.value);
        event.preventDefault();
        const value = this.form.value;
        console.log(value);
        }
}
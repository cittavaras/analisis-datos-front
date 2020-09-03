import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import {FormBuilder, Validators, FormGroup, FormControl} from "@angular/forms";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";
import { debounceTime } from 'rxjs/operators';
import {ApiService} from "./api.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
    title: string;
    form: FormGroup;

    constructor(
    private fb: FormBuilder,
    private apiService: ApiService) {

        this.form = fb.group({
                    parametro1: ['', [Validators.required]],
                    parametro2: ['', [Validators.required]]
            });
    }

    ngOnInit() {
        this.title = "Data analisis"
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
      parametro2 : new FormControl('', [Validators.required])
    });




  }
    save2(event: Event) {

		console.log("Alguien hizo click", this.form.value);
		const fecinicio=this.form.value.parametro1;
		const fectermino=this.form.value.parametro2;
		console.log(fecinicio);
		console.log(fectermino);
            this.apiService.llamarModeloLineal(fecinicio,fectermino).pipe(
                catchError(() => of([]))
            )
            .subscribe(value => this.form.value);
        event.preventDefault();
        const value = this.form.value;
        console.log(value);
        }
		
		
		
		
		
}
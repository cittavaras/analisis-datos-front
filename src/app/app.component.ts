import { Component, OnInit } from '@angular/core';
import { MatInput } from "@angular/material/input";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {Observable, BehaviorSubject, of} from "rxjs";
import {catchError, finalize} from "rxjs/operators";

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
            		parametro1: [null,]
        	});
	}

	ngOnInit() {
	    this.title = "Formulario!!!"
        }
        
	save() {
		console.log("Alguien hzo click", this.form.value);
	        this.apiService.llamarModeloLineal(1000).pipe(
                catchError(() => of([]))
            )
            .subscribe(title => this.title);
        }
}

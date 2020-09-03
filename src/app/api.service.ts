import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

import { AppComponent } from './app.component';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor( private http:HttpClient ) { }

    llamarModeloLineal(parametro1:Number, parametro2:number): Observable<any> {
	    return this.http.get('http://localhost:5000/api/llamada', {
            params: new HttpParams()
                .set('parametro1', String(parametro1))
                .set('parametro2', String(parametro2))
        }).pipe(
            map(res =>  res["payload"])
        );
    }
}

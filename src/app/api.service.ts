import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ApiService {

constructor( private http:HttpClient ) { }

    llamarModeloLineal(parametro1:number): Observable<any> {
	    return this.http.get('http://localhost:5000/api/llamada', {
            params: new HttpParams()
                .set('parametro', String(parametro1))
        }).pipe(
            map(res =>  res["payload"])
        );
    }
}

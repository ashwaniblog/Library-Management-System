import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LibrarymanagementService {

  urlacc = "https://localhost:7155/api/account"
  urlbook = "https://localhost:7155/api/book"

  collection : any = [];

  constructor(private http : HttpClient) { }

  RegisterUser(data:any , signup:any){
    console.log("my data is",data);
    return this.http.post(`${this.urlacc}/${signup}`,data)
  }

  loginUser(data : any , signin:any){
    return this.http.post(`${this.urlacc}/${signin}`,data)
  }

  logoutuser(){
    return this.http.get(`${this.urlacc}/signout`)
  }
  addCars(data : any , route : any ){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    console.log("my data is",data);
    console.log("my route is",route);
    return this.http.post(`${this.urlbook}/${route}`,data ,{headers})
  }
  fetchUserid(email: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.get(`https://localhost:7155/api/account/fetchId/${email}` , {headers})
  }

  fetchtokens(email: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.get(`https://localhost:7155/api/account/fetchtokens/${email}` , {headers})
  }

  isavailable(data: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.post(`https://localhost:7155/api/book/isavailable/`,data, {headers})
  }

  getallbooks(route: any) {
    return this.http.get(`${this.urlbook}/${route}`)
  }

  getsinglebooks(id: any) {
    return  this.http.get(`https://localhost:7155/api/book/getsingleproduct/${id}`)
  }

  borrow(data : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlacc}/borrow`,data , {headers})
  }

  bookborrowupdate(data : any ) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ localStorage.getItem('token').toString()
    });
    console.log("update data", data);
    return this.http.put(`${this.urlbook}/bookborrowupdate`,data , {headers})
  }

  getData(email : any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token').toString()
    });
    return this.http.get(`https://localhost:7155/api/account/fetchtokens/${email}` , {headers});
  }


}

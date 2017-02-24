import {Injectable} from '@angular/core';

import {Hero} from './hero';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class HeroService
{
    private heroesUrl = 'http://localhost:4567/api/heroes'; //URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl).toPromise().then(
            response => response.json() as Hero[]);
    } 

    getHero(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url).toPromise().then(
                response => response.json() as Hero).catch(this.handleError);
        
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }

    update(hero: Hero): Promise<void>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise().then(() => null).catch(this.handleError);
    }

    create(name: string, secretIdentity: string, bio: string): Promise<Hero>{
        return this.http.post(this.heroesUrl, JSON.stringify({name: name, secretIdentity: secretIdentity, bio: bio}))
        .toPromise().then(response => response.json() as Hero).catch(this.handleError);
    }

    delete(id: Number): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
        .toPromise().then(() => null).catch(this.handleError);
    }

    uploadHeroImage(image: FormData)
    {
        const url = `${this.heroesUrl}/upload`;
        this.http.post(url, image).toPromise().then(() => null).catch(this.handleError);
    }
}
import {Injectable} from '@angular/core';

import {Hero} from './hero';
import {Sidekick} from './sidekick';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';


@Injectable()
export class HeroService
{
    private heroesUrl = 'http://localhost:4567/api/heroes'; //URL to web api
    private sidekickUrl = 'http://localhost:4567/api/sidekick';
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

    create(hero: Hero, sidekicks: Sidekick[]): Promise<void> {
        return this.http.post(this.heroesUrl, JSON.stringify(hero)).toPromise().then(() => this.createSidekick(sidekicks)).catch(this.handleError);
    }

    createSidekick(sidekicks: Sidekick[]): Promise<void> {
        return this.http.post(this.sidekickUrl, JSON.stringify(sidekicks)).toPromise().then(() => null).catch(this.handleError);
    }

    update(hero: Hero): Promise<void>{
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http.put(url, JSON.stringify(hero), {headers: this.headers})
        .toPromise().then(() => null).catch(this.handleError);
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

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    }
}
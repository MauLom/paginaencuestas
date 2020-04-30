import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import { NavigationService } from './compose/navigation-compose';
import { DataService } from './compose/data-compose';

@Injectable()
export class AppService {    
    navigationService: NavigationService = new NavigationService();
    data: DataService;

    constructor(private dataService: DataService) {
        this.data = dataService;
    }
}
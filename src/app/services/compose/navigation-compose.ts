import { Subject } from 'rxjs';

export class NavigationService {
    private commonSource = new Subject();
    common$ = this.commonSource.asObservable();
    
    navigate(path: string) {
        try {
            //console.log('NavigationService.navigate', path);
            this.commonSource.next(path);
        } catch(error) {
            console.error('NavigationService.navigate', error);
        }        
    }
}
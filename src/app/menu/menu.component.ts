import { ChangeDetectorRef, Component, Output, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';

import { UtilsService } from '../shared/services/utils.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css'],
})


export class MenuComponent implements OnInit, OnDestroy {
    @ViewChild('sidenav') public sidenav: MatSidenav;
    // options: FormGroup;
    mobileQuery: MediaQueryList;

    constructor(private _utilsService: UtilsService,
        media: MediaMatcher, changeDetectorRef: ChangeDetectorRef,
        private _router: Router) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }
    private _mobileQueryListener: () => void;

    public ngOnInit(): void {
        this._utilsService.setSidenav(this.sidenav);
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    public toggleSidenav = () => {
        this.sidenav.close();
    }

    public redirect = (route: string): void => {
        this._router.navigate(['/main', {
            outlets: {
                'main': [route]
            }
        }]);
        this._utilsService.closeSidenav();
    }
}

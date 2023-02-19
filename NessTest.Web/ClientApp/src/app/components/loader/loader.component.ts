import { Component, Input, OnInit, OnDestroy  } from '@angular/core';

import { Subscription } from 'rxjs';
import { LoaderService, LoaderState } from 'src/app/services/shared/loader/loader.service';


@Component({
  
  selector: 'loader',
  templateUrl: 'loader.component.html',
  styleUrls: ['./loader.component.scss']
})

export class LoaderComponent implements OnInit, OnDestroy{

  @Input() loaderText: string ="טוען נתונים...";
  @Input() showManual!: boolean;
  show: boolean = false;
  private subscription!: Subscription;

  constructor(private loaderService: LoaderService) { 

    this.subscription = this.loaderService.loaderState
      .subscribe((state: LoaderState) => {
        this.show = state.show;
      });
  }

  ngOnInit() {
   
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

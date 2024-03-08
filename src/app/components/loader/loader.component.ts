import { CommonModule, DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { NgxUiLoaderModule, NgxUiLoaderService, SPINNER } from 'ngx-ui-loader';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'loader',
    template: ` 
      <ngx-ui-loader 
        [fgsType]="option"
        [bgsType]="option"
        bgsColor="#71798a"
        [bgsOpacity]="0.5"
        bgsPosition="bottom-right"
        [bgsSize]="60"
        blur="5"
        delay="0"
        fastFadeOut="true"
        fgsColor="#71798a"
        fgsPosition="center-center"
        [fgsSize]="60"
        [gap]="24"
        logoPosition="center-center"
        [logoSize]="120"
        logoUrl="assets/icons/logo_imagem_dark_mode.png"
        masterLoaderId="master"
        overlayBorderRadius="0"
        overlayColor="rgba(40 40 40 0.8)"
        pbColor="#71798a"
        pbDirection="ltr"
        [pbThickness]="3"
        [hasProgressBar]="true"
        textColor="#FFFFFF"
        textPosition="center-center"
      >
      </ngx-ui-loader>
    `,
    styleUrl: './loader.component.css',
})
export class LoaderComponent implements OnInit {

  private isLoading!: boolean;
  option = SPINNER.threeBounce;

  constructor(private loaderService: LoaderService, private ngxLoader: NgxUiLoaderService, @Inject(DOCUMENT) private document: Document) {
      
  }

    ngOnInit(): void {
        this.loaderService.isLoading.subscribe(x  => {
            this.isLoading = x.state;

            if (this.isLoading) {
                this.document.body.classList.add("cursor-wait");
            } else {
                this.document.body.classList.remove("cursor-wait");
            }

            if (x.isBack) {
                x.state ? this.ngxLoader.startBackground(x.taskId) : this.ngxLoader.stopBackground(x.taskId);
            } else {
                x.state ? this.ngxLoader.start(x.taskId) : this.ngxLoader.stop(x.taskId);
            }
            });       
    }

}

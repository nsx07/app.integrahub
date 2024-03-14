import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PlatformUtils } from '../../utils/platform';
import { Theme } from '../../utils/settings';

@Component({
  selector: 'app-sidebar',
  template: `
    <!-- Navigation Toggle -->
    <div class="flex justify-between items-center p-2 sm:hidden">
      <div>
        <img src="assets/icons/logo_imagem_dark_mode.png" class="w-10 z-10 rounded shadow-lg" alt="Icone AgendaHub"/>
      </div>
      <button type="button" class="p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-transparent dark:border-gray-700 dark:text-white dark:hover:bg-white/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#sidebar" aria-controls="sidebar" aria-label="Toggle navigation">
        <span class="sr-only">Toggle Navigation</span>
        <svg class="flex-shrink-0 size-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
        </svg>
      </button>
    </div>
    <!-- End Navigation Toggle -->

    <div id='wrapper' (mouseenter)="hover(true)" (mouseleave)="hover(false)">
      <div id="sidebar" *ngIf="miniSideBar"  class="hs-overlay rounded-r-md hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden absolute top-0 start-0 bottom-0 z-[60] w-20 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex flex-col justify-center items-center gap-y-2 py-4">
          <ng-container *ngTemplateOutlet="logo"></ng-container>
          <div class="hs-tooltip inline-block [--placement:right]">
            <a class="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700" role="tooltip">
                Home
              </span>
            </a>
          </div>
          <div class="hs-tooltip inline-block [--placement:right]">
            <a class="hs-tooltip-toggle w-[2.375rem] h-[2.375rem] inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
              <svg class="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 inline-block absolute invisible z-20 py-1.5 px-2.5 bg-gray-900 text-xs text-white rounded-lg whitespace-nowrap dark:bg-neutral-700" role="tooltip">
                Home
              </span>
            </a>
          </div>
        </div>
      </div>

      <div id="sidebar" *ngIf="sideBar"  class="hs-overlay rounded-r-md hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] sm:w-64 w-full bg-white border-e border-gray-200 pt-4 pb-10 overflow-y-auto overflow-x-hidden lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-gray-800 dark:border-gray-700">
        <ng-container *ngTemplateOutlet="logo"></ng-container>

        <nav class="hs-accordion-group p-6 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>
          <ul class="space-y-1.5">
            <li>
              <a [routerLink]="['/']" class="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
                <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" ><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                Home
              </a>
            </li>
            <li><a [routerLink]="['/panel/company']" class="flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" href="#">
              <svg class="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              Calendar
            </a></li>
          </ul>
        </nav>
      </div>
    </div>

    <div class="absolute sm:block hidden z-[61] top-7" [ngClass]="{'left-[4.3rem]': miniSideBar, 'left-[15.3rem]': sideBar}" (mouseenter)="sideBar && hover(true)" (mouseleave)="hover(false)">
      <div class="w-5 h-5 rounded-full flex items-center justify-center border-[1px] cursor-pointer
                 bg-clean text-gray-300 border-gray-300 
                 dark:bg-gray-800 dark:border-gray-700 
                 hover:dark:bg-white hover:dark:text-gray-800" (click)="freeze($event)">
        @if(states.fixed) {
          <i class="fa-solid fa-chevron-left fa-2xs"></i>
        } @else {
          <i class="fa-solid fa-chevron-right fa-2xs"></i>
        }
      </div>
    </div>

    <ng-template #logo>
      <div [ngClass]="{'mb-4': miniSideBar, 'px-3': sideBar}">
        <a class="flex justify-center items-center" href="/">
          <img [src]="logoPath" class="z-10 rounded" alt="Icone AgendaHub" [ngClass]="{'w-12': miniSideBar, 'w-1/2': sideBar && mobile()}"/>
        </a>
      </div>
    </ng-template>
  `,
  styles: ``
})
export class SidebarComponent implements OnInit, OnChanges {
  
  logoPath: string = 'assets/icons/logo_imagem_dark_mode.png';
  states = {
    mini: true,
    sidebar: false,
    fixed: false
  }
  
  get miniSideBar() {
    return this.states.mini;
  }

  set miniSideBar(value: boolean) {
    this.states.mini = value;
  }

  get sideBar() {
    return this.states.sidebar;
  }

  set sideBar(value: boolean) {
    this.states.sidebar = value;
  }

  ngOnInit(): void {
    this.refresh();

    if (PlatformUtils.mobile) {
      this.sideBar = true;
      this.miniSideBar = false;
      this.refresh();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  mobile() {
    return PlatformUtils.mobile;
  }

  refresh(): void {
    if (this.states.fixed) {
      this.sideBar = true;
      this.miniSideBar = false;
    }

    this.getLogo();
  }

  hover(entry: boolean) {
    this.miniSideBar = !entry;
    this.sideBar = entry;

    this.refresh();
  }
  
  getLogo() {
    this.logoPath = this.miniSideBar ? 'assets/icons/logo_imagem_dark_mode.png' : 'assets/icons/logo_texto_imagem.png';
    this.logoPath = Theme.getTheme().dark ? this.logoPath : this.logoPath.replace('dark_mode', '');
  }
  
  freeze($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();

    this.states.fixed = !this.states.fixed;
    this.sideBar = this.states.fixed;
    this.miniSideBar = !this.states.fixed;
    this.refresh();
  }

}

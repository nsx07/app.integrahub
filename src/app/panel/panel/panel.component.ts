import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-panel',
    template: `
    <div class="p-2">
        <a [routerLink]="['/panel/company']" routerLinkActive="router-link-active"  class="text-center p-3 rounded-md bg-secondary">
        <strong>Company</strong>
        </a>
    </div>
    `,
    styleUrl: './panel.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent { }

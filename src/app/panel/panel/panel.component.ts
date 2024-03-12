import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-panel',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>panel works!</p>`,
    styleUrl: './panel.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PanelComponent { }

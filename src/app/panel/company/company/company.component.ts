import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-company',
    standalone: true,
    imports: [
        CommonModule,
    ],
    template: `<p>company works!</p>`,
    styleUrl: './company.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyComponent { }

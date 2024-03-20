import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { GraphqlService } from '../../../services/graphql.service';
import { ApiService } from '../../../services/api.service';

@Component({
    selector: 'app-company',
    template: `
        <div class="container p-4">
            <div class="flex flex-col">
                <div class="-m-1.5 overflow-x-auto">
                    <div class="flex p-2 gap-5 items-center">
                        <span class="leading-3 tracking-wider text-gray-500">EMPRESAS</span>
                        <a [routerLink]="['/panel/company/new']" class="text-indigo-600 hover:text-indigo-900">
                            <i class="fa-solid fa-plus"></i>
                        </a>
                    </div>                
                    <div class="p-1.5 min-w-full inline-block align-middle">
                        <div class="overflow-hidden">
                            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Domain</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Phone</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Criação</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Ativo</th>
                                        <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                                    @for (item of companies; track $index) {
                                        <tr>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{item.fullName}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">{{item.domainName}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{item.email}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{item.phone}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{formatAddress(item)}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{item.createdAt | date:"dd/MM/yy"}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">{{item.isActive ? "Sim" : "Não"}}</td>
                                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200 flex justify-center gap-4">
                                                <a [routerLink]="['/panel/company/' + item.id]" class="text-indigo-600 hover:text-indigo-900">
                                                    <i class="fa-solid fa-pencil"></i>
                                                </a>
                                                <span (click)="remove(item)" class="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                                    <i class="fa-solid fa-trash"></i>
                                                </span>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styleUrl: './company.component.scss',
})
export class CompanyComponent implements OnInit {
    
    companies: any[] = []

    constructor(private graphQL: GraphqlService, private api: ApiService) {
        
    }

    formatAddress(item: any) {
        return `${item.address ?? ''}, ${item.number ?? ''} - ${item.zipCode ?? ''} ${item.city ?? ''} ${item.state ?? ''}`
    }
    
    ngOnInit(): void {
        this.graphQL.get(`{
            companies {
                items {
                    id
                    fullName
                    domainName
                    email
                    phone
                    address
                    city
                    state
                    isActive
                    createdAt
                    zipCode
                    number
                }
            }
        }`).subscribe((result: any) => {
            this.companies = result.data.companies.items;
            console.log(result);
            
        })
    }

    remove(item: any) {
        console.log(item);

        const {id} = item;

        this.api.deleteFromApi(`company/${id}`).subscribe({
            next: (result: any) => {
                console.log(result);
            }});
                

    }
}

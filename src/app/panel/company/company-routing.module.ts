import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company/company.component';
import { CompanyFormComponent } from './company-form/company-form.component';

const routes: Routes = [
  {path: ":id", component: CompanyFormComponent},
  {path: "", component: CompanyComponent},
  {path: "**", redirectTo: ""}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }

import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormCreateComponent } from "./form/form-create/form-create.component";
import { FormComponent } from "./form/form.component";
import { LMSDisplayTypeComponent } from "./lmsdisplay-type/lmsdisplay-type.component";
import { LMSFormTypeComponent } from "./lmsform-type/lmsform-type.component";

const routes = [
    {path: 'createform', component: FormCreateComponent },
    {path: 'lmsformtype', component: LMSFormTypeComponent},
    {path: 'lmsdisplaytype', component: LMSDisplayTypeComponent},
    {path: 'form', component: FormComponent},

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LMSFormRoutingModule { }
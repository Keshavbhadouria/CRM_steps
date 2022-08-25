import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollaboratorListComponent } from './collaborators/collabolator-new/collaborator-list/collaborator-list.component';
import { CollaboratorNewUIComponent } from './collaborators/collabolator-new/collaborator-new-ui/collaborator-new-ui.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';
import { CollaboratorskillsComponent } from './collaboratorskills/collaboratorskills.component';
import { ProjectRolesComponent } from './project-roles/project-roles.component';

const routes: Routes = [

  {
    path: 'roles',
    component: ProjectRolesComponent
  },
  {
    path: 'collaborators',
    component: CollaboratorListComponent
  },
  {
    path: 'collaboratorskills',
    component: CollaboratorskillsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HrRoutingModule { }

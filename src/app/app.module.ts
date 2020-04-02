import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ServerApiService } from './services/server-api.service';
import { AlertService } from './services/alert.service';
import { AlertComponent } from './components/alert/alert.component';
import { ChoreTemplateComponent } from './components/chore-template/chore-template.component';
import { ChoreTemplatesComponent } from './components/chore-templates/chore-templates.component';
import { ChoreTemplateCreateComponent } from './components/chore-template-create/chore-template-create.component';
import { ChoreTemplateAssignComponent } from './components/chore-template-assign/chore-template-assign.component';
import { ChoreTemplateCreatorPipe } from './pipes/chore-template-creator.pipe';
import { GroupComponent } from './components/group/group.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupCreateComponent } from './components/group-create/group-create.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { GroupEditComponent } from './components/group-edit/group-edit.component';
import { GroupAssignComponent } from './components/group-assign/group-assign.component';
import { ChoreItemComponent } from './components/chore-item/chore-item.component';
import { ChoreListComponent } from './components/chore-list/chore-list.component';

//locales
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeHe from '@angular/common/locales/he';
import { ChoreHistoryListComponent } from './components/chore-history-list/chore-history-list.component';
import { ChoreHistoryItemComponent } from './components/chore-history-item/chore-history-item.component';
import { ChoreListFilterPipe } from './pipes/chore-list-filter.pipe';
import { Regstep01Component } from './components/regstep01/regstep01.component';
import { RegisterFlowComponent } from './components/register-flow/register-flow.component';
registerLocaleData(localeHe, 'he');

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AlertComponent,
    ChoreTemplateComponent,
    ChoreTemplatesComponent,
    ChoreTemplateCreateComponent,
    ChoreTemplateAssignComponent,
    ChoreTemplateCreatorPipe,
    GroupComponent,
    GroupsComponent,
    GroupCreateComponent,
    GroupEditComponent,
    GroupAssignComponent,
    ChoreItemComponent,
    ChoreListComponent,
    ChoreHistoryListComponent,
    ChoreHistoryItemComponent,
    ChoreListFilterPipe,
    Regstep01Component,
    RegisterFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    ServerApiService,
    AlertService,
    { provide: LOCALE_ID, useValue: "he" },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { TimetableEntryComponent } from './../components/timetable-entry/timetable-entry.component';
import { ComponentsModule } from './../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuestionnairePageRoutingModule } from './questionnaire-routing.module';

import { QuestionnairePage } from './questionnaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuestionnairePageRoutingModule,
    ComponentsModule
  ],
  declarations: [QuestionnairePage],
  entryComponents: [TimetableEntryComponent]
})
export class QuestionnairePageModule {}

import { FormsModule } from '@angular/forms';
import { TimetableEntryComponent } from './timetable-entry/timetable-entry.component';
import { RouterModule } from '@angular/router';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IonicModule.forRoot(),
    FormsModule
  ],
  declarations: [
    TimetableEntryComponent
  ],
  exports: [
    TimetableEntryComponent
  ],
  entryComponents: []
})
export class ComponentsModule {}

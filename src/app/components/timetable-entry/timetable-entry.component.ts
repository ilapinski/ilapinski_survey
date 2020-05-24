import { Entry } from './timetable-entry-class';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController, IonDatetime, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-timetable-entry',
  templateUrl: './timetable-entry.component.html',
  styleUrls: ['./timetable-entry.component.scss'],
})
export class TimetableEntryComponent implements OnInit {
  @ViewChild('starting', { static: true }) private startingElement: IonDatetime;
  @ViewChild('ending', { static: true }) private endingElement: IonDatetime;

  entryIcon;
  entryTitle;
  endHourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  endHoursSelectedBool = false;

  constructor(private modalCtrl: ModalController, private navParams: NavParams) {
    this.entryTitle = this.navParams.data.name;
    this.entryIcon = this.navParams.data.icon;
  }

  ngOnInit() {}

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

  async addNew() {
    await this.modalCtrl.dismiss(new Entry(this.entryTitle, this.startingElement.value, this.endingElement.value, this.entryIcon));
  }

  changeEndHourValues() {
    // this.endHourValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    // this.endHourValues = this.endHourValues.filter(hour => hour + 1 > Number(this.startingElement.value.split(':')[0]));
    // if (Number(this.endingElement.value.split(':')[0]) < Number(this.startingElement.value.split(':')[0])) {
    // this.endingElement.value = this.startingElement.value;
    // console.log(this.endHourValues)
    // tslint:disable-next-line: max-line-length
    // }
    console.log({0: this.endingElement});
  }

  endHoursSelected() {
    this.endHoursSelectedBool = true;
  }
}

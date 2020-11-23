import { Entry } from './../components/timetable-entry/timetable-entry-class';
import { TimetableEntryComponent } from './../components/timetable-entry/timetable-entry.component';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ModalController } from '@ionic/angular';

// tslint:disable: max-line-length
// tslint:disable: prefer-for-of

@Component({
  selector: 'app-questionnaire',
  templateUrl: './questionnaire.page.html',
  styleUrls: ['./questionnaire.page.scss']
})
export class QuestionnairePage implements OnInit {
  respondent: RespondentInterface = {
    type: null,
    district: null
  };
  currentSlide: currentSlide = 1;
  questionCounter = 1;
  currentAnswer: any = null;
  currentAnswerArray = [];
  respondentToken: string;

  questionStack = [];

  answeredQuestions = [];

  alreadyFilledOut;
  areResultsSended = false;

  dailyOrganisationArray = [];
  dailyOrganisationOptions = [
  {title: 'Preparation for the day', icon: 'cafe-outline'},
  {title: 'Break', icon: 'pause-circle-outline'},
  {title: 'Organisation', icon: 'list-outline'},
  {title: 'Checking mails', icon: 'mail-outline'},
  {title: 'Writing mails', icon: 'send-outline'},
  {title: 'Focused working', icon: 'glasses-outline'},
  {title: 'Communication with co-workers', icon: 'chatbubbles-outline'},
  {title: 'Communication with supervisors', icon: 'chatbubble-outline'},
  {title: 'Feierabend', icon: 'beer-outline'},
  {title: 'Other (specify)', icon: 'rocket-outline'}];

  constructor(private http: HttpClient, private modalController: ModalController) {}

  ngOnInit() {
    this.getToken();
    this.getQuestionStack();
  }

  // SEND ANSWERS

  sendAnswersPOST() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );

    const postData = {
            sessiontoken: this.respondentToken,
            respondentData: this.answeredQuestions
    };

    this.http.post('https://ilapinski.com/api/checkout.php?s=' + this.randomString(), postData)
      .subscribe(data => {
        this.areResultsSended = true;
       }, error => {
        console.error(error);
      });
  }

  getToken() {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );

    const postData = {
            setter: this.makeid(5),
            check: this.makeid(10),
            id: this.randomString(),
    };

    this.http.post('https://ilapinski.com/api/setup.php?s=' + this.randomString(), postData)
      .subscribe(data => {
        if ((data as any).setup === 'emptyToken') {
          this.alreadyFilledOut = true;
        } else {
          this.alreadyFilledOut = false;
          this.respondentToken = (data as any).setup;
        }
       }, error => {
        console.error(error);
      });
  }

  /* LOAD QUESTIONS */

  async getQuestionJSON(status): Promise<any> {
    return this.http
    .get('/assets/questions.json?session=' + this.randomString())
    .toPromise();
  }

  async getQuestionStack() {
    this.questionStack = [];
    const questionStackJSON: [] = await this.getQuestionJSON(this.respondent.type);
    for (let i = 0; i < questionStackJSON.length; i++) {
      this.questionStack.push(questionStackJSON[i]);
    }
  }

  goToNextSlide() {
    // if (this.currentSlide >= 16) {
    //   throw new Error('Cannot go to next slide.');
    // }

    // if (this.currentSlide !== 1) { // if not the first question
    const curentQuestion = this.questionStack[this.currentSlide - 1];

    // save answer
    if (this.currentAnswer != null && this.currentAnswerArray != [] && this.questionStack[this.currentSlide - 1].optionalTextfield) { // array with optional textfield
      this.multipleChoice_TransformBoolToValue();
      this.currentAnswerArray.push(this.currentAnswer);
      this.currentAnswer = null;
      const answer: AnsweredQuestion = {questionId: curentQuestion.questionId, answer: {data: this.currentAnswerArray}};
      this.answeredQuestions.push(answer);
    } else if (this.currentAnswer === null) { // only array
      this.multipleChoice_TransformBoolToValue();
      const answer: AnsweredQuestion = {questionId: curentQuestion.questionId, answer: {data: this.currentAnswerArray}};
      this.answeredQuestions.push(answer);
    } else { // without array
      const answer: AnsweredQuestion = {questionId: curentQuestion.questionId, answer: {data: this.currentAnswer}};
      this.answeredQuestions.push(answer);
    }

    if (this.questionStack[this.currentSlide - 1].skipAmountIfFalse && this.currentAnswer === 'no') { // skin answers
      this.currentSlide += 1 + this.questionStack[this.currentSlide - 1].skipAmountIfFalse;
    } else { // no answers to skip
      this.currentSlide += 1;
    }
    // } else { // first question - skipping not possible
    //   this.currentSlide += 1;
    // }

    this.questionCounter += 1;
    this.currentAnswerArray = [];
    this.currentAnswer = null;

    // end questionnaire
    if (this.currentSlide > this.questionStack.length && this.currentSlide !== 2) {
      const answer: AnsweredQuestion = {questionId: 18, answer: {data: this.dailyOrganisationArray}};
      this.answeredQuestions.push(answer);
      this.sendAnswersPOST();
    }
  }

  getProgress() {
    return Math.floor((this.currentSlide - 1) / this.questionStack.length * 100);
  }

  /* OTHER */

  private multipleChoice_TransformBoolToValue() {
    const curentQuestion = this.questionStack[this.currentSlide - 1];
    if (curentQuestion.questionType === 'MULTIPLECHOICE') {
      // transform boolean to values
      const valuesArray = [];
      for (let i = 0; i < this.currentAnswerArray.length; i++) {
        if (this.currentAnswerArray[i] === true) {
          valuesArray.push(curentQuestion.questionAnswers[i]);
        }
      }
      if (valuesArray.length === 0) {
          valuesArray.push("Keine");
        }
      this.currentAnswerArray = valuesArray;
    }
  }

  makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

  private randomString() {
    return Math.random()
      .toString(36)
      .substr(2, 12);
  }

  async DEMOgetData() {}

  async presentTimetableEntry(name, icon) {
    const modal = await this.modalController.create({
      component: TimetableEntryComponent,
      componentProps: {
        name,
        icon
      },
      mode: 'ios',
      swipeToClose: true
    });

    modal.onDidDismiss().then((dataReturned) => {
      const entry = (dataReturned.data as Entry);
      if (dataReturned !== null) {
        if (Number(entry.startHour) <= Number(entry.endHour)){
          for (let index = 0; index < entry.getHours() + 1; index++) {
            const currentHour = Number(entry.startHour) + Number(index);
            this.dailyOrganisationArray.forEach( hour => {
              if (hour.id === currentHour) {
                hour.entries.push(entry);
              }
            });
          }
        } else {
          for (let index = 0; index < entry.getNegativeHours() + 1; index++) {
            let currentHour = Number(entry.startHour) + Number(index);
            if (currentHour > 23) {
              currentHour = currentHour - 24;
            }
            this.dailyOrganisationArray.forEach( hour => {
              if (hour.id === currentHour) {
                hour.entries.push(entry);
              }
            });
          }
        }
      }
      this.currentAnswer = "dailyOrganisation";
    });

    return await modal.present();
  }

  deleteTimetableEntry(entryName, entryHour) {
    this.dailyOrganisationArray.forEach(hour => {
      if (hour.id === entryHour) {
        for (let index = 0; index < hour.entries.length; index++) {
          if (hour.entries[index].name === entryName) {
            hour.entries.splice(index, 1);
            console.log(hour.entries);
          }
        }
      }
    });
  }
}

export interface RespondentInterface {
  type: respondentType;
  district: respondentDistrict;
}
export interface AnsweredQuestion {
  questionId: number;
  answer: {};
}
export type respondentType = 'student' | 'teacher' | null;
export type respondentDistrict =
  | 'BW'
  | 'BY'
  | 'BE'
  | 'BB'
  | 'HB'
  | 'HH'
  | 'HE'
  | 'MV'
  | 'NI'
  | 'NW'
  | 'RP'
  | 'SL'
  | 'SN'
  | 'ST'
  | 'SH'
  | 'TH'
  | null;
export type currentSlide =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 16
  | 17
  | 18;

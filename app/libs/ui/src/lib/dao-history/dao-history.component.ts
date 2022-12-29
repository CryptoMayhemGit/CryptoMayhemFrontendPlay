import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-dao-history',
  templateUrl: './dao-history.component.html',
  styleUrls: ['./dao-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoHistoryComponent {
  constructor() {}

  //DUMMY DATA TO BE REPLACED BY BE
  questions: any[] = [
    {
      "id": 1,
      "title": "Question 1"
    },
    {
      "id": 2,
      "title": "Question 2"
    },
    {
      "id": 3,
      "title": "Q3"
    }, 
    {
      "id": 4,
      "title": "Question 4"
    },
    {
      "id": 5,
      "title": "Question 5"
    },
    {
      "id": 6,
      "title": "Question 6"
    },
    {
      "id": 7,
      "title": "Q7"
    },
    {
      "id": 8,
      "title": "Question 8"
    },
    {
      "id": 9,
      "title": "Question 9"
    },
    {
      "id": 10,
      "title": "Q10"
    },
    {
      "id": 11,
      "title": "Question 11"
    },
    {
      "id": 12,
      "title": "Question 12"
    },
    {
      "id": 13,
      "title": "Q13"
    },
    {
      "id": 14,
      "title": "Question 14"
    },

  ];

  trackById(index:number, el:any): number {
    return el.id;
  }

  // Dummy implementation of infinite scroll
  onScroll() {
    const newQuestions = [
      {
        "id": Math.random(),
        "title": "Question 5"
      },
      {
        "id": Math.random(),
        "title": "Question 6"
      },
      {
        "id": Math.random(),
        "title": "Q7"
      }
    ]
    console.log('scrolled down!!');
    this.questions.push(...newQuestions);
  }
}

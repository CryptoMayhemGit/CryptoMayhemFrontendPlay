import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ui-dao-voting',
  templateUrl: './dao-voting.component.html',
  styleUrls: ['./dao-voting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DaoVotingComponent{
  votingTime = new Date(Date.UTC(2022, 11, 24, 15, 0, 0)).getTime();
  form!: FormGroup;
  
  constructor(private fb: FormBuilder){}

  ngOnInit() {
    this.form = this.fb.group({
      answer: ['']
    });
  }

  onSubmit() {
      console.log("this.voteForm.value: ", this.form.value)
  }  
}

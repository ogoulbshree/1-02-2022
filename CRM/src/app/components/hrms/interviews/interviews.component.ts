import { Component, Injector, OnInit, Inject, ViewChild,LOCALE_ID} from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from './board.model';
import { Column } from './column.model';
import { Router } from '@angular/router';
import { DBService } from 'src/app/services/dbservice.service';
import { MatDialog } from '@angular/material/dialog';
import { CandidatesinfoComponent } from '../candidatesinfo/candidatesinfo.component';
@Component({
  selector: 'app-interviews',
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss']
})
export class InterviewsComponent implements OnInit {
  candidatesArray = [];
  candidatesNewArray = [];
  candidatesReviewArray = [];
  candidatesHiringArray = [];
  candidatesRejectedArray = [];
  candidatesInterviewArray = [];
  candidatesOfferArray = [];
  candidatesRequestArray = [];
  selectedCandidate;
  constructor(private _router: Router, public dialog: MatDialog, private _dbService: DBService) { }

  board: Board = new Board('Test Board', [
    new Column('New', this.candidatesNewArray, 1),
    new Column('Review', this.candidatesReviewArray, 2),
    new Column('Hiring manager', this.candidatesHiringArray, 3),
    new Column('Request feedback', this.candidatesRequestArray, 4),
    new Column('Interview ', this.candidatesInterviewArray, 5),
    new Column('Offer accepted ', this.candidatesOfferArray, 6),
    new Column('Rejected ', this.candidatesRejectedArray, 7),


  ]);

  ngOnInit() {
    this._dbService.getAllCandidates().subscribe((candidates) => {
      if (candidates && candidates["data"].length > 0) {
        this.candidatesArray = candidates["data"];
        candidates["data"].forEach((candidate) => {
          if (candidate.candidate_status == "New")
            this.candidatesNewArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Review")
            this.candidatesReviewArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Hiring manager")
            this.candidatesHiringArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Request feedback")
            this.candidatesRequestArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Interview")
            this.candidatesInterviewArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Offer accepted")
            this.candidatesOfferArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
          if (candidate.candidate_status == "Rejected")
            this.candidatesRejectedArray.push({ name: candidate.candidate_name, id: candidate.candidate_id });
        })
      }

    })
  }
  showDetails(candidate) {
    let candidate_id = this.candidatesArray.find(x => x.candidate_name == candidate.toString()).candidate_id;
    const dialogRef = this.dialog.open(CandidatesinfoComponent);
    dialogRef.componentInstance.candidate_id = candidate_id;
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  dragReleased(event) {
    let name = event.source.element.nativeElement.outerText.replace(/ /g, '');
    if (this.candidatesArray.length > 0) {
      this.selectedCandidate = this.candidatesArray.find(x => x.candidate_name == name);
    }
  }
  drop(event: CdkDragDrop<string[]>, index) {
    if (index == 1) this.selectedCandidate.candidate_status = "New";
    if (index == 2) this.selectedCandidate.candidate_status = "Review";
    else if (index == 3) this.selectedCandidate.candidate_status = "Hiring manager";
    else if (index == 4) this.selectedCandidate.candidate_status = "Request feedback";
    else if (index == 5) this.selectedCandidate.candidate_status = "Interview";
    else if (index == 6) this.selectedCandidate.candidate_status = "Offer accepted";
    else if (index == 7) this.selectedCandidate.candidate_status = "Rejected";
    this._dbService.updateCandidate(this.selectedCandidate).subscribe(x => { console.log(x); })
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }


}
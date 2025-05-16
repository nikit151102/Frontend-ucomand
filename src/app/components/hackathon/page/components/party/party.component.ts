import { Component, OnInit } from '@angular/core';
import { PartyItemComponent } from './party-item/party-item.component';
import { CommonModule } from '@angular/common';
import { PartyService } from './party.service';
import { HackathonService } from '../../hackathon.service';

@Component({
  selector: 'app-party',
  standalone: true,
  imports: [CommonModule, PartyItemComponent],
  templateUrl: './party.component.html',
  styleUrl: './party.component.css'
})
export class PartyComponent implements OnInit{

  dataHackathon: any;
  
  constructor(private partyService:PartyService, private hackathonService:HackathonService){}

  ngOnInit(): void {
    this.hackathonService.currentProjectData$.subscribe((data: any)=>{
      this.dataHackathon = data;
    })
  }


}

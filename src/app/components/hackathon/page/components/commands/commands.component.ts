import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CommandsItemComponent } from './commands-item/commands-item.component';
import { CommandsService } from './commands.service';
import { HackathonService } from '../../hackathon.service';

@Component({
  selector: 'app-commandsHack',
  standalone: true,
  imports: [CommonModule, CommandsItemComponent],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.css'
})
export class CommandsHackComponent implements OnInit{

  dataHackathon: any;
  
  constructor(private commandsService:CommandsService, private hackathonService:HackathonService){}

  ngOnInit(): void {
    this.hackathonService.currentProjectData$.subscribe((data: any)=>{
      this.dataHackathon = data;
    })
  }


}

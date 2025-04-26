import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CommandsItemComponent } from './commands-item/commands-item.component';

@Component({
  selector: 'app-commandsHack',
  standalone: true,
  imports: [CommonModule, CommandsItemComponent],
  templateUrl: './commands.component.html',
  styleUrl: './commands.component.css'
})
export class CommandsHackComponent {

  data = [
    {
      name: 'команда',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда2',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда3',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда4',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда5',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда6',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда7',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда8',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда9',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда10',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда11',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    },
    {
      name: 'команда12',
      img: 'https://avatars.mds.yandex.net/i?id=f50af55a565357c56455f2fddb178d9b43935b26-5232815-images-thumbs&n=13'
    }
  ]
}

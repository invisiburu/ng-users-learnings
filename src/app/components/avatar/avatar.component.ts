import { UserEntry } from '@/services/users/users.types';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input() source: UserEntry;

  constructor() {}

  ngOnInit(): void {}

  get image() {
    return this.source.avatar;
  }

  get owner() {
    return this.source.name;
  }

  get abbreviation() {
    const words = this.source.name.split(' ');
    let res = this._getFirstChar(words[0]);
    if (words.length > 1) {
      res += this._getFirstChar(words[words.length - 1]);
    }
    return res;
  }

  private _getFirstChar(str: string) {
    return str.charAt(0).toUpperCase();
  }
}

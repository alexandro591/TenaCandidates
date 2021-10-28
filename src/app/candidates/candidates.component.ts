import { Component, OnInit } from '@angular/core';
import axios from 'axios';

const CANDIDATES = {
  guayusa: [
    {
      id: 1,
      name: 'Shirley Lizbeth Tapuy Dahua',
      picture: 'guayusa1',
    },
    {
      id: 2,
      name: 'Shaquira Marienela Tanguila Andi',
      picture: 'guayusa2',
    },
    {
      id: 3,
      name: 'Cinthya Micaela Fierro Shiguango',
      picture: 'guayusa3',
    },
  ],
  reina: [
    {
      id: 4,
      name: 'Carol Jasmin Bastidas Guevara',
      picture: 'reina1',
    },
    {
      id: 5,
      name: 'Jessica Isamar Arboleda Guerrero',
      picture: 'reina2',
    },
    {
      id: 6,
      name: 'Mabeline Elizabeth Bolaños Insuasti',
      picture: 'reina3',
    },
    {
      id: 7,
      name: 'Cinthia Merci Gomez Cerda',
      picture: 'reina4',
    },
  ],
};

function _window(): any {
  // return the global native browser window object
  return window;
}

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss'],
})
export class CandidatesComponent implements OnInit {
  candidates = CANDIDATES;
  databaseUrl = 'https://tenacandidates-default-rtdb.firebaseio.com';
  selected: any = {};
  constructor() {}

  selectCandidate(type: string, selected: any) {
    selected.type = type;
    this.selected = selected;
  }

  async vote() {
    const that = this;
    await _window().FB.login();
    await _window().FB.getLoginStatus(function (response: any) {
      axios.patch(`that.databaseUrl/${that.selected.type}.json`, {
        [response.authResponse.userID]: that.selected,
      });
    });
  }

  close() {
    this.selected = {};
  }

  ngOnInit(): void {}
}

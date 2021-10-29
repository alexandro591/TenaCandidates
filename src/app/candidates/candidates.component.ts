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
      name: 'Karol Jasmin Bastidas Guevara',
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
  databaseUrl = 'https://reinadetena-default-rtdb.firebaseio.com';
  selected: any = {};
  userID: any;
  prevVote: any = {};
  constructor() {}

  selectCandidate(type: string, selected: any) {
    selected.type = type;
    this.selected = selected;
  }

  async vote() {
    const that = this;
    try {
      if (!that.userID) {
        await _window().FB.login();
        const interval = _window().setInterval(async () => {
          await _window().FB.getLoginStatus(async function (response: any) {
            if (response.authResponse.userID) {
              that.userID = response.authResponse.userID;
              axios
                .get(`${that.databaseUrl}/reina/${that.userID}.json`)
                .then((res: any) => {
                  that.prevVote.reina = res.data;
                });
              axios
                .get(`${that.databaseUrl}/guayusa/${that.userID}.json`)
                .then((res: any) => {
                  that.prevVote.guayusa = res.data;
                });
              _window().clearInterval(interval);
            }
          });
        }, 1000);
      }
    } catch (err) {}
    try {
      if (that.userID && that.selected) {
        await axios.patch(`${that.databaseUrl}/${that.selected.type}.json`, {
          [that.userID]: { id: that.selected.id },
        });
        that.prevVote[that.selected.type] = { id: that.selected.id };
        that.selected = {};
        _window().alert('Gracias por ayudarnos con tu valiosa respuesta. 🙏️');
      }
    } catch (err) {}
  }

  close() {
    this.selected = {};
  }

  ngOnInit(): void {
    const that = this;
    _window().FB.getLoginStatus(async function (response: any) {
      if (response.authResponse.userID) {
        that.userID = response.authResponse.userID;
        axios
          .get(`${that.databaseUrl}/reina/${that.userID}.json`)
          .then((res: any) => {
            that.prevVote.reina = res.data;
          });
        axios
          .get(`${that.databaseUrl}/guayusa/${that.userID}.json`)
          .then((res: any) => {
            that.prevVote.guayusa = res.data;
          });
      }
    });
  }
}

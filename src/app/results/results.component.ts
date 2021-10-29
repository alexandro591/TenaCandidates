import { Component, OnInit } from '@angular/core';
import axios from 'axios';

const CANDIDATES = {
  guayusa: [
    {
      id: 1,
      name: 'Shirley Lizbeth Tapuy Dahua',
      picture: 'guayusa1',
      votes: 0,
    },
    {
      id: 2,
      name: 'Shaquira Marielena Tanguila Andi',
      picture: 'guayusa2',
      votes: 0,
    },
    {
      id: 3,
      name: 'Cinthya Micaela Fierro Shiguango',
      picture: 'guayusa3',
      votes: 0,
    },
  ],
  reina: [
    {
      id: 4,
      name: 'Karol Jasmin Bastidas Guevara',
      picture: 'reina1',
      votes: 0,
    },
    {
      id: 5,
      name: 'Jessica Isamar Arboleda Guerrero',
      picture: 'reina2',
      votes: 0,
    },
    {
      id: 6,
      name: 'Mabeline Elizabeth Bolaños Insuasti',
      picture: 'reina3',
      votes: 0,
    },
    {
      id: 7,
      name: 'Cinthia Merci Gomez Cerda',
      picture: 'reina4',
      votes: 0,
    },
  ],
};

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  candidates: any = CANDIDATES;
  candidatesResults: any = {};
  passwordCheckPassed = false;
  password: any;
  databaseUrl = 'https://reinadetena-default-rtdb.firebaseio.com';

  constructor() {}

  checkPassword() {
    const that = this;
    if (this.password === 'EleccionesReinado2021') {
      this.passwordCheckPassed = true;
      axios.get(`${this.databaseUrl}/guayusa.json`).then((res: any) => {
        const candidatesResultsGuayusa = res.data;
        const result1 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 1)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        const result2 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 2)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        const result3 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 3)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        that.candidates.guayusa[0].votes = result1;
        that.candidates.guayusa[1].votes = result2;
        that.candidates.guayusa[2].votes = result3;
      });
      axios.get(`${this.databaseUrl}/reina.json`).then((res: any) => {
        const candidatesResultsGuayusa = res.data;
        const result4 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 4)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        const result5 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 5)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        const result6 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 6)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        const result7 = Object.values(candidatesResultsGuayusa)
          .filter((result: any) => result.id === 7)
          .reduce((acc: any, result: any) => (acc += 1), 0);
        that.candidates.reina[0].votes = result4;
        that.candidates.reina[1].votes = result5;
        that.candidates.reina[2].votes = result6;
        that.candidates.reina[3].votes = result7;
      });
    }
  }

  ngOnInit(): void {}
}

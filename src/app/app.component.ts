import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app3';

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCbe5UefvjfjZuidL4atKQdTDjNmZra1bo",
      authDomain: "jta-instagran-clone-94a60.firebaseapp.com",
      databaseURL: "https://jta-instagran-clone-94a60.firebaseio.com",
      projectId: "jta-instagran-clone-94a60",
      storageBucket: "jta-instagran-clone-94a60.appspot.com",
      messagingSenderId: "692437887919"
    });
  }

}

import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { CallNumber } from "@ionic-native/call-number";
import { MyApp } from "../../app/app.component";

@IonicPage()
@Component({
  selector: "page-emergency",
  templateUrl: "emergency.html"
})
export class EmergencyPage {
  translation: any = {};
  constructor(private callNumber: CallNumber, public navCtrl: NavController) {
    let translationSource = MyApp.translationSource.filter(
      x => x.Screen == "Emergency"
    )[0];
    this.translation = translationSource.Translation;
    console.log(this.translation);
  }

  call() {
    this.callNumber.callNumber("112", true)
      .then(res => console.log("Launched dialer!", res))
      .catch(err => console.log("Error launching dialer", err));
  }
}


import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { SmartThingsService } from "../../providers/smartthings";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
  , providers: [SmartThingsService]
})
export class HomePage {
  public lights: any;
  public light: any;
  public bulbIcon: string;
  private errorMessage: any;
  constructor(private smartThingsService: SmartThingsService) {
    this.getBulbs();

  }
  ionViewDidLoad() {
    //this.getCountries();
    //this.getLights();
  }
  getBulbs() {
    this.smartThingsService.getdata()
      .subscribe(
      data => this.lights = data,
      error => this.errorMessage = error);
  }
  onBulbPress(id: string) {
    //console.log("onBulbPress");
    this.smartThingsService.setLight("toggle", id)
      .subscribe(
      data => this.light = data,
      error => this.errorMessage = error
      );
    setTimeout(() => {
      this.getBulbs();
    }, 1000);
  }
  getBulbIcon(status: string) {
    //console.log(status);
    if (status == "on")
      return "ion-bulb";
    else
      return "ion-bulb-outline";
  }
  changeLevel(id:string, level: number) {
        this.smartThingsService.setLightLevel("set", id, level)
      .subscribe(
      data => this.light = data,
      error => this.errorMessage = error
      );
    setTimeout(() => {
      this.getBulbs();
    }, 1000);
  }
}

import { Component, OnInit } from "@angular/core";
import { AgentService } from "./services/agent.service";
import { LocationService } from "./services/location.service";
import { DistanceService } from "./services/distance.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  public isDisabledButton: Boolean = false;
  public btnCursorStatus;
  title = "Tikal’s Code Challenge";
  private _inputArr: Array<any>;
  set inputAgents(value: Array<any>) {
    this._inputArr = value;
  }
  private _sourceLocation: any = {};
  set sourceLocation(value: any) {
    this._sourceLocation = value;
  }

  constructor(private agentService: AgentService, 
              private locationService: LocationService,
              private distanceService: DistanceService) {
    console.log("App Constractor");
    this.btnCursorStatus = "pointer";
    this.inputAgents = this.agentService.getAgents().sort((a, b) => {
      return new Date(a.date) > new Date(b.date);
    });
  }

  trackByFn(index, item) {
    return item.id;
  }
  async ngOnInit() {
    console.log("App OnInit Start");
    this.sourceLocation = await this.locationService.getLocation(
      this.agentService.fromLocation
    );
    console.log("App OnInit End");
  }
  get inputAgents(): Array<any> {
    return this._inputArr;
  }
  get sourceLocation(): any {
    return this._sourceLocation;
  }
  
  calculateDistance() {
    this.distanceService.calculateDistance(
      this.isDisabledButton,
      this.btnCursorStatus,
      this.inputAgents,
      this.sourceLocation
    );
  }


}

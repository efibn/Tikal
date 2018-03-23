import { Injectable } from "@angular/core";
import { LocationService } from "./location.service";

//import { Http } from "@angular/http";
//import { Observable } from "rxjs";

@Injectable()
export class DistanceService {

  constructor(private locationService: LocationService) { }

  async calculateDistance(
    isDisabledButton,
    btnCursorStatus,
    inputAgents,
    sourceLocation
  ) {
    console.log("calculateDistance()");

    isDisabledButton = true;
    btnCursorStatus = "progress";
    console.log("%cStarting to calculate the farthest and closest distances", "font-weight:bold;color:#3bb53b");
    //let arrDistances = [];
    let min, max, minIndex, maxIndex;
    min = Number.MAX_SAFE_INTEGER;
    max = Number.MIN_SAFE_INTEGER;
    for (let i = 0; i < inputAgents.length; i++) {
      let $addressTo =
        inputAgents[i].address + ", " + inputAgents[i].country;
      let $distance = await this.locationService.getDistance(
        sourceLocation,
        $addressTo
      );
      if ($distance === 0) {
        console.log(
          "calculateDistance() => Error calculating distance for: ",
          $addressTo
        );
        return;
      }
      // Find Minimun and Maximun values
      if ($distance > max) {
        max = $distance;
        maxIndex = i;
      } else if ($distance < min) {
        min = $distance;
        minIndex = i;
      }
      inputAgents[i].distance = $distance;
    }

    inputAgents[maxIndex].farthestMission = true;
    inputAgents[minIndex].closestMission = true;

    console.log("%cSucceeded with finding the farthest and closest distances", "font-weight:bold;color:#3bb53b");
    btnCursorStatus = "notAllowed";
  }


}

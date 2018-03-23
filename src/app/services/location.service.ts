import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
//import { Observable } from "rxjs";

@Injectable()
export class LocationService {

  constructor(private http: Http) {}

  deg2rad($deg) {
    return $deg * Math.PI / 180;
  }

  rad2deg($rad) {
    return $rad * 180 / Math.PI;
  }

  async getLocation($address) {
    console.log("getLocation() => " + $address);
    let $formattedAddr = $address.replace(" ", "+");

    try {
      //Send request and receive json data
      let url =
        "https://maps.google.com/maps/api/geocode/json?address=" +
        $formattedAddr +
        "&sensor=false" +
        "&key=AIzaSyAdfoEA_LWJ6V_rVuw_sORR5307PNegwKo";
      let $output = await this.http.get(url).toPromise();
      return $output.json();
    } catch (err) {
      console.log(
        "%cgetLocation()%c Error: " + err,
        "text-decoration:underline",
        "font-weight:bold;color:#ff1c1c"
      );
      return 0;
    }
  }

  async getDistance($pointFrom, $addressTo) {
    console.log("getDistance() => from: ", $pointFrom, "TO: ", $addressTo);

    try {
      let $outputTo = await this.getLocation($addressTo);

      //Get latitude and longitude from geo data
      let $latitudeFrom = $pointFrom.results[0].geometry.location.lat;
      let $longitudeFrom = $pointFrom.results[0].geometry.location.lng;
      let $latitudeTo = $outputTo.results[0].geometry.location.lat;
      let $longitudeTo = $outputTo.results[0].geometry.location.lng;

      //Calculate distance from latitude and longitude
      let $theta = $longitudeFrom - $longitudeTo;
      let $dist =
        Math.sin(this.deg2rad($latitudeFrom)) *
          Math.sin(this.deg2rad($latitudeTo)) +
        Math.cos(this.deg2rad($latitudeFrom)) *
          Math.cos(this.deg2rad($latitudeTo)) *
          Math.cos(this.deg2rad($theta));

      $dist = Math.acos($dist);
      $dist = this.rad2deg($dist);
      let $miles = $dist * 60 * 1.1515;
      return $miles * 1.609344;
    } catch (err) {
      console.log(
        "%cgetDistance()%c Error: " + err,
        "text-decoration:underline",
        "font-weight:bold;color:#ff1c1c"
      );
      return 0;
    }
  }
}

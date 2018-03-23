import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";
import { NgModule } from "@angular/core";
import { AgentService } from "./services/agent.service";
import { LocationService } from "./services/location.service";
import { DistanceService } from "./services/distance.service";

import { AppComponent } from "./app.component";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpModule],
  providers: [
    AgentService, 
    LocationService,
    DistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

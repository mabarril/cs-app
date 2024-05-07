import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./pages/home/home.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HttpClientModule, HomeComponent, ToolbarComponent]
})
export class AppComponent {
  title = 'cs-app';
}

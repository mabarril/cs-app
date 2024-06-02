import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from "./pages/home/home.component";
import { ToolbarComponent } from "./components/toolbar/toolbar.component";
import { NgxPrintModule } from 'ngx-print';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, HttpClientModule, HomeComponent, ToolbarComponent, NgxPrintModule, FormsModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule, MatInputModule
    , MatDialogModule],
})


export class AppComponent {
  title = 'cs-app';
}

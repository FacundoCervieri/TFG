import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component'; // Ajusta la ruta

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  templateUrl: './base-layout.component.html',
  styleUrls: ['./base-layout.component.css']
})
export class BaseLayoutComponent { }
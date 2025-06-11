import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  imports: [RouterModule, CommonModule],
  templateUrl: './terminos.component.html',
  styleUrls: ['./terminos.component.css']
})
export class TerminosComponent {}
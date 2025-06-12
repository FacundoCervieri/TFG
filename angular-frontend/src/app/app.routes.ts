import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './paginas/login/login.component';
import { FaqComponent } from './paginas/faq/faq.component';
import { AyudaComponent } from './paginas/ayuda/ayuda.component';
import { ContactoComponent } from './paginas/contacto/contacto.component';
import { PrivacidadComponent } from './paginas/privacidad/privacidad.component';
import { TerminosComponent } from './paginas/terminos/terminos.component';
import { ServiciosComponent } from './paginas/servicios/servicios.component';
import { SobreNosotrosComponent } from './paginas/sobre-nosotros/sobre-nosotros.component';
import { RegistroServicioComponent } from './paginas/registro-servicio/registro-servicio/registro-servicio.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'faq', component: FaqComponent },
  { path: 'ayuda', component: AyudaComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'privacidad', component: PrivacidadComponent },
  { path: 'terminos', component: TerminosComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'sobre-nosotros', component: SobreNosotrosComponent },
  { path: 'registro-servicio', component: RegistroServicioComponent },
  { path: '**', redirectTo: '' } // ruta comodín por si alguien pone algo inválido
];

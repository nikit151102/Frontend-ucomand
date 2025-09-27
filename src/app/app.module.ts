import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuNavComponent } from './components/menu-nav/menu-nav.component';
import { PopUpEntryComponent } from './components/pop-up-entry/pop-up-entry.component';
import { FooterComponent } from './components/footer/footer.component';
import { PopUpErrorCreateComponent } from './components/pop-up-error-create/pop-up-error-create.component';
import { LendingFooterButtonComponent } from "./pages/public-lending/sections/lending-footer-button/lending-footer-button.component";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MenuNavComponent,
    PopUpEntryComponent,
    FooterComponent,
    PopUpErrorCreateComponent,
    LendingFooterButtonComponent
],
  bootstrap: [AppComponent],
})
export class AppModule { }

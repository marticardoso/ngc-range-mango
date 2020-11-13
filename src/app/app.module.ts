import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Exercise1Component } from './exercise1/exercise1.component';
import { Exercise2Component } from './exercise2/exercise2.component';
import { NgcRangeLabelComponent } from './ngc-range/ngc-range-label/ngc-range-label.component';
import { NgcRangeSliderComponent } from './ngc-range/ngc-range-slider/ngc-range-slider.component';
import { NgcRangeComponent } from './ngc-range/ngc-range.component';

@NgModule({
  declarations: [
    AppComponent,
    NgcRangeComponent,
    Exercise1Component,
    Exercise2Component,
    NgcRangeLabelComponent,
    NgcRangeSliderComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

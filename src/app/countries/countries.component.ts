import { OnInit, Component } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

import { CountriesService } from '../services/countries.service';
import { Country } from '../models/country.model';
import { CasesService } from '../services/cases.service';
import { Cases } from '../models/cases.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countrySubscription: Subscription;
  casesSubscription: Subscription;
  countryName: string;
  countries: Country[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<Country[]>;
  filteredCountry: Country;
  filteredCountryConfirmedCases: Cases;
  filteredCountryRecoveredCases: Cases;
  filteredCountryDeaths: Cases;

  constructor(
    private countriesService: CountriesService,
    private casesService: CasesService
  ) {}

  ngOnInit() {
    this.countrySubscription = this.countriesService
      .getCountries()
      .subscribe((countries) => {
        this.countries = countries;
        this.countries.forEach((c) => {
          this.countries.sort((a, b) => (a.Country < b.Country ? -1 : 1));
        });
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map((value) => this._filter(value))
        );
      });
  }

  onChange(event: Event) {
   console.log(this.countryName);
  }

  onFocus(event: Event) {
    console.log(this.countryName);
  }

  private _filter(value: string): Country[] {
    const filterValue = value.toLowerCase();

    this.countries.forEach((country) => {
      if (country.Country.toLowerCase() === filterValue) {
        this.filteredCountry = country;
      }
    });

    console.log(this.filteredCountry);

    if (this.filteredCountry) {
      this.casesService
        .getConfirmedCases(this.filteredCountry.Slug)
        .subscribe((cases) => {
          this.filteredCountryConfirmedCases = new Cases(
            cases[cases.length - 1].Country,
            cases[cases.length - 1].CountryCode,
            cases[cases.length - 1].Confirmed,
            cases[cases.length - 1].Deaths,
            cases[cases.length - 1].Recovered,
            cases[cases.length - 1].Active
          );

          console.log(this.filteredCountryConfirmedCases);
        });
    }

    return this.countries.filter((c) =>
      c.Country.toLowerCase().includes(filterValue)
    );
  }
}

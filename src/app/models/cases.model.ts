export class Cases {
  Country: string;
  CountryCode: string;
  Confirmed: number;
  Deaths: number;
  Recovered: number;
  Active: number;

  constructor(
    Country: string,
    CountryCode: string,
    Confirmed: number,
    Deaths: number,
    Recovered: number,
    Active: number
  ) {
    this.Country = Country;
    this.CountryCode = CountryCode;
    this.Confirmed = Confirmed;
    this.Deaths = Deaths;
    this.Recovered = Recovered;
    this.Active = Active;
  }
}

type Name = {
  common: string;
  official: string;
};

export type Currency = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

type Flags = {
  png: string;
  svg: string;
  alt: string;
};

export type CountryProps = {
  name: Name;
  currencies: Currency;
  capital: string[];
  translations: { por: { official: string; common: string } };
  latlng: number[];
  area: number;
  flag: string;
  population: number;
  continents: string[];
  flags: Flags;
};

export type RapidAPIResponse = {
  route: {
    greatCircle: number;
  };
};

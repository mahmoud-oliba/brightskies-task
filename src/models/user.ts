import { Company } from './company';
import { Address } from './address';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};

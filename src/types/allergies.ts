export interface IAllergy {
  name: string;
  severity: string;
  symptoms: string[];
  comments: any[];
  image: string;
  highRisk: boolean;
}

export interface IAllergyResponse extends IAllergy {
  id: number;
  createdAt: Date;
  userId: number;
}

export interface IAllergy {
  name: string;
  severity: string;
  symptoms: string[];
  comments: IComment[];
  image: string;
  highRisk: boolean;
}

export interface IComment {
  comment: string;
  createdAt: Date;
  addedBy: { name: string; id: number };
}

export interface IAllergyResponse extends IAllergy {
  id: number;
  createdAt: Date;
  userId: number;
}

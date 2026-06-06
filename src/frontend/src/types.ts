export interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Resume {
  contact: ContactInfo;
  summary: string;
  workExperience: WorkExperience[];
  education: Education[];
  skills: string[];
  updatedAt: bigint;
}

export const emptyContact = (): ContactInfo => ({
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
});

export const emptyWorkExperience = (): WorkExperience => ({
  company: "",
  title: "",
  location: "",
  startDate: "",
  endDate: "",
  description: "",
});

export const emptyEducation = (): Education => ({
  institution: "",
  degree: "",
  field: "",
  startDate: "",
  endDate: "",
});

export const emptyResume = (): Resume => ({
  contact: emptyContact(),
  summary: "",
  workExperience: [],
  education: [],
  skills: [],
  updatedAt: BigInt(0),
});

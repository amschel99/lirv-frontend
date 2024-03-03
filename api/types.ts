enum EventType {
  "Online",
  "Physical",
}

export interface Event {
  photo: string;
  date: string;
  title: String;
  description: string;
  type: EventType;
}

export interface Community {
  image: string;
  title: string;
  description: string;
}

export type Links = {
  github: string;
  web: string;
  linkedin: string;
  twitter: string;
};

export interface Business {
  businessSize: string;
  businessLocation: string;
  industry: string;
  businessDescription: string;
  businessName: string;
  links: Links;
}

type Education = {
  level: string;
  title: string;
  start: string;
  end: string;
  currentlyHere: boolean;
  institution: string;
};

type Job = {
  type: string;
  position: string;
  company: string;
  start: string;
  end?: string;
  currentlyWorkingHere?: boolean;
};

export interface User {
  title: string;
  firstname: string;
  lastname: string;
  story: string;
  previousAcademics: [Education];
  proficiencies: [string];
  links: [string];
  previousJobs: [Job];
}

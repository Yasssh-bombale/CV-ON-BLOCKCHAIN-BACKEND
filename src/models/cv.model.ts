import mongoose, { Document, Schema } from "mongoose";

type personalDetailsObjectType = {
  name: string;
  email: string;
  location: string;
  phoneNumber: string;
  profession: string;
  imageUrl: string;
  years_of_experience: string;
};
type EducationObjectType = {
  class10School: string;
  class10Board: string;
  class10Grade: string;
  class12College: string;
  class12Board: string;
  class12Grade: string;
  underGraduateCollege: string;
  underGraduateDegree: string;
  underGraduateGPA: string;
  postGraduateCollege: string;
  postGraduateDegree: string;
  postGraduateGPA: string;
};
type ExperienceObjectType = {
  company_name: string;
  description: string;
  duration: {
    from: string;
    to: string;
  };
  job_role: string;
};
type AwardObjectType = {
  award_name: string;
  awarding_organization: string;
  date_of_achievement: string;
  description: string;
};
type CourseObjectType = {
  course_name: string;
  organization: string;
  duration: {
    from: string;
    to: string;
  };
  description: string;
};
type ProjectObjectType = {
  project_name: string;
  project_url: string;
  duration: {
    from: string;
    to: string;
  };
  description: string;
};

interface cvSchemaDataType extends Document {
  personalDetails: personalDetailsObjectType;
  education: EducationObjectType;
  experiece: ExperienceObjectType[];
  skills: string[];
  achievements: {
    awards: AwardObjectType[];
    courses: CourseObjectType[];
    projects: ProjectObjectType[];
  };
  profile_summary: string;
}

const CvSchema: Schema<cvSchemaDataType> = new Schema(
  {
    personalDetails: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      location: { type: String, required: true },
      profession: { type: String, required: true },
      imageUrl: { type: String, required: true },
      phoneNumber: { type: String, required: true },
      years_of_experience: { type: String, required: true },
    },
    education: {
      class10School: { type: String },
      class10Board: { type: String },
      class10Grade: { type: String },
      class12College: { type: String },
      class12Board: { type: String },
      class12Grade: { type: String },
      underGraduateCollege: { type: String },
      underGraduateDegree: { type: String },
      underGraduateGPA: { type: String },
      postGraduateCollege: { type: String },
      postGraduateDegree: { type: String },
      postGraduateGPA: { type: String },
    },
    experiece: [
      {
        company_name: { type: String, required: true },
        description: { type: String, required: true },
        duration: {
          from: { type: String, required: true },
          to: { type: String, required: true },
        },
        job_role: { type: String, required: true },
      },
    ],
    skills: {
      type: [String],
    },
    achievements: {
      awards: [
        {
          award_name: { type: String, required: true },
          awarding_organization: { type: String, required: true },
          date_of_achievement: { type: String, required: true },
          description: { type: String, required: true },
        },
      ],
      courses: [
        {
          course_name: { type: String, required: true },
          organization: { type: String, required: true },
          duration: {
            from: { type: String, required: true },
            to: { type: String, required: true },
          },
          description: { type: String, required: true },
        },
      ],
      projects: [
        {
          project_name: { type: String, required: true },
          project_url: { type: String },
          duration: {
            from: { type: String, required: true },
            to: { type: String, required: true },
          },
          description: { type: String, required: true },
        },
      ],
    },
    profile_summary: { type: String, required: true },
  },
  { timestamps: true }
);

export const CV = mongoose.model<cvSchemaDataType>("CV", CvSchema);

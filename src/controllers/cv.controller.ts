import { Request, Response } from "express";
import {
  AwardObjectType,
  CourseObjectType,
  CV,
  ExperienceObjectType,
  ProjectObjectType,
} from "../models/cv.model";
import {
  AwardVerificationType,
  CourseVerificationType,
  EducationVerificationsType,
  ExperienceVerificationsType,
  PersonalVerificationsType,
  ProfileSummaryVerificationType,
  ProjectVerificationType,
  SkillsVerificationType,
} from "../types/verifications.types";
// Define the type for education object
type EducationType = {
  class10School?: string;
  class10Board?: string;
  class10Grade?: string;
  class12College?: string;
  class12Board?: string;
  class12Grade?: string;
  underGraduateCollege?: string;
  underGraduateDegree?: string;
  underGraduateGPA?: string;
  postGraduateCollege?: string;
  postGraduateDegree?: string;
  postGraduateGPA?: string;
};

// Define the type for personal details object
type PersonalDetailsType = {
  name: string;
  email: string;
  location: string;
  profession: string;
  imageUrl: string;
  phoneNumber: string;
  years_of_experience: string;
};

type AchievementsObjectType = {
  awards?: AwardObjectType[] | [];
  courses?: CourseObjectType[] | [];
  projects?: ProjectObjectType[] | [];
};

// Main data type with personal details and education
type DataToBeStoredType = {
  personalDetails: PersonalDetailsType;
  education: EducationType;
  experience: ExperienceObjectType[] | [];
  skills: string[] | [];
  achievements?: AchievementsObjectType;
  profile_summary: string;
  // verifications;
  // verifications;
  personalDetailsVerification?: PersonalVerificationsType;
  educationVerifications?: EducationVerificationsType;
  experienceVerifications?: ExperienceVerificationsType;
  skillsVerifications?: SkillsVerificationType;
  awardVerifications?: AwardVerificationType;
  courseVerifications?: CourseVerificationType;
  projectsVerifications?: ProjectVerificationType;
  profileSummaryVerification?: ProfileSummaryVerificationType;
};

// requestbody type;
interface RequestBodyType {
  name: string;
  email: string;
  location: string;
  profession: string;
  imageUrl: string;
  phoneNumber: string;
  Years_of_experience: string;
  profile_summary: string;
  class10SchoolName: string;
  class10Board: string;
  class10Grade: string;
  class12CollegeName?: string;
  class12Board?: string;
  class12Grade?: string;
  underGraduateCollegeName?: string;
  underGraduateDegreeName?: string;
  underGraduateGPA?: string;
  postGraduateCollegeName?: string;
  postGraduateDegreeName?: string;
  postGraduateGPA?: string;
  Experience: ExperienceObjectType[] | []; // Experience is an array of objects
  Skills: string[];
  Awards: AwardObjectType[] | [];
  Courses: CourseObjectType[] | [];
  Projects: ProjectObjectType[] | [];
  // verifications;
  personalDetailsVerification: PersonalVerificationsType;
  educationVerifications: EducationVerificationsType;
  experienceVerifications: ExperienceVerificationsType;
  skillsVerifications: SkillsVerificationType;
  awardVerifications: AwardVerificationType;
  courseVerifications: CourseVerificationType;
  projectsVerifications: ProjectVerificationType;
  profileSummaryVerification: ProfileSummaryVerificationType;
}
export const createCv = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      location,
      profession,
      imageUrl,
      phoneNumber,
      Years_of_experience,
      profile_summary,
      class10SchoolName,
      class10Board,
      class10Grade,
      class12CollegeName,
      class12Board,
      class12Grade,
      underGraduateCollegeName,
      underGraduateDegreeName,
      underGraduateGPA,
      postGraduateCollegeName,
      postGraduateDegreeName,
      postGraduateGPA,
      Experience,
      Skills,
      Awards,
      Courses,
      Projects,
      //verifications
      personalDetailsVerification,
      educationVerifications,
      experienceVerifications,
      skillsVerifications,
      awardVerifications,
      courseVerifications,
      projectsVerifications,
      profileSummaryVerification,
    } = req.body as RequestBodyType;

    if (
      !name ||
      !email ||
      !location ||
      !profession ||
      !imageUrl ||
      !phoneNumber ||
      !Years_of_experience ||
      !profile_summary
    ) {
      return res
        .status(400)
        .json(
          "All fields like {name,email,location,profession,imageUrl,phoneNumber,years_of_experience,profile_summary} are required"
        );
    }

    let dataToBeStored: DataToBeStoredType = {
      personalDetails: {
        name,
        email,
        location,
        profession,
        imageUrl,
        phoneNumber,
        years_of_experience: Years_of_experience,
      },
      education: {},
      experience: [],
      skills: [],
      profile_summary,
      // verifications;
      personalDetailsVerification,
      educationVerifications,
      experienceVerifications,
      skillsVerifications,
      awardVerifications,
      courseVerifications,
      projectsVerifications,
      profileSummaryVerification,
    };

    const addEducationFields = (
      field: keyof EducationType,
      value: string | undefined
    ) => {
      if (value) {
        dataToBeStored.education[field] = value;
      }
    };
    // const addCourseFields = (
    //   field: keyof EducationType,
    //   value: string | undefined
    // ) => {
    //   if (value) {
    //     dataToBeStored.education[field] = value;
    //   }
    // };
    // const addPFields = (
    //   field: keyof EducationType,
    //   value: string | undefined
    // ) => {
    //   if (value) {
    //     dataToBeStored.education[field] = value;
    //   }
    // };

    // class10fields;
    addEducationFields("class10School", class10SchoolName);
    addEducationFields("class10Board", class10Board);
    addEducationFields("class10Grade", class10Grade);

    // class12fields;
    addEducationFields("class12College", class12CollegeName);
    addEducationFields("class12Board", class12Board);
    addEducationFields("class12Grade", class12Grade);

    // undergraduate fields;
    addEducationFields("underGraduateCollege", underGraduateCollegeName);
    addEducationFields("underGraduateDegree", underGraduateDegreeName);
    addEducationFields("underGraduateGPA", underGraduateGPA);

    // postGraduate fields;
    addEducationFields("postGraduateCollege", postGraduateCollegeName);
    addEducationFields("postGraduateDegree", postGraduateDegreeName);
    addEducationFields("postGraduateGPA", postGraduateGPA);

    if (Experience.length > 0) {
      dataToBeStored.experience = Experience;
    }

    if (Skills.length > 0) {
      dataToBeStored.skills = Skills;
    }

    if (Awards.length > 0) {
      dataToBeStored.achievements = {
        awards: Awards,
      };
    }

    if (Courses.length > 0) {
      dataToBeStored.achievements = {
        ...dataToBeStored.achievements,
        courses: Courses,
      };
    }

    if (Projects.length > 0) {
      dataToBeStored.achievements = {
        ...dataToBeStored.achievements,
        projects: Projects,
      };
    }

    const cvData = await CV.create(dataToBeStored);

    return res.json(cvData);
  } catch (error) {
    console.log("ERROR:IN CREATE-CV CONTROLLER", error);
    res.status(500).json("ERROR:IN CREATE-CV CONTROLLER");
  }
};

export const getCv = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cv = await CV.findById(id);
    if (!cv) {
      return res.status(404).json("No CV Found!");
    }

    return res.status(200).json(cv);
  } catch (error) {
    console.log("ERROR:GET_CV_CONTROLLER", error);
    res.status(500).json("ERROR:GET_CV_CONTROLLER");
  }
};

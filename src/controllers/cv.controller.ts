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
  nanoId: string;
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
  nanoId: string;
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
      nanoId,
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
      nanoId,
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
// export const verifyDoc = async (req:Request, res:Response) => {
//   try {
//     const { pinataHash } = req.params;
//     const response = await axios.get(
//       https://${process.env.pinataGateway}/ipfs/${pinataHash},
//       { responseType: "arraybuffer" }
//     );

//     const contentType = response.headers["content-type"];

//     if (contentType.includes("text/html")) {
//       const html = response.data;
//       const $ = cheerio.load(html);
//       let pdfLinkText = null;

//       // Search for PDF links in the HTML
//       $("a").each((index, element) => {
//         const link = $(element).attr("href");
//         if (link && link.endsWith(".pdf")) {
//           pdfLinkText = $(element).text();
//           return false; // Stop after finding the first match
//         }
//       });

//       console.log(pdfLinkText);

//       // If a PDF link is found, fetch the PDF data
//       if (pdfLinkText) {
//         const pdfData = await axios.get(
//           https://${process.env.pinataGateway}/ipfs/${pinataHash}/${pdfLinkText},
//           { responseType: "arraybuffer" }
//         );
//         const base64Pdf = Buffer.from(pdfData.data, "binary").toString(
//           "base64"
//         );

//         // Serve HTML with embedded PDF
//         const htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Edubuk</title>
//                     <style>

//                         .container
//                             {
//                                 display: flex;
//                                 flex-direction:column;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 row-gap: 10px;
//                                 width: 100dvw;
//                                 height: 100dvh;
//                             }
//                         h1 {
//                                 text-align: center;
//                                 align-items: center;
//                                 color: #006666;
//                             }

//                         .btn
//                             {
//                                 display: flex;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 gap: 10px;
//                             }
//                         button
//                             {
//                                 padding: 20px 30px;
//                                 border: none;
//                                 border-radius: 8px;
//                                 font-size: 20px;
//                                 cursor:pointer;
//                             }
//                             iframe{
//                         width:100%;
//                         height:100%;
//                         border:none;
//                         }

//                         #approve
//                             {
//                                 color:green
//                             }
//                         #reject
//                             {
//                                 color:red
//                             }
//                     </style>
//                 </head>
//                 <body>
//                     <div class='container'>
//                     <h1>Verify Certificate</h1>
//                     <div class='btn'>
//                             <button id='approve'>Approve</button>
//                             <button id='reject'>Reject</button>
//                         </div>
//                         <iframe src="data:application/pdf;base64,${base64Pdf}" width="100%" style="border:none;"></iframe>
//                     </div>
//                 </body>
//             </html>
//                 `;
//         res.setHeader("Content-Type", "text/html");
//         res.send(htmlContent);
//       }
//     } else if (contentType.includes("application/pdf")) {
//       // If it's directly a PDF, embed it in HTML
//       const base64Pdf = Buffer.from(response.data, "binary").toString("base64");

//       const htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Edubuk</title>
//                     <style>

//                         .container
//                             {
//                                 display: flex;
//                                 flex-direction:column;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 row-gap: 20px;
//                                 width: 100%;
//                                 height: auto;
//                             }
//                         h1 {
//                                 text-align: center;
//                                 align-items: center;
//                                 color: #006666;
//                             }

//                         .btn
//                             {
//                                 display: flex;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 gap: 20px;
//                             }
//                         button
//                             {
//                                 padding: 15px 30px;
//                                 border: 1px solid #ccc;
//                                 border-radius: 8px;
//                                 font-size: 20px;
//                                 cursor:pointer;
//                                 margin:10px 0px;
//                             }
//                         button:hover
//                         {
//                         background-color:white;
//                         border:1px solid #006666;
//                         }
//                         button:active
//                         {
//                         transform:translateY(2px);
//                         }

//                         iframe{
//                         width:100%;
//                         height:100vh;
//                         border:none;
//                         }

//                         #approve
//                             {
//                                 color:green
//                             }
//                         #reject
//                             {
//                                 color:red
//                             }
//                     </style>
//                 </head>
//                 <body>
//                     <div class='container'>
//                       <h1>Verify Certificate</h1>
//                         <div class='btn'>
//                             <button id='approve'>Approve</button>
//                             <button id='reject'>Reject</button>
//                         </div>
//                         <iframe src="data:application/pdf;base64,${base64Pdf}" ></iframe>
//                     </div>
//                 </body>
//             </html>
//                 `;
//       res.setHeader("Content-Type", "text/html");
//       res.send(htmlContent);
//     } else if (
//       contentType.includes("image/png") ||
//       contentType.includes("image/jpeg") ||
//       contentType.includes("image/jpg")
//     ) {
//       const base64Image = Buffer.from(response.data, "binary").toString(
//         "base64"
//       );
//       const imgSrc = data:${contentType};base64,${base64Image};

//       // Generate HTML with the embedded image
//       const htmlContent = `
//             <!DOCTYPE html>
//             <html lang="en">
//                 <head>
//                     <meta charset="UTF-8">
//                     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//                     <title>Edubuk</title>
//                     <style>

//                         .container
//                             {
//                                 display: flex;
//                                 flex-direction:column;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 row-gap: 20px;
//                                 width: 100%;
//                                 height: auto;
//                                 padding:10px;;
//                             }
//                         h1 {
//                                 text-align: center;
//                                 align-items: center;
//                                 color: #006666;
//                             }

//                         .btn
//                             {
//                                 display: flex;
//                                 justify-content: center;
//                                 align-items: center;
//                                 text-align: center;
//                                 gap: 20px;
//                             }
//                         button
//                             {
//                                 padding: 15px 30px;
//                                 border: 1px solid #ccc;
//                                 border-radius: 8px;
//                                 font-size: 20px;
//                                 cursor:pointer;
//                                 margin:10px 0px;
//                             }
//                         button:hover
//                         {
//                         background-color:white;
//                         border:1px solid #006666;
//                         }

//                         img {
//                             align-items:center;
//                             max-width: 90%; /* Scale image to fit the viewport width */
//                             max-height: 100%; /* Scale image to fit the viewport height */
//                             width: auto; /* Maintain aspect ratio */
//                             height: auto; /* Maintain aspect ratio */
//                             object-fit: contain; /* Ensures the image is scaled without cropping */
//                             border:1px solid #ccc;
//                             border-radius:0.2rem;
//                         }
//                         #approve
//                             {
//                                 color:green
//                             }
//                         #reject
//                             {
//                                 color:red
//                             }
//                     </style>
//                 </head>
//                 <body>
//                     <div class='container'>
//                         <h1>Verify Certificate</h1>
//                         <div class='btn'>
//                         <button id='approve'>Approve</button>
//                         <button id='reject'>Reject</button>
//                         </div>
//                         <img src="${imgSrc}" alt="Embedded Image" style="max-width: 100%; height: auto;" />
//                     </div>
//                 </body>
//             </html>
//                 `;
//       res.setHeader("Content-Type", "text/html");
//       res.send(htmlContent);
//     } else {
//       // Handle unsupported content types
//       console.log("Unsupported content type", contentType);
//       res.status(415).send({
//         success: false,
//         message: "Unsupported content type",
//       });
//     }
//   } catch (error) {
//     res.status(500).send({
//       success: false,
//       message: "Error while getting user data",
//       error,
//     });
//   }
// };

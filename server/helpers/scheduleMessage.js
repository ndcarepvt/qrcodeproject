// import cron from "node-cron";
// import { FBLead } from "../models/facebookLead.model.js";

// // Function to get lead counts for the given time range
// const getLeadCounts = async (startTime, endTime) => {
//     try {
//         const nationalCount = await FBLead.countDocuments({
//             countrySource: "national",
//             createdAt: { $gte: startTime, $lt: endTime },
//         });

//         const internationalCount = await FBLead.countDocuments({
//             countrySource: "international",
//             createdAt: { $gte: startTime, $lt: endTime },
//         });

//         return { nationalCount, internationalCount };
//     } catch (error) {
//         console.error("Error fetching lead counts:", error);
//         return { nationalCount: 0, internationalCount: 0 };
//     }
// };

// // Function to send the email
// // const sendEmail = async (shift, nationalCount, internationalCount) => {
// //     try {
// //         const mailOptions = {
// //             from: "your-email@gmail.com",
// //             to: "recipient@example.com",
// //             subject: `FBLead Count Report - ${shift} Shift`,
// //             text: `FBLead count for ${shift} shift:\n- National: ${nationalCount}\n- International: ${internationalCount}`,
// //         };

// //         await transporter.sendMail(mailOptions);
// //         console.log(`${shift} shift report sent successfully.`);
// //     } catch (error) {
// //         console.error("Error sending email:", error);
// //     }
// // };

// // Schedule the 9:00 AM message (fetching data from 8:00 PM to 8:00 AM)
// cron.schedule("0 9 * * *", async () => {
//     console.log("Fetching lead counts for Night Shift (8:00 PM - 8:00 AM)");
//     const startTime = new Date();
//     startTime.setHours(20, 0, 0, 0); // 8:00 PM previous day
//     const endTime = new Date();
//     endTime.setHours(8, 0, 0, 0); // 8:00 AM today

//     const { nationalCount, internationalCount } = await getLeadCounts(startTime, endTime);
//     console.log("nationalCount", nationalCount);
//     console.log("internationalCount", internationalCount);
//     // await sendEmail("Night (8 PM - 8 AM)", nationalCount, internationalCount);
// });

// // Schedule the 9:00 PM message (fetching data from 8:00 AM to 8:00 PM)
// cron.schedule("5 14 * * *", async () => {
//     console.log("Fetching lead counts for Day Shift (8:00 AM - 2:00 PM)");
    
//     const startTime = new Date();
//     startTime.setHours(8, 0, 0, 0); // 8:00 AM today
//     const endTime = new Date();
//     endTime.setHours(14, 0, 0, 0); // 2:00 PM today
  
//     console.log("startTime", startTime);
//     console.log("endTime", endTime);
  
//     const { nationalCount, internationalCount } = await getLeadCounts(startTime, endTime);
//     console.log("nationalCount", nationalCount);
//     console.log("internationalCount", internationalCount);
//     // await sendEmail("Day (8 AM - 2 PM)", nationalCount, internationalCount);
//   });
  

// console.log("Lead count cron jobs scheduled at 9:00 AM & 9:00 PM.");

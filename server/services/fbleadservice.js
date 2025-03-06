import axios from 'axios';
import moment from 'moment-timezone';


// Function to check if the current time is within business hours
function isWithinBusinessHours(timeZone) {
    try {
        // Get the current time in the specified time zone
        const localTime = moment.tz(timeZone);

        console.log(localTime)
        // Extract the current hour in 24-hour format
        const currentHour = localTime.hour();

        console.log(timeZone, currentHour);

        // Calling hours: 8 AM to 8 PM
        return { isAllowed: currentHour >= 8 && currentHour < 20, time: localTime }
    } catch (error) {
        console.error(`Error with time zone ${timeZone}:`, error.message);
        return false;
    }
}

// Function to determine the timezone based on form name

export const checkTimezone = (formname) => {
    let singleTimeZone;
    let formName = formname.toLowerCase(); // Fixed typo here

    if (formName.includes('australia')) {
        singleTimeZone = "Australia/Sydney";
    } else if (formName.includes('canada')) {
        singleTimeZone = "America/Toronto";  // Fixed: Changed "America/Ontario" to "America/Toronto"
    } else if (formName.includes('uk')) {
        singleTimeZone = "Europe/London";
    } else if (formName.includes('usa')) {
        singleTimeZone = "America/New_York"; // USA generally uses "America/New_York"
    } else if (formName.includes('ghana')) {
        singleTimeZone = "Africa/Accra"; // Corrected timezone for Ghana
    } else {
        console.error(`No timezone matched for form name: ${formName}`);
        return;
    }

    console.log(`Determined timezone: ${singleTimeZone}`);

    const {isAllowed, time} = isWithinBusinessHours(singleTimeZone);
    console.log(`Call allowed in ${formname}: ${isAllowed} : ${time}`);
    return { isAllowed, time };
};


const updateRemarksDPR = async (data) => {

    await axios.post('https://ndayurveda.info/api/crmdata/MakeCallAttempt', data, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log('Response:', response.data);
    })
        .catch(error => {
            console.error('Error:', error);
        });
}


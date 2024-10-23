import { BookSlot } from "../models/bookedSlots.model.js"; // Import the model

// Controller to add a new booking slot
const addBookSlot = async (req, res) => {
    try {
        const { bookedSlots, bookDates } = req.body; // Extract data from the request body

        // Create a new BookSlot instance with the provided data
        const newBookSlot = new BookSlot({
            bookedSlots: bookedSlots || {}, // Default to an empty object if no data is provided
            bookDates: bookDates || [], // Default to an empty array if no data is provided
        });

        // Save the new booking slot to the database
        const savedBookSlot = await newBookSlot.save();

        // Respond with the newly created booking slot
        return res.status(201).json(savedBookSlot);
    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Controller to get all booking slots
const getAllBookSlots = async (req, res) => {
    try {
        const bookSlots = await BookSlot.find(); // Fetch all booking slots from the database

        // If no slots found
        if (bookSlots.length === 0) {
            return res.status(404).json({ message: "No booking slots found" });
        }

        return res.status(200).json(bookSlots); // Send the found slots as the response
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Controller to update a booking slot by ID
const updateBookSlot = async (req, res) => {
    try {
        
        const { bookedSlots, bookDates, id } = req.body; // Get the update data from the request body

        // Find the BookSlot by ID and update the bookedSlots and bookDates fields
        const updatedBookSlot = await BookSlot.findOneAndUpdate(
            { customId: id }, 
            {
                $set: {
                    bookedSlots: bookedSlots,
                    bookDates: bookDates,
                },
            },
            { new: true, runValidators: true } // Options to return the updated document and validate the input
        );

        // If the booking slot was not found
        if (!updatedBookSlot) {
            return res.status(404).json({ message: "Booking slot not found" });
        }

        // Send the updated document as the response
        return res.status(200).json(updatedBookSlot);
    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};


export {addBookSlot, getAllBookSlots, updateBookSlot}

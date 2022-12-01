const { response } = require("express");
const CalendarEvent = require("../Models/CalendarEvent");

const getAllCalendarEvents = async (req, resp = response) => { 
    const events = await CalendarEvent
        .find()
        .populate('user', 'name');
    resp.status(200).json({
        ok: true,
        events
    })
    
}

const createNewCalendarEvent = async (req, resp = response) => { 
    
    const { title, start, end, notes, user } = req.body;



    try {  
        const event = new CalendarEvent({ title, start, end, notes, user });
        event.user = req.user_id

        const savedEvent = await event.save();
        return resp.status(200).json({
            ok: true,
            message:' Event has been created success',
            savedEvent
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' Communicate with a system provider',
        })
    }
        
}

const editCalendarEvent = async(req, resp = response) => { 
    const { id } = req.params;
    const { user_id } = req;
    
    try {  

        const event = await CalendarEvent.findById(id);
        if (!event) { 
            return resp.status(400).json({
                ok: false,
                message: "Any event has'nt found"
            });
        }
        if (event.user.toString() !== user_id ) { 
            return resp.status(401).json({
                ok: false,
                message: "you're not avible to update this event "
            });
        }
        const eventToUpdate = {
            ...req.body,
            user: user_id
        }
        
        const eventUpdated = await CalendarEvent.findByIdAndUpdate(id, eventToUpdate, { new : true });
        
        return resp.status(200).json({
            ok: true,
            message:' Event has been updated success',
            calendar_event: {eventUpdated}
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' Communicate with a system provider',
        })
    }
    
}
const deleteCalendarEvent = async (req, resp = response) => { 

    const { id } = req.params;
    const { user_id } = req;

    try {
        const event = await CalendarEvent.findById(id);
        if (!event) { 
            return resp.status(400).json({
                ok: false,
                message: "Any event has'nt found"
            });
        }

        if (event.user.toString() !== user_id ) { 
            return resp.status(401).json({
                ok: false,
                message: "you're not avible to delete this event "
            });
        }
        const eventDeleted = await CalendarEvent.findByIdAndDelete(id);
    
        return resp.status(200).json({
            ok: true,
            message:' Event has been deleted success',
            eventDeleted
        })
    } catch (error) {
        resp.status(500).json({
            ok: false,
            message:' Communicate with a system provider',
        })
    }
    
}

module.exports = { getAllCalendarEvents, createNewCalendarEvent, editCalendarEvent, deleteCalendarEvent };
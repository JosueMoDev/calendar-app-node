const { response } = require("express");

const getAllCalendarEvents = (req, resp = response) => { 
    resp.status(200).json({
        ok: true,
        calendar_events: {}
    })
    
}

const createNewCalendarEvent = (req, resp = response) => { 
    const { title, start, end } = req.body;
    resp.status(200).json({
        ok: true,
        message:' Event has been created success',
        calendar_event: {
            title,
            start,
            end
        }
    })
    
}

const editCalendarEvent = (req, resp = response) => { 
    const { id } = req.params
    if ( id ) { 
        const { title, start, end } = req.body;

        return resp.status(200).json({
            ok: true,
            message:' Even has been updated',
            calendar_event: {
                title,
                start,
                end
            }
        })
    }
    console.log('Any evente were provided');
    
}
const deleteCalendarEvent = (req, resp = response) => { 

    const { id } = req.params;

    resp.status(200).json({
        ok: true,
        message:' Even has been deleted',
        calendar_event: {
            id
        }
    })
    
}

module.exports = { getAllCalendarEvents, createNewCalendarEvent, editCalendarEvent, deleteCalendarEvent };
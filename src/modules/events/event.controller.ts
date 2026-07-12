import { Request, Response } from "express";
import Event from "./event.model";
export const createEvent = async (
    req: Request,
  res: Response
) => {
  try {
    const {
      title,
      description,
      category,
      location,
      date,
      price,
      totalTickets,
      image,
    } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      location,
      date,
      price,
      totalTickets,
      availableTickets: totalTickets,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create event",
    });
  }
};

export const getAllEvents = async (
  req: Request,
  res: Response
) => {
  try {
    const events = await Event.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
    });
  }
};

export const deleteEvent = async (
  req: Request,
  res: Response
) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Event deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};


export const getSingleEvent = async (
  req: Request,
  res: Response
) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
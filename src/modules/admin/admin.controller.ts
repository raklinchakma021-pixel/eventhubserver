import { Request, Response } from "express";
import User from "../users/user.model";
import Event from "../events/event.model";
import Ticket from "../tickets/ticket.model";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalTickets = await Ticket.countDocuments();

    const revenue = await Ticket.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: "$price",
          },
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalEvents,
        totalTickets,
        revenue: revenue[0]?.total || 0,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
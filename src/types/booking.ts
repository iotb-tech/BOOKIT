// export interface Booking {
//   id: string;
//   resource_Id: string;
//   user_Id: string;
//   start_Time: Date;
//   end_Time: Date;
//   status: 'string';
//   createdAt: Date;
//   updatedAt: Date;
// }



export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  resource_id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  status: BookingStatus;
  created_at: string;
}

// A booking joined with the resource it was made against, for display purposes.
export interface BookingWithResource extends Booking {
  resource: {
    id: string;
    name: string;
    type: string | null;
  } | null;
}

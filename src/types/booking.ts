export interface Booking {
  id: string;
  resource_Id: string;
  user_Id: string;
  start_Time: Date;
  end_Time: Date;
  status: 'string';
  createdAt: Date;
  updatedAt: Date;
}
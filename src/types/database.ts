export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;

          full_name:
            | string
            | null;

          email:
            | string
            | null;

          role: string;

          avatar_url:
            | string
            | null;

          created_at:
            string;

          updated_at:
            string;
        };

        Insert: {
          id: string;

          full_name?:
            | string
            | null;

          email?:
            | string
            | null;

          role?: string;

          avatar_url?:
            | string
            | null;

          created_at?:
            string;

          updated_at?:
            string;
        };

        Update: {
          full_name?:
            | string
            | null;

          email?:
            | string
            | null;

          role?: string;

          avatar_url?:
            | string
            | null;

          updated_at?:
            string;
        };

        Relationships: [];
      };

      resources: {
        Row: {
          id: string;

          name: string;

          description:
            | string
            | null;

          owner_id:
            string;

          created_at:
            string;

          type:
            | "Mentor"
            | "Study Group"
            | null;

          skills:
            string[];

          duration_minutes:
            | number
            | null;

          status:
            | "available"
            | "unavailable"
            | "maintenance";

          next_available_at:
            | string
            | null;
        };

        Insert: {
          id?: string;

          name: string;

          description?:
            | string
            | null;

          owner_id:
            string;

          created_at?:
            string;

          type?:
            | "Mentor"
            | "Study Group"
            | null;

          skills?:
            string[];

          duration_minutes?:
            | number
            | null;

          status?:
            | "available"
            | "unavailable"
            | "maintenance";

          next_available_at?:
            | string
            | null;
        };

        Update: {
          name?: string;

          description?:
            | string
            | null;

          owner_id?:
            string;

          type?:
            | "Mentor"
            | "Study Group"
            | null;

          skills?:
            string[];

          duration_minutes?:
            | number
            | null;

          status?:
            | "available"
            | "unavailable"
            | "maintenance";

          next_available_at?:
            | string
            | null;
        };

        Relationships: [];
      };

      resource_availability: {
        Row: {
          id: string;

          resource_id:
            string;

          start_time:
            string;

          end_time:
            string;

          status:
            | "available"
            | "booked"
            | "unavailable";

          created_at:
            string;
        };

        Insert: {
          id?: string;

          resource_id:
            string;

          start_time:
            string;

          end_time:
            string;

          status?:
            | "available"
            | "booked"
            | "unavailable";

          created_at?:
            string;
        };

        Update: {
          resource_id?:
            string;

          start_time?:
            string;

          end_time?:
            string;

          status?:
            | "available"
            | "booked"
            | "unavailable";
        };

        Relationships: [];
      };

      bookings: {
        Row: {
          id: string;

          resource_id:
            string;

          user_id:
            string;

          availability_id:
            | string
            | null;

          start_time:
            string;

          end_time:
            string;

          status:
            | "confirmed"
            | "cancelled";

          created_at:
            string;
        };

        Insert: {
          id?: string;

          resource_id:
            string;

          user_id:
            string;

          availability_id?:
            | string
            | null;

          start_time:
            string;

          end_time:
            string;

          status?:
            | "confirmed"
            | "cancelled";

          created_at?:
            string;
        };

        Update: {
          availability_id?:
            | string
            | null;

          status?:
            | "confirmed"
            | "cancelled";

          start_time?:
            string;

          end_time?:
            string;
        };

        Relationships: [];
      };
    };

    Views:
      Record<
        string,
        never
      >;

    Functions: {
      create_booking_from_slot: {
        Args: {
          p_resource_id:
            string;

          p_slot_id:
            string;
        };

        Returns:
          string;
      };

      cancel_booking_and_release_slot: {
        Args: {
          p_booking_id:
            string;
        };

        Returns:
          boolean;
      };
    };

    Enums:
      Record<
        string,
        never
      >;

    CompositeTypes:
      Record<
        string,
        never
      >;
  };
};

export type DataBase =
  Database;
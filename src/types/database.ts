export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          role: string | null;
          avatar_url: string | null;
          created_at: string | null;
          updated_at: string | null;
        };

        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };

        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          role?: string | null;
          avatar_url?: string | null;
          created_at?: string | null;
          updated_at?: string | null;
        };

        Relationships: [];
      };

      resources: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          owner_id: string;
          created_at: string;
        };

        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          owner_id: string;
          created_at?: string;
        };

        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          owner_id?: string;
          created_at?: string;
        };

        Relationships: [];
      };

      bookings: {
        Row: {
          id: string;
          resource_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          status: "confirmed" | "cancelled";
          created_at: string;
        };

        Insert: {
          id?: string;
          resource_id: string;
          user_id: string;
          start_time: string;
          end_time: string;
          status?: "confirmed" | "cancelled";
          created_at?: string;
        };

        Update: {
          id?: string;
          resource_id?: string;
          user_id?: string;
          start_time?: string;
          end_time?: string;
          status?: "confirmed" | "cancelled";
          created_at?: string;
        };

        Relationships: [];
      };
    };

    Views: {};

    Functions: {};

    Enums: {};

    CompositeTypes: {};
  };
};
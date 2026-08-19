export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; full_name: string | null; email: string | null; role: string; avatar_url: string | null; created_at: string; updated_at: string };
        Insert: { id: string; full_name?: string | null; email?: string | null; role?: string; avatar_url?: string | null; created_at?: string; updated_at?: string };
        Update: { full_name?: string | null; email?: string | null; role?: string; avatar_url?: string | null; updated_at?: string };
        Relationships: [];
      };
      resources: {
        Row: { id: string; name: string; description: string | null; owner_id: string; created_at: string; type: "Mentor" | "Study Group" | null; skills: string[]; duration_minutes: number | null; status: "available" | "unavailable" | "maintenance" };
        Insert: { id?: string; name: string; description?: string | null; owner_id: string; created_at?: string; type?: "Mentor" | "Study Group" | null; skills?: string[]; duration_minutes?: number | null; status?: "available" | "unavailable" | "maintenance" };
        Update: { name?: string; description?: string | null; owner_id?: string; type?: "Mentor" | "Study Group" | null; skills?: string[]; duration_minutes?: number | null; status?: "available" | "unavailable" | "maintenance" };
        Relationships: [];
      };
      bookings: {
        Row: { id: string; resource_id: string; user_id: string; start_time: string; end_time: string; status: "confirmed" | "cancelled"; created_at: string };
        Insert: { id?: string; resource_id: string; user_id: string; start_time: string; end_time: string; status?: "confirmed" | "cancelled"; created_at?: string };
        Update: { status?: "confirmed" | "cancelled"; start_time?: string; end_time?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type DataBase = Database;

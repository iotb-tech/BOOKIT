export type DataBase = {
    public: {
        Tables: {
            Profiles:{
          Row:{
             id: string;
          email: string;
          full_name: string | null;
          created_at: string;
          };
          Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          email?: string;
          full_name?: string | null;
        };
        Relationships: [];     
            }
        }
    }
}
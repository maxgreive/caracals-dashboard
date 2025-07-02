export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cars: {
        Row: {
          driver: string | null
          id: string
          seats_available: number | null
          tournament_id: string | null
        }
        Insert: {
          driver?: string | null
          id?: string
          seats_available?: number | null
          tournament_id?: string | null
        }
        Update: {
          driver?: string | null
          id?: string
          seats_available?: number | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cars_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          id: string
          name: string | null
          status: string | null
          tournament_id: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          status?: string | null
          tournament_id?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          status?: string | null
          tournament_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "players_tournament_id_fkey"
            columns: ["tournament_id"]
            isOneToOne: false
            referencedRelation: "tournaments"
            referencedColumns: ["id"]
          },
        ]
      }
      tournaments: {
        Row: {
          division: Database["public"]["Enums"]["division"] | null
          end_date: string | null
          id: string
          location: string | null
          name: string | null
          participants: string[] | null
          participants_f_min: number | null
          participants_m_min: number | null
          start_date: string | null
          status: Database["public"]["Enums"]["status"] | null
          surface: Database["public"]["Enums"]["surface"] | null
          type: Database["public"]["Enums"]["type"] | null
          user: string | null
        }
        Insert: {
          division?: Database["public"]["Enums"]["division"] | null
          end_date?: string | null
          id?: string
          location?: string | null
          name?: string | null
          participants?: string[] | null
          participants_f_min?: number | null
          participants_m_min?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["status"] | null
          surface?: Database["public"]["Enums"]["surface"] | null
          type?: Database["public"]["Enums"]["type"] | null
          user?: string | null
        }
        Update: {
          division?: Database["public"]["Enums"]["division"] | null
          end_date?: string | null
          id?: string
          location?: string | null
          name?: string | null
          participants?: string[] | null
          participants_f_min?: number | null
          participants_m_min?: number | null
          start_date?: string | null
          status?: Database["public"]["Enums"]["status"] | null
          surface?: Database["public"]["Enums"]["surface"] | null
          type?: Database["public"]["Enums"]["type"] | null
          user?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tournaments_user_fkey"
            columns: ["user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string
          email: string | null
          id: string
          profile_image: string | null
          role: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          profile_image?: string | null
          role?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          profile_image?: string | null
          role?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      division:
        | "Mixed"
        | "Women"
        | "Open"
        | "Masters Open"
        | "Masters Women"
        | "Grand Masters Open"
        | "Grand Masters Women"
        | "Juniors"
      status:
        | "not_registered"
        | "waiting"
        | "declined"
        | "cancelled"
        | "approved"
      surface: "Grass/Turf" | "Indoor" | "Beach"
      type: "Uni" | "DFV" | "Fun" | "Hat" | "Training"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      division: [
        "Mixed",
        "Women",
        "Open",
        "Masters Open",
        "Masters Women",
        "Grand Masters Open",
        "Grand Masters Women",
        "Juniors",
      ],
      status: [
        "not_registered",
        "waiting",
        "declined",
        "cancelled",
        "approved",
      ],
      surface: ["Grass/Turf", "Indoor", "Beach"],
      type: ["Uni", "DFV", "Fun", "Hat", "Training"],
    },
  },
} as const

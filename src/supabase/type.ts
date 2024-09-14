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
      font: {
        Row: {
          created_at: string
          id: string
          text: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          text?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          text?: string | null
        }
        Relationships: []
      }
      images: {
        Row: {
          created_at: string
          id: string
          image_url: string | null
          invitation_id: string | null
          layout: string | null
          ratio: number | null
        }
        Insert: {
          created_at?: string
          id?: string
          image_url?: string | null
          invitation_id?: string | null
          layout?: string | null
          ratio?: number | null
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string | null
          invitation_id?: string | null
          layout?: string | null
          ratio?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "images_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitation"
            referencedColumns: ["id"]
          },
        ]
      }
      interval: {
        Row: {
          created_at: string
          id: string
          size: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          size?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          size?: string | null
        }
        Relationships: []
      }
      invitation: {
        Row: {
          background_image: string | null
          created_at: string | null
          custom_url: string
          date: string | null
          id: string
          post_number: string | null
          primary_image: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          background_image?: string | null
          created_at?: string | null
          custom_url: string
          date?: string | null
          id?: string
          post_number?: string | null
          primary_image?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          background_image?: string | null
          created_at?: string | null
          custom_url?: string
          date?: string | null
          id?: string
          post_number?: string | null
          primary_image?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      map: {
        Row: {
          created_at: string
          detail_address: string | null
          id: number
          main_address: string | null
        }
        Insert: {
          created_at?: string
          detail_address?: string | null
          id?: number
          main_address?: string | null
        }
        Update: {
          created_at?: string
          detail_address?: string | null
          id?: number
          main_address?: string | null
        }
        Relationships: []
      }
      text: {
        Row: {
          created_at: string
          font_size: number | null
          font_type: string | null
          id: number
          invitation_id: string | null
          layout: string | null
          text: string | null
        }
        Insert: {
          created_at?: string
          font_size?: number | null
          font_type?: string | null
          id?: number
          invitation_id?: string | null
          layout?: string | null
          text?: string | null
        }
        Update: {
          created_at?: string
          font_size?: number | null
          font_type?: string | null
          id?: number
          invitation_id?: string | null
          layout?: string | null
          text?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "text_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitation"
            referencedColumns: ["id"]
          },
        ]
      }
      userinfo: {
        Row: {
          email: string | null
          id: string
          image_url: string | null
          message: string | null
          username: string | null
        }
        Insert: {
          email?: string | null
          id: string
          image_url?: string | null
          message?: string | null
          username?: string | null
        }
        Update: {
          email?: string | null
          id?: string
          image_url?: string | null
          message?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "userinfo_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      videos: {
        Row: {
          created_at: string
          id: string
          invitation_id: string
          ratio: number | null
          video_url: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          invitation_id: string
          ratio?: number | null
          video_url?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          invitation_id?: string
          ratio?: number | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "videos_invitation_id_fkey"
            columns: ["invitation_id"]
            isOneToOne: false
            referencedRelation: "invitation"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

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
      cellars: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      grapes: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string
          id: number
          name: string
          style: Json | null
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          style?: Json | null
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          style?: Json | null
        }
        Relationships: []
      }
      types: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      wines: {
        Row: {
          active: boolean
          cellar_id: number
          country_id: number
          created_at: string
          description: string
          grapes: number[] | null
          id: number
          name: string
          photo_size: Json | null
          photo_url: string | null
          price: number
          tags: number[] | null
          type_id: number
          updated_at: string
          year: number
          zone_id: number
        }
        Insert: {
          active?: boolean
          cellar_id: number
          country_id: number
          created_at?: string
          description: string
          grapes?: number[] | null
          id?: number
          name: string
          photo_size?: Json | null
          photo_url?: string | null
          price: number
          tags?: number[] | null
          type_id: number
          updated_at?: string
          year: number
          zone_id: number
        }
        Update: {
          active?: boolean
          cellar_id?: number
          country_id?: number
          created_at?: string
          description?: string
          grapes?: number[] | null
          id?: number
          name?: string
          photo_size?: Json | null
          photo_url?: string | null
          price?: number
          tags?: number[] | null
          type_id?: number
          updated_at?: string
          year?: number
          zone_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_wines_cellar_id_fkey"
            columns: ["cellar_id"]
            isOneToOne: false
            referencedRelation: "cellars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_wines_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_wines_region_id_fkey"
            columns: ["zone_id"]
            isOneToOne: false
            referencedRelation: "zones"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_wines_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "types"
            referencedColumns: ["id"]
          }
        ]
      }
      wines_grapes: {
        Row: {
          created_at: string
          grape_id: number
          wine_id: number
        }
        Insert: {
          created_at?: string
          grape_id: number
          wine_id: number
        }
        Update: {
          created_at?: string
          grape_id?: number
          wine_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_wines_grapes_grape_id_fkey"
            columns: ["grape_id"]
            isOneToOne: false
            referencedRelation: "grapes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_wines_grapes_wine_id_fkey"
            columns: ["wine_id"]
            isOneToOne: false
            referencedRelation: "wines"
            referencedColumns: ["id"]
          }
        ]
      }
      wines_tags: {
        Row: {
          created_at: string
          tag_id: number
          wine_id: number
        }
        Insert: {
          created_at?: string
          tag_id: number
          wine_id: number
        }
        Update: {
          created_at?: string
          tag_id?: number
          wine_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_wines_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_wines_tags_wine_id_fkey"
            columns: ["wine_id"]
            isOneToOne: false
            referencedRelation: "wines"
            referencedColumns: ["id"]
          }
        ]
      }
      zones: {
        Row: {
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

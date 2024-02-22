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
      apellations: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          region_id: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          region_id?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          region_id?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_apellation_region_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
        ]
      }
      cellars: {
        Row: {
          apellation_id: number | null
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string | null
        }
        Insert: {
          apellation_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string | null
        }
        Update: {
          apellation_id?: number | null
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "public_cellar_apellation_id_fkey"
            columns: ["apellation_id"]
            isOneToOne: false
            referencedRelation: "apellations"
            referencedColumns: ["id"]
          }
        ]
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
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      pairings: {
        Row: {
          created_at: string
          description: string | null
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      regions: {
        Row: {
          country: number | null
          created_at: string
          id: number
          name: string
          updated_at: string
        }
        Insert: {
          country?: number | null
          created_at?: string
          id?: number
          name: string
          updated_at?: string
        }
        Update: {
          country?: number | null
          created_at?: string
          id?: number
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_regions_country_fkey"
            columns: ["country"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          }
        ]
      }
      wines: {
        Row: {
          active: boolean
          apellation_id: number | null
          cellar_id: number | null
          country_id: number | null
          created_at: string
          description: string | null
          grapes: number[]
          id: number
          name: string
          new: boolean
          pairings_id: number[] | null
          photo_size: Json | null
          photo_url: string | null
          price: number
          region_id: number | null
          tags: string[] | null
          updated_at: string
          year: number
        }
        Insert: {
          active?: boolean
          apellation_id?: number | null
          cellar_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          grapes: number[]
          id?: number
          name: string
          new?: boolean
          pairings_id?: number[] | null
          photo_size?: Json | null
          photo_url?: string | null
          price: number
          region_id?: number | null
          tags?: string[] | null
          updated_at?: string
          year: number
        }
        Update: {
          active?: boolean
          apellation_id?: number | null
          cellar_id?: number | null
          country_id?: number | null
          created_at?: string
          description?: string | null
          grapes?: number[]
          id?: number
          name?: string
          new?: boolean
          pairings_id?: number[] | null
          photo_size?: Json | null
          photo_url?: string | null
          price?: number
          region_id?: number | null
          tags?: string[] | null
          updated_at?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_wines_apellation_id_fkey"
            columns: ["apellation_id"]
            isOneToOne: false
            referencedRelation: "apellations"
            referencedColumns: ["id"]
          },
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
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          }
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

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_insights_cache: {
        Row: {
          calculator_slug: string
          created_at: string
          expires_at: string
          id: string
          inputs_hash: string
          insight_text: string
          module_icon: string
          module_name: string
          region: string
          user_id: string | null
        }
        Insert: {
          calculator_slug: string
          created_at?: string
          expires_at?: string
          id?: string
          inputs_hash: string
          insight_text: string
          module_icon: string
          module_name: string
          region?: string
          user_id?: string | null
        }
        Update: {
          calculator_slug?: string
          created_at?: string
          expires_at?: string
          id?: string
          inputs_hash?: string
          insight_text?: string
          module_icon?: string
          module_name?: string
          region?: string
          user_id?: string | null
        }
        Relationships: []
      }
      ai_sessions: {
        Row: {
          created_at: string
          id: string
          message_history: Json
          mode: string
          session_id: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          message_history?: Json
          mode?: string
          session_id: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          message_history?: Json
          mode?: string
          session_id?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      analytics_logs: {
        Row: {
          calculator_slug: string | null
          created_at: string | null
          event_type: string
          id: number
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          calculator_slug?: string | null
          created_at?: string | null
          event_type: string
          id?: number
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          calculator_slug?: string | null
          created_at?: string | null
          event_type?: string
          id?: number
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category: string | null
          content_html: string
          content_json: Json | null
          cover_image: string | null
          created_at: string
          excerpt: string | null
          id: string
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id?: string | null
          category?: string | null
          content_html?: string
          content_json?: Json | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string | null
          category?: string | null
          content_html?: string
          content_json?: Json | null
          cover_image?: string | null
          created_at?: string
          excerpt?: string | null
          id?: string
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      calculator_history: {
        Row: {
          calculator_slug: string
          created_at: string | null
          id: number
          input_data: Json | null
          result_data: Json | null
          user_id: string
        }
        Insert: {
          calculator_slug: string
          created_at?: string | null
          id?: number
          input_data?: Json | null
          result_data?: Json | null
          user_id: string
        }
        Update: {
          calculator_slug?: string
          created_at?: string | null
          id?: number
          input_data?: Json | null
          result_data?: Json | null
          user_id?: string
        }
        Relationships: []
      }
      calculators_cms: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          definition: Json | null
          description: string | null
          icon: string | null
          id: string
          is_custom: boolean
          keywords: string[] | null
          name: string
          seo_content_html: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          definition?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean
          keywords?: string[] | null
          name: string
          seo_content_html?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          definition?: Json | null
          description?: string | null
          icon?: string | null
          id?: string
          is_custom?: boolean
          keywords?: string[] | null
          name?: string
          seo_content_html?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          email: string
          id: number
          message: string
          name: string | null
          submitted_at: string | null
        }
        Insert: {
          email: string
          id?: number
          message: string
          name?: string | null
          submitted_at?: string | null
        }
        Update: {
          email?: string
          id?: number
          message?: string
          name?: string | null
          submitted_at?: string | null
        }
        Relationships: []
      }
      faq_items: {
        Row: {
          answer_html: string
          category: string | null
          created_at: string
          id: string
          is_active: boolean
          page_key: string
          question: string
          sort_order: number
          updated_at: string
        }
        Insert: {
          answer_html: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          page_key?: string
          question: string
          sort_order?: number
          updated_at?: string
        }
        Update: {
          answer_html?: string
          category?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          page_key?: string
          question?: string
          sort_order?: number
          updated_at?: string
        }
        Relationships: []
      }
      favorites: {
        Row: {
          calculator_slug: string
          created_at: string | null
          id: number
          user_id: string
        }
        Insert: {
          calculator_slug: string
          created_at?: string | null
          id?: number
          user_id: string
        }
        Update: {
          calculator_slug?: string
          created_at?: string | null
          id?: number
          user_id?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          email_hash: string | null
          id: string
          is_active: boolean
          subscribed_at: string
        }
        Insert: {
          email: string
          email_hash?: string | null
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Update: {
          email?: string
          email_hash?: string | null
          id?: string
          is_active?: boolean
          subscribed_at?: string
        }
        Relationships: []
      }
      page_content: {
        Row: {
          block_key: string
          created_at: string
          id: string
          page_key: string
          updated_at: string
          updated_by: string | null
          value_html: string | null
          value_text: string | null
        }
        Insert: {
          block_key: string
          created_at?: string
          id?: string
          page_key: string
          updated_at?: string
          updated_by?: string | null
          value_html?: string | null
          value_text?: string | null
        }
        Update: {
          block_key?: string
          created_at?: string
          id?: string
          page_key?: string
          updated_at?: string
          updated_by?: string | null
          value_html?: string | null
          value_text?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_exists: { Args: never; Returns: boolean }
      assign_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
      claim_first_admin: { Args: never; Returns: boolean }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_editor_or_admin: { Args: { _user_id: string }; Returns: boolean }
      revoke_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user: string
        }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user" | "editor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user", "editor"],
    },
  },
} as const

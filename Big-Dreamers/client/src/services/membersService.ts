import { supabase } from "@/lib/supabase";

export type Member = {
  id: string;
  full_name: string;
  role: string;
  description: string;
  photo_url: string;
  whatsapp: string;
  email: string;
  professional_link: string;
};

export const getMembers = async (categoryName: string): Promise<Member[]> => {
  const { data, error } = await supabase.functions.invoke("members", {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: { 
        category_name: categoryName
     },
  });

  if (error) {
    throw new Error("Error al obtener los miembros");
  }

  return data?.team_members ?? [];
};

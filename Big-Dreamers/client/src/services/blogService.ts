import { supabase } from "@/lib/supabase";

export type Post = {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  created_at: string;
};

export type PostFormPayload = {
  title: string;
  description: string;
  imageFile?: File | null;
};

export async function getBlogPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data ?? [];
}

export async function uploadBlogImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop() || "jpg";
  const fileName = `${Date.now()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("blog-images")
    .upload(fileName, file, { cacheControl: "3600", upsert: false });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const { data } = supabase.storage.from("blog-images").getPublicUrl(fileName);

  if (!data?.publicUrl) {
    throw new Error("No se pudo obtener la URL pública de la imagen.");
  }

  return data.publicUrl;
}

export async function createBlogPost(payload: PostFormPayload) {
  const image_url = payload.imageFile
    ? await uploadBlogImage(payload.imageFile)
    : null;

  const { error } = await supabase.from("blog_posts").insert([
    {
      title: payload.title.trim(),
      description: payload.description.trim(),
      image_url,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
}

export type TeamMemberFormPayload = {
  full_name: string;
  role: string;
  description: string;
  photo_url: string;
  whatsapp: string;
  email: string;
  professional_link: string;
  category_name: string;
};

export async function getTeamCategories(): Promise<string[]> {
  const { data, error } = await supabase.from("team_categories").select("name");

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => row.name);
}

export async function createTeamMember(payload: TeamMemberFormPayload) {

  const { error } = await supabase.functions.invoke(
    "create-team-member",
    {
      body: {
        full_name: payload.full_name,
        role: payload.role,
        description: payload.description,
        photo_url: payload.photo_url,
        whatsapp: payload.whatsapp,
        email: payload.email,
        professional_link: payload.professional_link,
        category_name: payload.category_name,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
    },
  );

  if (error) {
    throw new Error(error.message);
  }
}

export async function deleteBlogPost(postId: string) {
  const { error } = await supabase.from("blog_posts").delete().eq("id", postId);

  if (error) {
    throw new Error(error.message);
  }
}

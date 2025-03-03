import { createServerClient } from "@/utils/supabase/server";


export default async function Notes() {
  const supabase = createServerClient();
  const { data: notes, error } = await supabase.from("notes").select();

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return <pre>{JSON.stringify(notes, null, 2)}</pre>;
}

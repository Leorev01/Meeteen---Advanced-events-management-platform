import {supabase} from "@/lib/supabase"

export async function POST(request: Request) {
    const {userId, action, metadata} = await request.json()
    try{
        const logActivity = async (userId: string, action: string, metadata: object = {}) => {
            const { error } = await supabase.from("user_activities").insert({
              user_id: userId,
              action: action,
              metadata: metadata,
            });
          
            if (error) {
              console.error("Error logging activity:", error);
            }
          };
          
          // Example usage after a user logs in
          logActivity(userId, action, metadata)
          return new Response(JSON.stringify({message: "Activity logged successfully"}), {status: 200});
    }catch(error){
        console.error("Error logging activity:", error);
        return new Response(JSON.stringify({error: "Failed to log activity"}), {status: 500});
    }
}
'use client'
import { useParams } from "next/navigation"
import EventsChat from "@/components/Events/EventsChat"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

const ChatIdPage = () => {

    const { chatId } = useParams()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error || !data?.user) {
                console.error("Error fetching user:", error);
                return;
            }
            setUser(data.user);
        };
        fetchUser();
    }, []);



  return (
    <>
      <EventsChat eventId={chatId} user={user}/>
    </>
  )
}

export default ChatIdPage
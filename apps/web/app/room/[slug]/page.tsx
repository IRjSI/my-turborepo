import axios from "axios";
import { BACKEND_URL } from "../../config";
import { ChatRoom } from "../../../component/ChatRoom";

async function getRoom(slug: string) {
    const response = await axios.get(`${BACKEND_URL}/room/${slug}`);
    return response.data.room.id;
}

export default async function chatRoom({ params }: { params: { slug: string }}) {
    const slug = params.slug;
    const roomId = await getRoom(slug);

    return (
        <ChatRoom id={roomId} />
    )
}
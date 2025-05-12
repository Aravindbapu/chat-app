import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})
    const [isLoadingUsers, setIsLoadingUsers] = useState(false);
    const [isLoadingMessages, setIsLoadingMessages] = useState(false);

    const {socket, axios} = useContext(AuthContext);

    //function to get users for sidebar
    const getUsers = async ()=>{
        setIsLoadingUsers(true);
        try {
            const {data} = await axios.get("/api/messages/users");
            if(data.success){
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
                toast.success("User list loaded!");
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoadingUsers(false);
        }
    }

    //function to get messages for selected user
    const getMessages = async (userId)=>{
        setIsLoadingMessages(true);
        try {
            const { data } = await axios.get(`/api/messages/${userId}`); // <-- fix endpoint
            if(data.success){
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setIsLoadingMessages(false);
        }
    }

    //function to send message to selected user
    const sendMessage = async (messageData)=>{
        try {
            if (!selectedUser || !selectedUser._id) {
                toast.error("No user selected");
                return;
            }
            // The correct endpoint is /api/messages/send (no :id in URL), receiverId in body
            const { data } = await axios.post(`/api/messages/send`, { ...messageData, receiverId: selectedUser._id });
            if(data.success){
                setMessages((prevMessages) => [...prevMessages, data.message])
                toast.success("Message sent!");
            }else{
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if(!socket) return;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser && newMessage.senderId === selectedUser._id){
                newMessage.seen = true;
                setMessages((prevMessages)=> [...prevMessages, newMessage]);
                axios.put(`/api/message/mark/${newMessage._id}`);
                
            }else{
                setUnseenMessages((preUnseenMessages)=> ({...prevUnseenMessages, [newMessage.senderId]: preUnseenMessages[newMessage.senderId] ? preUnseenMessages[newMessage.senderId] + 1 : 1}))
            }
        })
    }
    //function to unsubcribe from messages
    const unsubscribeFromMessages = () => {
        if(socket) socket.off("newMessage");
    }

    useEffect(()=>{
        subscribeToMessages();
        return ()=> unsubscribeFromMessages();

    }, [socket, selectedUser])

    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages,
        isLoadingUsers, isLoadingMessages
    }

    return (
        <ChatContext.Provider value={value}>
        {children}
        </ChatContext.Provider>
    )
}
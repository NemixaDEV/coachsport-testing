import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { allUsers, messages } from '@/data/mockData';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function MessagesScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Obtener conversaciones únicas para el usuario actual
  const conversations = useMemo(() => {
    if (!user) return [];
    
    // Filtrar mensajes donde el usuario es remitente o destinatario
    const userMessages = messages.filter(
      m => m.fromId === user.id || m.toId === user.id
    );
    
    // Agrupar por interlocutor
    const conversationMap = new Map<string, typeof messages>();
    
    userMessages.forEach(message => {
      const otherUserId = message.fromId === user.id ? message.toId : message.fromId;
      
      if (!conversationMap.has(otherUserId)) {
        conversationMap.set(otherUserId, []);
      }
      conversationMap.get(otherUserId)?.push(message);
    });
    
    // Crear array de conversaciones con último mensaje y usuario
    return Array.from(conversationMap.entries()).map(([userId, msgs]) => {
      const sortedMsgs = msgs.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      const lastMessage = sortedMsgs[0];
      const otherUser = allUsers.find(u => u.id === userId);
      const unreadCount = msgs.filter(m => !m.read && m.toId === user.id).length;
      
      return {
        user: otherUser,
        lastMessage,
        unreadCount,
      };
    }).sort((a, b) => 
      new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()
    );
  }, [user]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return messageDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) { // 7 días
      return messageDate.toLocaleDateString('es-ES', { weekday: 'short' });
    } else {
      return messageDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
    }
  };

  const truncateMessage = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Mensajes</h1>
        {conversations.length > 0 && (
          <p className="text-muted-foreground text-sm mt-2">
            {conversations.reduce((acc, conv) => acc + conv.unreadCount, 0)} mensajes sin leer
          </p>
        )}
      </div>

      <div className="px-6 pb-6 space-y-3">
        {conversations.length > 0 ? (
          conversations.map((conversation) => (
            <Card 
              key={conversation.user?.id}
              className="cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => navigate(`/conversation/${conversation.user?.id}`)}
            >
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-medium-jungle to-dark-jungle rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg font-bold">
                      {conversation.user?.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {conversation.unreadCount}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contenido del mensaje */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <p className="text-foreground font-semibold">
                      {conversation.user?.name}
                    </p>
                    <span className="text-muted-foreground text-xs flex-shrink-0">
                      {formatTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>
                  
                  <p className={`text-sm ${
                    conversation.unreadCount > 0 
                      ? 'text-foreground font-medium' 
                      : 'text-muted-foreground'
                  }`}>
                    {conversation.lastMessage.fromId === user?.id && (
                      <span className="mr-1">Tú: </span>
                    )}
                    {truncateMessage(conversation.lastMessage.content)}
                  </p>
                  
                  {conversation.user?.role && (
                    <div className="flex items-center gap-1 mt-1">
                      <MessageCircle size={12} className="text-medium-jungle" />
                      <span className="text-xs text-medium-jungle">
                        {conversation.user.role === 'trainer' || conversation.user.isTrainer 
                          ? 'Entrenador' 
                          : 'Cliente'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card>
            <div className="text-center py-8">
              <MessageCircle size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No tienes mensajes</p>
              <p className="text-muted-foreground text-sm mt-2">
                Los mensajes con tu entrenador aparecerán aquí
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

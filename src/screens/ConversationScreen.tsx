import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { allUsers, messages } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Send } from 'lucide-react';
import { useMemo, useState } from 'react';

export default function ConversationScreen() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  
  // Obtener el otro usuario
  const otherUser = useMemo(() => 
    allUsers.find(u => u.id === userId),
    [userId]
  );
  
  // Obtener mensajes de esta conversación
  const conversationMessages = useMemo(() => {
    if (!user || !userId) return [];
    
    return messages
      .filter(m => 
        (m.fromId === user.id && m.toId === userId) ||
        (m.fromId === userId && m.toId === user.id)
      )
      .sort((a, b) => 
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
  }, [user, userId]);
  
  const formatTime = (date: Date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (date: Date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (messageDate.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return messageDate.toLocaleDateString('es-ES', { 
        day: 'numeric', 
        month: 'long',
        year: messageDate.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
      });
    }
  };
  
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // TODO: Implementar envío real de mensaje
      console.log('Enviando mensaje:', newMessage);
      setNewMessage('');
    }
  };
  
  // Agrupar mensajes por fecha
  const groupedMessages = useMemo(() => {
    const groups: { date: string; messages: typeof conversationMessages }[] = [];
    
    conversationMessages.forEach(msg => {
      const dateStr = formatDate(msg.timestamp);
      const existingGroup = groups.find(g => g.date === dateStr);
      
      if (existingGroup) {
        existingGroup.messages.push(msg);
      } else {
        groups.push({ date: dateStr, messages: [msg] });
      }
    });
    
    return groups;
  }, [conversationMessages]);

  if (!otherUser) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Usuario no encontrado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-background" style={{ height: 'calc(100vh - 80px)' }}>
      {/* Header - Fijo arriba */}
      <div className="bg-background pt-12 pb-4 px-6 border-b border-border flex-shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft size={24} className="text-foreground" />
          </button>
          
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-medium-jungle to-dark-jungle rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {otherUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-foreground font-semibold">{otherUser.name}</p>
              <p className="text-muted-foreground text-xs">
                {otherUser.role === 'trainer' || otherUser.isTrainer 
                  ? 'Entrenador' 
                  : 'Cliente'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area - Scrollable */}
      <div className="flex-1 overflow-y-auto px-6 py-4 pb-40 space-y-6 overscroll-contain">
        {groupedMessages.length > 0 ? (
          groupedMessages.map((group, groupIdx) => (
            <div key={groupIdx}>
              {/* Date Separator */}
              <div className="flex justify-center mb-4">
                <span className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground">
                  {group.date}
                </span>
              </div>
              
              {/* Messages */}
              <div className="space-y-3">
                {group.messages.map((message) => {
                  const isCurrentUser = message.fromId === user?.id;
                  
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[75%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isCurrentUser
                              ? 'bg-medium-jungle text-white'
                              : 'bg-muted text-foreground'
                          }`}
                        >
                          <p className="text-sm break-words">{message.content}</p>
                        </div>
                        <div className="px-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {formatTime(message.timestamp)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
              <span className="text-foreground text-2xl font-bold">
                {otherUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <p className="text-foreground font-semibold mb-2">
              Inicia una conversación con {otherUser.name}
            </p>
            <p className="text-muted-foreground text-sm">
              Envía un mensaje para comenzar
            </p>
          </div>
        )}
      </div>

      {/* Input Area - Fijo abajo */}
      <div className="bg-background border-t border-border px-6 py-4 flex-shrink-0 fixed bottom-20 left-0 right-0 z-20">
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              className="w-full bg-muted text-foreground rounded-2xl px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-medium-jungle min-h-[44px] max-h-[120px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="rounded-full w-11 h-11 p-0 flex items-center justify-center flex-shrink-0"
          >
            <Send size={20} />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}

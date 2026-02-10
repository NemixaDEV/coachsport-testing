import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Mail } from 'lucide-react';

export default function HelpScreen() {
  const navigate = useNavigate();

  const faqs = [
    {
      question: '¿Cómo inicio mi primer entrenamiento?',
      answer: 'Ve a la pestaña Rutinas, selecciona tu rutina activa y presiona "Iniciar Entrenamiento".',
    },
    {
      question: '¿Puedo cambiar mi rutina?',
      answer: 'Contacta con tu entrenador a través de la sección de mensajes para solicitar cambios.',
    },
    {
      question: '¿Cómo registro mi progreso?',
      answer: 'El progreso se registra automáticamente cuando completas entrenamientos. Puedes verlo en la pestaña Progreso.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Ayuda y Soporte</h1>
      </div>

      <div className="px-6 pb-6">
        <h2 className="text-foreground text-lg font-semibold mb-4">Preguntas Frecuentes</h2>
        {faqs.map((faq, idx) => (
          <Card key={idx} className="mb-4">
            <p className="text-foreground font-semibold mb-2">{faq.question}</p>
            <p className="text-muted-foreground text-sm">{faq.answer}</p>
          </Card>
        ))}

        <Card className="mb-4">
          <div className="flex items-center">
            <Mail size={24} className="text-muted-foreground mr-4" />
            <div className="flex-1">
              <p className="text-foreground font-semibold">Contactar Soporte</p>
              <p className="text-muted-foreground text-sm">soporte@coachsport.dev</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Shield, FileText, Database } from 'lucide-react';

export default function PrivacyScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Privacidad</h1>
      </div>

      <div className="px-6 pb-6">
        {/* Política de Privacidad */}
        <Card className="mb-4">
          <div className="flex items-start mb-3">
            <Shield size={24} className="text-muted-foreground mr-4 mt-1" />
            <div className="flex-1">
              <h2 className="text-foreground text-lg font-semibold mb-2">Política de Privacidad</h2>
              <div className="text-muted-foreground text-sm space-y-2">
                <p>
                  En CoachSport, nos comprometemos a proteger tu privacidad y la seguridad de tus datos personales.
                  Esta política describe cómo recopilamos, usamos y protegemos tu información.
                </p>
                <p>
                  <strong className="text-foreground">Información que recopilamos:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Datos de registro (nombre, email, fecha de nacimiento)</li>
                  <li>Información de perfil (foto, objetivos de entrenamiento)</li>
                  <li>Datos de entrenamiento (rutinas, progreso, mediciones)</li>
                  <li>Información de dispositivo y uso de la aplicación</li>
                </ul>
                <p>
                  <strong className="text-foreground">Uso de la información:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Proporcionar y mejorar nuestros servicios</li>
                  <li>Personalizar tu experiencia de entrenamiento</li>
                  <li>Comunicarnos contigo sobre tu cuenta y servicios</li>
                  <li>Analizar el uso de la aplicación para mejoras</li>
                </ul>
                <p>
                  <strong className="text-foreground">Compartir información:</strong>
                </p>
                <p>
                  Solo compartimos tu información con tu entrenador asignado y con tu consentimiento explícito.
                  No vendemos ni alquilamos tus datos personales a terceros.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Términos y Condiciones */}
        <Card className="mb-4">
          <div className="flex items-start mb-3">
            <FileText size={24} className="text-muted-foreground mr-4 mt-1" />
            <div className="flex-1">
              <h2 className="text-foreground text-lg font-semibold mb-2">Términos y Condiciones</h2>
              <div className="text-muted-foreground text-sm space-y-2">
                <p>
                  Al usar CoachSport, aceptas los siguientes términos y condiciones de uso.
                </p>
                <p>
                  <strong className="text-foreground">Uso de la aplicación:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Debes ser mayor de 18 años o tener consentimiento de un tutor</li>
                  <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
                  <li>No debes compartir tu cuenta con terceros</li>
                  <li>Debes proporcionar información precisa y actualizada</li>
                </ul>
                <p>
                  <strong className="text-foreground">Responsabilidades:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Consultar con un profesional de la salud antes de comenzar cualquier programa de entrenamiento</li>
                  <li>Usar la aplicación de manera responsable y segura</li>
                  <li>No usar la aplicación para fines ilegales o no autorizados</li>
                </ul>
                <p>
                  <strong className="text-foreground">Limitación de responsabilidad:</strong>
                </p>
                <p>
                  CoachSport no se hace responsable de lesiones o daños resultantes del uso de las rutinas de entrenamiento.
                  Siempre consulta con un profesional médico antes de comenzar cualquier programa de ejercicio.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Cómo se manejan los datos personales */}
        <Card className="mb-4">
          <div className="flex items-start mb-3">
            <Database size={24} className="text-muted-foreground mr-4 mt-1" />
            <div className="flex-1">
              <h2 className="text-foreground text-lg font-semibold mb-2">Cómo se manejan los datos personales</h2>
              <div className="text-muted-foreground text-sm space-y-2">
                <p>
                  <strong className="text-foreground">Almacenamiento y seguridad:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Tus datos se almacenan en servidores seguros con encriptación SSL</li>
                  <li>Utilizamos medidas de seguridad técnicas y organizativas para proteger tu información</li>
                  <li>Realizamos copias de seguridad regulares de los datos</li>
                  <li>Acceso restringido solo a personal autorizado</li>
                </ul>
                <p>
                  <strong className="text-foreground">Retención de datos:</strong>
                </p>
                <p>
                  Conservamos tus datos personales mientras tu cuenta esté activa o según sea necesario para
                  proporcionar nuestros servicios. Puedes solicitar la eliminación de tus datos en cualquier momento.
                </p>
                <p>
                  <strong className="text-foreground">Tus derechos:</strong>
                </p>
                <ul className="list-disc list-inside ml-2 space-y-1">
                  <li>Acceder a tus datos personales</li>
                  <li>Rectificar información incorrecta</li>
                  <li>Solicitar la eliminación de tus datos</li>
                  <li>Oponerte al procesamiento de tus datos</li>
                  <li>Exportar tus datos en formato legible</li>
                </ul>
                <p>
                  <strong className="text-foreground">Contacto:</strong>
                </p>
                <p>
                  Para ejercer tus derechos o hacer preguntas sobre el manejo de tus datos, contacta a:
                  privacidad@coachsport.dev
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

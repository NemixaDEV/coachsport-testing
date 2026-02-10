import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/Card';
import { ArrowLeft, Info, Code, ExternalLink } from 'lucide-react';

export default function AboutScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-background pt-12 pb-6 px-6">
        <button onClick={() => navigate(-1)} className="mb-4">
          <ArrowLeft size={24} className="text-foreground" />
        </button>
        <h1 className="text-foreground text-2xl font-bold">Acerca de</h1>
      </div>

      <div className="px-6 pb-6">
        {/* Versión de la app */}
        <Card className="mb-4">
          <div className="flex items-start mb-3">
            <Info size={24} className="text-muted-foreground mr-4 mt-1" />
            <div className="flex-1">
              <h2 className="text-foreground text-lg font-semibold mb-2">Versión de la app</h2>
              <p className="text-muted-foreground text-sm">
                CoachSport v1.0.0
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Última actualización: Febrero 2026
              </p>
            </div>
          </div>
        </Card>

        {/* Información del desarrollador */}
        <Card className="mb-4">
          <div className="flex items-start mb-3">
            <Code size={24} className="text-muted-foreground mr-4 mt-1" />
            <div className="flex-1">
              <h2 className="text-foreground text-lg font-semibold mb-2">Información del desarrollador</h2>
              <div className="text-muted-foreground text-sm space-y-2">
                <p>
                  <strong className="text-foreground">Desarrollador:</strong> Nemixa
                </p>
                <p>
                  CoachSport es una aplicación desarrollada con pasión para ayudarte a alcanzar tus objetivos de fitness.
                </p>
                <a
                  href="https://nemixa.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-secondary hover:opacity-80 transition-opacity mt-3"
                >
                  <span className="mr-2">Visitar nemixa.dev</span>
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

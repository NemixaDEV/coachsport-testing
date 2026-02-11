import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { useTheme } from '@/hooks/useTheme';
import { images } from '@/constants/images';

type ContactType = 'technical' | 'feedback' | 'comment' | 'other';
type RecipientType = 'admin' | 'developers';

const CONTACT_TYPES: { value: ContactType; label: string }[] = [
    { value: 'technical', label: 'Problema técnico' },
    { value: 'feedback', label: 'Feedback o sugerencia' },
    { value: 'comment', label: 'Comentario' },
    { value: 'other', label: 'Otro' },
];

const RECIPIENT_TYPES: { value: RecipientType; label: string; description: string }[] = [
    { value: 'admin', label: 'Administrador del negocio', description: 'Para consultas sobre servicios, suscripciones, entrenadores, etc.' },
    { value: 'developers', label: 'Desarrolladores de la aplicación', description: 'Para reportar bugs, problemas técnicos, mejoras, etc.' },
];

export default function ContactScreen() {
    const navigate = useNavigate();
    const { isDarkMode } = useTheme();
    const [email, setEmail] = useState('');
    const [recipientType, setRecipientType] = useState<RecipientType | ''>('');
    const [contactType, setContactType] = useState<ContactType | ''>('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !recipientType || !contactType || !message.trim()) {
            setError('Por favor completa todos los campos');
            return;
        }

        // Validar formato de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Por favor ingresa un email válido');
            return;
        }

        if (message.trim().length < 10) {
            setError('El mensaje debe tener al menos 10 caracteres');
            return;
        }

        setLoading(true);
        setError('');

        try {
            // Simular envío de mensaje
            // En una aplicación real, aquí se haría una llamada a la API
            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccess(true);
        } catch (err) {
            setError('Error al enviar el mensaje. Por favor intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-6">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-12">
                        <img
                            src={isDarkMode ? images.logoLetrasRojasFondoTransp : images.logoLetrasDegradadoFondoTransp}
                            alt="CoachSport Logo"
                            className="mb-4 mx-auto max-w-xs"
                        />
                    </div>

                    {/* Mensaje de éxito */}
                    <div className="text-center mb-6">
                        <div className="mb-4">
                            <span className="text-5xl">✅</span>
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">
                            Mensaje enviado
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Hemos recibido tu mensaje para <strong className="text-foreground">
                                {recipientType === 'admin' ? 'el administrador del negocio' : 'los desarrolladores de la aplicación'}
                            </strong>. Nos pondremos en contacto contigo a la brevedad posible en <strong className="text-foreground">{email}</strong>.
                        </p>
                        <p className="text-sm text-muted-foreground mb-6">
                            Gracias por contactarnos.
                        </p>
                        <Button
                            onClick={() => navigate('/login')}
                            className="w-full mb-4"
                        >
                            Volver al inicio de sesión
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-12">
                    <img
                        src={isDarkMode ? images.logoLetrasRojasFondoTransp : images.logoLetrasDegradadoFondoTransp}
                        alt="CoachSport Logo"
                        className="mb-4 mx-auto max-w-xs"
                    />
                    <p className="text-muted-foreground">Contáctanos</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="mb-6">
                    <p className="text-muted-foreground text-sm mb-6">
                        Envíanos un mensaje si tienes algún problema, sugerencia o comentario. Estaremos encantados de ayudarte.
                    </p>

                    <Input
                        label="Email"
                        type="email"
                        placeholder="tu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <div>
                        <CustomSelect
                            label="Enviar mensaje a"
                            options={RECIPIENT_TYPES.map(r => ({ value: r.value, label: r.label }))}
                            value={recipientType}
                            onChange={(value) => setRecipientType(value as RecipientType)}
                            placeholder="Elegir destinatario"
                            required
                        />
                        {recipientType && (
                            <p className="text-muted-foreground text-xs mt-1 mb-4">
                                {RECIPIENT_TYPES.find(r => r.value === recipientType)?.description}
                            </p>
                        )}
                    </div>

                    <CustomSelect
                        label="Tipo de consulta"
                        options={CONTACT_TYPES.map(t => ({ value: t.value, label: t.label }))}
                        value={contactType}
                        onChange={(value) => setContactType(value as ContactType)}
                        placeholder="Selecciona un tipo de consulta"
                        required
                    />

                    <Textarea
                        label="Mensaje"
                        placeholder="Describe tu problema, sugerencia o comentario..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        required
                    />

                    {error && (
                        <p className="text-cinnabar text-sm mb-4">{error}</p>
                    )}

                    <Button type="submit" loading={loading} className="w-full mb-4">
                        Enviar mensaje
                    </Button>
                </form>

                <div className="text-center">
                    <Link to="/login" className="text-cinnabar hover:underline text-sm">
                        ← Volver al inicio de sesión
                    </Link>
                </div>
            </div>
        </div>
    );
}

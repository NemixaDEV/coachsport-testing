// Imágenes de la aplicación CoachSport
import csIconoAzulRojo from '@/assets/images/cs-icono-azul-rojo-v1.png';
import csIconoRojoAzul from '@/assets/images/cs-icono-rojo-azul-v1.png';
import csIconoRojoBlanco from '@/assets/images/cs-icono-rojo-blanco-v1.png';
import csLogoLetrasBlancasFondoAzul from '@/assets/images/cs-logo-letras-blancas-fondo-azul-v1.png';
import csLogoLetrasDegradadoFondoBlanco from '@/assets/images/cs-logo-letras-degradado-fondo-blanco-v1.png';
import csLogoLetrasDegradadoFondoTransp from '@/assets/images/cs-logo-letras-degradado-fondo-transp-v1.png';
import csLogoLetrasRojasFondoTransp from '@/assets/images/cs-logo-letras-rojas-fondo-transp-v1.png';
import csLogotipoBlancoAzul from '@/assets/images/cs-logotipo-blanco-azul-v1.png';
import csLogotipoBlancoRojo from '@/assets/images/cs-logotipo-blanco-rojo-v1.png';
import csLogotipoRojoAzul from '@/assets/images/cs-logotipo-rojo-azul-v1.png';
import mercadoPagoLogo from '@/assets/images/mercado-pago-logo.jpg';

export const images = {
    // Iconos
    iconoAzulRojo: csIconoAzulRojo,
    iconoRojoAzul: csIconoRojoAzul,
    iconoRojoBlanco: csIconoRojoBlanco,

    // Logos con letras
    logoLetrasBlancasFondoAzul: csLogoLetrasBlancasFondoAzul,
    logoLetrasDegradadoFondoBlanco: csLogoLetrasDegradadoFondoBlanco,
    logoLetrasDegradadoFondoTransp: csLogoLetrasDegradadoFondoTransp,
    logoLetrasRojasFondoTransp: csLogoLetrasRojasFondoTransp,

    // Logotipos
    logotipoBlancoAzul: csLogotipoBlancoAzul,
    logotipoBlancoRojo: csLogotipoBlancoRojo,
    logotipoRojoAzul: csLogotipoRojoAzul,

    // Logos de pago
    mercadoPagoLogo: mercadoPagoLogo,
} as const;

// Exportar también como default para facilitar el uso
export default images;

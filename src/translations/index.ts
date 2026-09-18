export const translations = {
  pt: {
    online: 'Online',
    // Home
    sienna_name: 'SIENNA',
    sienna_tagline: 'Um lado diferente, só para ti.',
    home_description: 'Descobre um lado diferente da Sienna e vê o que está à tua espera.',
    home_cta: 'COMEÇAR',
    // Age Gate
    age_title: 'Você tem mais de 18 anos?',
    age_yes: 'SIM, TENHO 18+',
    age_no: 'NÃO',
    age_blocked_title: 'Acesso bloqueado',
    age_blocked_text: 'Este conteúdo é exclusivo para maiores de 18 anos.',
    age_exit: 'Sair',
    // Ready
    ready_title: 'Você está preparado para continuar? 👀',
    ready_cta: 'SIM, VAMOS CONTINUAR',
    // Choice
    choice_title: 'Escolhe a tua experiência 👑',
    choice_preview_title: 'PRÉVIAS GRÁTIS',
    choice_preview_desc: 'Vê as prévias grátis e descobre o que está à tua espera.',
    choice_preview_cta: 'VER PRÉVIAS GRÁTIS →',
    choice_vip_title: 'ACESSO VIP 👑',
    choice_vip_desc: 'Desbloqueia a experiência VIP e acede ao conteúdo premium.',
    choice_vip_cta: 'DESBLOQUEAR ACESSO VIP 👑',
    // Common
    back: '← Voltar',
  },
  en: {
    online: 'Online',
    sienna_name: 'SIENNA',
    sienna_tagline: 'A different side, just for you.',
    home_description: "Discover a different side of Sienna and see what's waiting for you.",
    home_cta: 'START',
    age_title: 'Are you 18 or older?',
    age_yes: "YES, I'M 18+",
    age_no: 'NO',
    age_blocked_title: 'Access blocked',
    age_blocked_text: 'This content is exclusively for adults 18 years and older.',
    age_exit: 'Exit',
    ready_title: 'Are you ready to continue? 👀',
    ready_cta: "YES, LET'S GO",
    choice_title: 'Choose your experience 👑',
    choice_preview_title: 'FREE PREVIEWS',
    choice_preview_desc: "Take a first look and discover what's waiting for you.",
    choice_preview_cta: 'EXPLORE FREE PREVIEWS →',
    choice_vip_title: 'VIP ACCESS 👑',
    choice_vip_desc: 'Unlock the VIP experience and access the premium content.',
    choice_vip_cta: 'UNLOCK VIP ACCESS 👑',
    back: '← Back',
  },
  es: {
    online: 'En línea',
    sienna_name: 'SIENNA',
    sienna_tagline: 'Un lado diferente, solo para ti.',
    home_description: 'Descubre un lado diferente de Sienna y mira lo que te espera.',
    home_cta: 'EMPEZAR',
    age_title: '¿Tienes más de 18 años?',
    age_yes: 'SÍ, TENGO 18+',
    age_no: 'NO',
    age_blocked_title: 'Acceso bloqueado',
    age_blocked_text: 'Este contenido es exclusivo para mayores de 18 años.',
    age_exit: 'Salir',
    ready_title: '¿Estás preparado para continuar? 👀',
    ready_cta: 'SÍ, VAMOS',
    choice_title: 'Elige tu experiencia 👑',
    choice_preview_title: 'VISTAS PREVIAS GRATIS',
    choice_preview_desc: 'Echa un primer vistazo y descubre lo que te espera.',
    choice_preview_cta: 'VER VISTAS PREVIAS →',
    choice_vip_title: 'ACCESO VIP 👑',
    choice_vip_desc: 'Desbloquea la experiencia VIP y accede al contenido premium.',
    choice_vip_cta: 'DESBLOQUEAR ACCESO VIP 👑',
    back: '← Volver',
  },
};

export type TranslationKey = keyof typeof translations.pt;

export type Language = 'pt' | 'en' | 'es';

export const LANGUAGES: { code: Language; flag: string; label: string }[] = [
  { code: 'pt', flag: '🇧🇷', label: 'Português' },
  { code: 'en', flag: '🇺🇸', label: 'English' },
  { code: 'es', flag: '🇪🇸', label: 'Español' },
];
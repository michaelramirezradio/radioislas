// HbbTV Key code constants defined by ETSI TS 102 796 / OIPF
export const HBBTV_KEYS = {
  VK_RED: [403, 114, 82],     // Red button (VK_RED=403, F1=114, 'r'=82)
  VK_GREEN: [404, 115, 71],   // Green button (VK_GREEN=404, F2=115, 'g'=71)
  VK_YELLOW: [405, 116, 89],  // Yellow button (VK_YELLOW=405, F3=116, 'y'=89)
  VK_BLUE: [406, 117, 66],    // Blue button (VK_BLUE=406, F4=117, 'b'=66)
  VK_UP: [38],
  VK_DOWN: [40],
  VK_LEFT: [37],
  VK_RIGHT: [39],
  VK_ENTER: [13],
  VK_BACK: [461, 8, 27],      // Back / Escape (TV VK_BACK=461, Backspace=8, Esc=27)
  VK_PLAY: [415, 80],         // Play ('p'=80)
  VK_PAUSE: [19, 83],         // Pause ('s'=83)
  VK_STOP: [413, 88],         // Stop ('x'=88)
};

// Radio Islas Logo constants (Google Drive file ID: 1VWBmme97gSbBt5aiPiP7Ax4h9m5q6j5s)
export const RADIO_ISLAS_LOGO_FILE_ID = "1VWBmme97gSbBt5aiPiP7Ax4h9m5q6j5s";
export const RADIO_ISLAS_LOGO_URL = `https://lh3.googleusercontent.com/d/${RADIO_ISLAS_LOGO_FILE_ID}`;
export const RADIO_ISLAS_LOGO_URL_ALT = `https://drive.google.com/uc?export=view&id=${RADIO_ISLAS_LOGO_FILE_ID}`;

// Fallback image constants for communicators/programs (Google Drive file ID: 1dR0c2-dV3n3bGAqY5_fj3pm2ajBnBvJ-)
export const GDRIVE_FALLBACK_FILE_ID = "1dR0c2-dV3n3bGAqY5_fj3pm2ajBnBvJ-";
export const FALLBACK_IMAGE_GDRIVE = `https://lh3.googleusercontent.com/d/${GDRIVE_FALLBACK_FILE_ID}`;
export const FALLBACK_IMAGE_GDRIVE_ALT = `https://drive.google.com/uc?export=view&id=${GDRIVE_FALLBACK_FILE_ID}`;
export const FALLBACK_IMAGE_UNSPLASH = "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80";

/**
 * Fallback handler for Radio Islas Logo
 */
export function handleLogoFallback(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = event.currentTarget;
  if (!img.src.includes('drive.google.com')) {
    img.src = RADIO_ISLAS_LOGO_URL_ALT;
  } else if (!img.src.includes('lh3.googleusercontent.com')) {
    img.src = RADIO_ISLAS_LOGO_URL;
  }
}

/**
 * Robust image error handler for communicators/programs:
 * First attempts the Google Drive direct image URL.
 * If Google Drive direct fails or is restricted by referrer policies, tries the export URL or studio fallback.
 */
export function handleImageFallback(event: React.SyntheticEvent<HTMLImageElement, Event>) {
  const img = event.currentTarget;
  if (!img.src.includes('lh3.googleusercontent.com') && !img.src.includes('drive.google.com')) {
    img.src = FALLBACK_IMAGE_GDRIVE;
  } else if (img.src.includes('lh3.googleusercontent.com')) {
    img.src = FALLBACK_IMAGE_GDRIVE_ALT;
  } else if (!img.src.includes('unsplash.com')) {
    img.src = FALLBACK_IMAGE_UNSPLASH;
  }
}

export interface ProgramSlot {
  id: string;
  day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado' | 'Domingo';
  timeSlot: string; // e.g. "08:00 - 10:00"
  startHour: number;
  endHour: number;
  program: string;
  communicator: string;
  imageUrl: string;
  role?: string;
  bio?: string;
}

export const PROGRAM_SCHEDULE: ProgramSlot[] = [
  // --- LUNES ---
  {
    id: "l1",
    day: "Lunes",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "TAMARAGUA, BUENOS DÍAS",
    communicator: "Toni Pérez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/toni-perez.jpg",
    role: "Locutor y Presentador",
    bio: "Primer despertar informativo y musical de la mañana en Gran Canaria."
  },
  {
    id: "l2",
    day: "Lunes",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "BUENOS DÍAS A LAS 8",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora y Presentadora",
    bio: "El gran magacín matinal de Radio Las Palmas con entrevistas, noticias e invitados de primera línea."
  },
  {
    id: "l3",
    day: "Lunes",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "EL VECINO",
    communicator: "José Luis Suárez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-suarez.jpg",
    role: "Comunicador Social",
    bio: "Cercanía, voz a los barrios, denuncias ciudadanas y la participación activa de los oyentes."
  },
  {
    id: "l4",
    day: "Lunes",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Actualidad social, cultura, entrevistas en profundidad y la mejor selección musical de mediodía."
  },
  {
    id: "l5",
    day: "Lunes",
    timeSlot: "13:30 - 14:00",
    startHour: 13.5,
    endHour: 14,
    program: "CANARIAS A LAS 13:30",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Servicios Informativos",
    bio: "Informativo de referencia con el resumen de noticias del archipiélago canario."
  },
  {
    id: "l6",
    day: "Lunes",
    timeSlot: "14:00 - 15:00",
    startHour: 14,
    endHour: 15,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Toda la actualidad de la UD Las Palmas, el CB Gran Canaria y el deporte insular."
  },
  {
    id: "l7",
    day: "Lunes",
    timeSlot: "15:00 - 16:30",
    startHour: 15,
    endHour: 16.5,
    program: "BEYMO RADIO",
    communicator: "Norberto Morales",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/norberto-morales.jpg",
    role: "Especialista Musical",
    bio: "Ritmo, variedades, historia de la música y contenidos para acompañar las primeras horas de la tarde."
  },
  {
    id: "l8",
    day: "Lunes",
    timeSlot: "16:30 - 18:00",
    startHour: 16.5,
    endHour: 18,
    program: "CAFÉ DE TARDE",
    communicator: "Manolo Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/manolo-santana.jpg",
    role: "Presentador",
    bio: "Tertulia amena, cultura popular, ambiente distendido y excelente compañía."
  },
  {
    id: "l9",
    day: "Lunes",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "GUSTOS Y PASIONES",
    communicator: "Ricardo Gil",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/ricardo-gil.jpg",
    role: "Divulgador Cultural",
    bio: "Espacio dedicado a aficiones, coleccionismo, arte y pasiones de nuestra gente."
  },
  {
    id: "l10",
    day: "Lunes",
    timeSlot: "19:00 - 20:00",
    startHour: 19,
    endHour: 20,
    program: "ZONA DEP. MOTOR",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Especialista en Motor",
    bio: "Rallyes, automovilismo insular, pruebas de vehículos y la pasión del motor en Canarias."
  },
  {
    id: "l11",
    day: "Lunes",
    timeSlot: "20:00 - 22:00",
    startHour: 20,
    endHour: 22,
    program: "SENTIRSE BIEN",
    communicator: "Alejandro Croissier",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/alejandro-croissier.jpg",
    role: "Especialista en Salud y Bienestar",
    bio: "Consejos de salud, nutrición, crecimiento personal y bienestar para cerrar el día."
  },
  {
    id: "l12",
    day: "Lunes",
    timeSlot: "22:00 - 00:00",
    startHour: 22,
    endHour: 24,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Resumen nocturno de la jornada deportiva en Gran Canaria."
  },

  // --- MARTES ---
  {
    id: "m1",
    day: "Martes",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "TAMARAGUA, BUENOS DÍAS",
    communicator: "Toni Pérez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/toni-perez.jpg",
    role: "Locutor y Presentador",
    bio: "Primer despertar informativo y musical de la mañana en Gran Canaria."
  },
  {
    id: "m2",
    day: "Martes",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "BUENOS DÍAS A LAS 8",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora y Presentadora",
    bio: "El gran magacín matinal de Radio Las Palmas con entrevistas e invitados."
  },
  {
    id: "m3",
    day: "Martes",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "EL VECINO",
    communicator: "José Luis Suárez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-suarez.jpg",
    role: "Comunicador Social",
    bio: "Cercanía, voz a los barrios, denuncias ciudadanas y oyentes en directo."
  },
  {
    id: "m4",
    day: "Martes",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Actualidad social, cultura y entrevistas en profundidad."
  },
  {
    id: "m5",
    day: "Martes",
    timeSlot: "13:30 - 14:00",
    startHour: 13.5,
    endHour: 14,
    program: "CANARIAS A LAS 13:30",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Servicios Informativos",
    bio: "Informativo de referencia con el resumen de noticias del archipiélago."
  },
  {
    id: "m6",
    day: "Martes",
    timeSlot: "14:00 - 15:00",
    startHour: 14,
    endHour: 15,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Toda la actualidad de la UD Las Palmas y el deporte insular."
  },
  {
    id: "m7",
    day: "Martes",
    timeSlot: "15:00 - 16:30",
    startHour: 15,
    endHour: 16.5,
    program: "SIN ÁNIMO DE INCORDIAR",
    communicator: "Xavier Aparici",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/xavier-aparici.jpg",
    role: "Analista de Opinión",
    bio: "Análisis crítico e independiente con un toque de ironía y reflexión social."
  },
  {
    id: "m8",
    day: "Martes",
    timeSlot: "16:30 - 18:00",
    startHour: 16.5,
    endHour: 18,
    program: "CAFÉ DE TARDE",
    communicator: "Manolo Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/manolo-santana.jpg",
    role: "Presentador",
    bio: "Tertulia amena, cultura popular, ambiente distendido y excelente compañía."
  },
  {
    id: "m9",
    day: "Martes",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "GUSTOS Y PASIONES",
    communicator: "Ricardo Gil",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/ricardo-gil.jpg",
    role: "Divulgador Cultural",
    bio: "Espacio dedicado a aficiones, coleccionismo, arte y pasiones."
  },
  {
    id: "m10",
    day: "Martes",
    timeSlot: "19:00 - 20:00",
    startHour: 19,
    endHour: 20,
    program: "ZONA DEP. MOTOR",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Especialista en Motor",
    bio: "Rallyes, automovilismo insular y pruebas de vehículos en Canarias."
  },
  {
    id: "m11",
    day: "Martes",
    timeSlot: "20:00 - 20:30",
    startHour: 20,
    endHour: 20.5,
    program: "CANARIAS EN BREGA",
    communicator: "Tonio Rodríguez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/tonio-rodriguez.jpg",
    role: "Periodista de Lucha Canaria",
    bio: "Toda la actualidad de la Lucha Canaria y tradiciones autóctonas."
  },
  {
    id: "m12",
    day: "Martes",
    timeSlot: "20:30 - 22:00",
    startHour: 20.5,
    endHour: 22,
    program: "COSMÓPOLIS",
    communicator: "Héber Martín y Cristina Corsali",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/cosmopolis.jpg",
    role: "Equipo Cosmópolis",
    bio: "Viajes, tendencias globales, música internacional y miradas al mundo."
  },
  {
    id: "m13",
    day: "Martes",
    timeSlot: "22:00 - 00:00",
    startHour: 22,
    endHour: 24,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Resumen nocturno del deporte en Gran Canaria."
  },

  // --- MIÉRCOLES ---
  {
    id: "x1",
    day: "Miércoles",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "TAMARAGUA, BUENOS DÍAS",
    communicator: "Toni Pérez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/toni-perez.jpg",
    role: "Locutor y Presentador",
    bio: "Primer despertar informativo y musical de la mañana en Gran Canaria."
  },
  {
    id: "x2",
    day: "Miércoles",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "BUENOS DÍAS A LAS 8",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora y Presentadora",
    bio: "El gran magacín matinal de Radio Las Palmas con entrevistas e invitados."
  },
  {
    id: "x3",
    day: "Miércoles",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "EL VECINO",
    communicator: "José Luis Suárez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-suarez.jpg",
    role: "Comunicador Social",
    bio: "Cercanía, voz a los barrios, denuncias ciudadanas y oyentes."
  },
  {
    id: "x4",
    day: "Miércoles",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Actualidad social, cultura y entrevistas en profundidad."
  },
  {
    id: "x5",
    day: "Miércoles",
    timeSlot: "13:30 - 14:00",
    startHour: 13.5,
    endHour: 14,
    program: "CANARIAS A LAS 13:30",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Servicios Informativos",
    bio: "Informativo de referencia con el resumen de noticias del archipiélago."
  },
  {
    id: "x6",
    day: "Miércoles",
    timeSlot: "14:00 - 15:00",
    startHour: 14,
    endHour: 15,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Toda la actualidad de la UD Las Palmas y el deporte insular."
  },
  {
    id: "x7",
    day: "Miércoles",
    timeSlot: "15:00 - 16:30",
    startHour: 15,
    endHour: 16.5,
    program: "ESCÁNDALO",
    communicator: "Marga de la Cueva",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/marga-de-la-cueva.jpg",
    role: "Directora y Presentadora",
    bio: "Cultura, prensa del corazón, espectáculos y momentos divertidos."
  },
  {
    id: "x8",
    day: "Miércoles",
    timeSlot: "16:30 - 18:00",
    startHour: 16.5,
    endHour: 18,
    program: "CAFÉ DE TARDE",
    communicator: "Manolo Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/manolo-santana.jpg",
    role: "Presentador",
    bio: "Tertulia amena, cultura popular, ambiente distendido y buena compañía."
  },
  {
    id: "x9",
    day: "Miércoles",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "LA CANASTA",
    communicator: "Luís Hernández",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/luis-hernandez.jpg",
    role: "Especialista en Baloncesto",
    bio: "El programa dedicado 100% al baloncesto insular, ACB y cantera."
  },
  {
    id: "x10",
    day: "Miércoles",
    timeSlot: "19:00 - 20:00",
    startHour: 19,
    endHour: 20,
    program: "ZONA DEP. MOTOR",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Especialista en Motor",
    bio: "Rallyes, automovilismo insular y pruebas de vehículos."
  },
  {
    id: "x11",
    day: "Miércoles",
    timeSlot: "20:00 - 20:30",
    startHour: 20,
    endHour: 20.5,
    program: "CANARIAS EN BREGA",
    communicator: "Tonio Rodríguez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/tonio-rodriguez.jpg",
    role: "Periodista de Lucha Canaria",
    bio: "Toda la actualidad de la Lucha Canaria y tradiciones autóctonas."
  },
  {
    id: "x12",
    day: "Miércoles",
    timeSlot: "20:30 - 22:00",
    startHour: 20.5,
    endHour: 22,
    program: "CON Y DE ACTORINO",
    communicator: "Carmelo Hernández",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/carmelo-hernandez.jpg",
    role: "Director Teatral",
    bio: "Artes escénicas, teatro canario, entrevistas a actores y escenario."
  },
  {
    id: "x13",
    day: "Miércoles",
    timeSlot: "22:00 - 00:00",
    startHour: 22,
    endHour: 24,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Resumen nocturno del deporte en Gran Canaria."
  },

  // --- JUEVES ---
  {
    id: "j1",
    day: "Jueves",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "TAMARAGUA, BUENOS DÍAS",
    communicator: "Toni Pérez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/toni-perez.jpg",
    role: "Locutor y Presentador",
    bio: "Primer despertar informativo y musical de la mañana en Gran Canaria."
  },
  {
    id: "j2",
    day: "Jueves",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "BUENOS DÍAS A LAS 8",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora y Presentadora",
    bio: "El gran magacín matinal de Radio Las Palmas con entrevistas e invitados."
  },
  {
    id: "j3",
    day: "Jueves",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "EL VECINO",
    communicator: "José Luis Suárez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-suarez.jpg",
    role: "Comunicador Social",
    bio: "Cercanía, voz a los barrios, denuncias ciudadanas y oyentes."
  },
  {
    id: "j4",
    day: "Jueves",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Actualidad social, cultura y entrevistas en profundidad."
  },
  {
    id: "j5",
    day: "Jueves",
    timeSlot: "13:30 - 14:00",
    startHour: 13.5,
    endHour: 14,
    program: "CANARIAS A LAS 13:30",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Servicios Informativos",
    bio: "Informativo de referencia con el resumen de noticias del archipiélago."
  },
  {
    id: "j6",
    day: "Jueves",
    timeSlot: "14:00 - 15:00",
    startHour: 14,
    endHour: 15,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Toda la actualidad de la UD Las Palmas y el deporte insular."
  },
  {
    id: "j7",
    day: "Jueves",
    timeSlot: "15:00 - 16:30",
    startHour: 15,
    endHour: 16.5,
    program: "PUNTO DE PARTIDA",
    communicator: "Rita Sánchez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rita-sanchez.jpg",
    role: "Periodista",
    bio: "Entrevistas en profundidad, psicología, sociedad e historias humanas."
  },
  {
    id: "j8",
    day: "Jueves",
    timeSlot: "16:30 - 18:00",
    startHour: 16.5,
    endHour: 18,
    program: "CAFÉ DE TARDE",
    communicator: "Manolo Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/manolo-santana.jpg",
    role: "Presentador",
    bio: "Tertulia amena, cultura popular, ambiente distendido y buena compañía."
  },
  {
    id: "j9",
    day: "Jueves",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "URBE INMOBILIARIA",
    communicator: "Juan Carlos Montenegro",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/juan-carlos-montenegro.jpg",
    role: "Asesor Inmobiliario",
    bio: "Análisis del mercado de la vivienda, urbanismo y consejos inmobiliarios."
  },
  {
    id: "j10",
    day: "Jueves",
    timeSlot: "19:00 - 20:30",
    startHour: 19,
    endHour: 20.5,
    program: "LA RUTA DE LA SEDA",
    communicator: "José Luis Trenzado",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-trenzado.jpg",
    role: "Investigador Cultural",
    bio: "Un viaje a través de la historia, civilizaciones y patrimonio mundial."
  },
  {
    id: "j11",
    day: "Jueves",
    timeSlot: "20:30 - 22:00",
    startHour: 20.5,
    endHour: 22,
    program: "MI GRAN NOCHE",
    communicator: "Fran Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/fran-santana.jpg",
    role: "Locutor Musical",
    bio: "Los grandes éxitos de todas las décadas en un ambiente festivo."
  },

  // --- VIERNES ---
  {
    id: "v1",
    day: "Viernes",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "TAMARAGUA, BUENOS DÍAS",
    communicator: "Toni Pérez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/toni-perez.jpg",
    role: "Locutor y Presentador",
    bio: "Primer despertar informativo y musical de la mañana en Gran Canaria."
  },
  {
    id: "v2",
    day: "Viernes",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "BUENOS DÍAS A LAS 8",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora y Presentadora",
    bio: "El gran magacín matinal de Radio Las Palmas con entrevistas e invitados."
  },
  {
    id: "v3",
    day: "Viernes",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "EL VECINO",
    communicator: "José Luis Suárez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-suarez.jpg",
    role: "Comunicador Social",
    bio: "Cercanía, voz a los barrios, denuncias ciudadanas y oyentes."
  },
  {
    id: "v4",
    day: "Viernes",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Actualidad social, cultura y entrevistas en profundidad."
  },
  {
    id: "v5",
    day: "Viernes",
    timeSlot: "13:30 - 14:00",
    startHour: 13.5,
    endHour: 14,
    program: "CANARIAS A LAS 13:30",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Servicios Informativos",
    bio: "Informativo de referencia con el resumen de noticias del archipiélago."
  },
  {
    id: "v6",
    day: "Viernes",
    timeSlot: "14:00 - 15:00",
    startHour: 14,
    endHour: 15,
    program: "ZONA DEPORTIVA",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Periodista Deportivo",
    bio: "Toda la actualidad de la UD Las Palmas y el deporte insular."
  },
  {
    id: "v7",
    day: "Viernes",
    timeSlot: "15:00 - 16:30",
    startHour: 15,
    endHour: 16.5,
    program: "NUESTRO FÚTBOL",
    communicator: "Antonio León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/antonio-leon.jpg",
    role: "Cronista de Fútbol Regional",
    bio: "Seguimiento al fútbol modesto canario, tercera RFEF y regionales."
  },
  {
    id: "v8",
    day: "Viernes",
    timeSlot: "16:30 - 18:00",
    startHour: 16.5,
    endHour: 18,
    program: "CAFÉ DE TARDE",
    communicator: "Manolo Santana",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/manolo-santana.jpg",
    role: "Presentador",
    bio: "Tertulia amena, cultura popular, ambiente distendido y buena compañía."
  },
  {
    id: "v9",
    day: "Viernes",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "DCULTURA Y SALUD",
    communicator: "Juan Carlos Jiménez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/juan-carlos-jimenez.jpg",
    role: "Divulgador de Salud",
    bio: "Medicina preventiva, cultura saludable y calidad de vida."
  },
  {
    id: "v10",
    day: "Viernes",
    timeSlot: "19:00 - 20:00",
    startHour: 19,
    endHour: 20,
    program: "DESDE MI HAZOTEA",
    communicator: "Helena con H",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/helena-sansiviero.jpg",
    role: "Comunicadora",
    bio: "Reflexiones frescas, arte local, música y charlas de fin de semana."
  },
  {
    id: "v11",
    day: "Viernes",
    timeSlot: "20:00 - 22:00",
    startHour: 20,
    endHour: 22,
    program: "ARRASANDO",
    communicator: "Kiko Blanqui",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/kiko-blanqui.jpg",
    role: "DJ y Animador",
    bio: "La fiesta radiofónica previa al fin de semana con ritmos latinos."
  },
  {
    id: "v12",
    day: "Viernes",
    timeSlot: "22:00 - 00:00",
    startHour: 22,
    endHour: 24,
    program: "PONTE LA SONDA",
    communicator: "Zándor Roque",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/zandor-roque.jpg",
    role: "Presentador Nocturno",
    bio: "Misterio, relatos nocturnos y música sugerente en la noche."
  },

  // --- SÁBADO ---
  {
    id: "s1",
    day: "Sábado",
    timeSlot: "08:00 - 10:00",
    startHour: 8,
    endHour: 10,
    program: "LA OTRA MAÑANA",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista y Presentadora",
    bio: "Edición especial de sábado con la mejor selección social y cultural."
  },
  {
    id: "s2",
    day: "Sábado",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "LA NOTA DISCORDANTE",
    communicator: "Antonio Melián",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/antonio-melian.jpg",
    role: "Comentarista Político",
    bio: "Debate abierto, pluralidad de opiniones y análisis público."
  },
  {
    id: "s3",
    day: "Sábado",
    timeSlot: "12:00 - 13:30",
    startHour: 12,
    endHour: 13.5,
    program: "DCULTURA Y SALUD",
    communicator: "Juan Carlos Jiménez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/juan-carlos-jimenez.jpg",
    role: "Divulgador de Salud",
    bio: "Medicina preventiva y estilo de vida saludable."
  },
  {
    id: "s4",
    day: "Sábado",
    timeSlot: "13:30 - 15:00",
    startHour: 13.5,
    endHour: 15,
    program: "LA TERTULIA",
    communicator: "Dulce Mª Facundo",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Directora de Debates",
    bio: "Mesa de debate del fin de semana con personalidades de Canarias."
  },
  {
    id: "s5",
    day: "Sábado",
    timeSlot: "15:00 - 18:00",
    startHour: 15,
    endHour: 18,
    program: "SIN ÁNIMO DE INCORDIAR",
    communicator: "Xavier Aparici",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/xavier-aparici.jpg",
    role: "Analista de Opinión",
    bio: "Análisis crítico e independiente en la tarde del sábado."
  },
  {
    id: "s6",
    day: "Sábado",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "GUSTOS Y PASIONES",
    communicator: "Ricardo Gil",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/ricardo-gil.jpg",
    role: "Divulgador Cultural",
    bio: "Aficiones, coleccionismo y arte."
  },
  {
    id: "s7",
    day: "Sábado",
    timeSlot: "19:00 - 20:00",
    startHour: 19,
    endHour: 20,
    program: "BEYMO RADIO",
    communicator: "Norberto Morales",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/norberto-morales.jpg",
    role: "Especialista Musical",
    bio: "Éxitos musicales y variedades."
  },
  {
    id: "s8",
    day: "Sábado",
    timeSlot: "20:00 - 21:30",
    startHour: 20,
    endHour: 21.5,
    program: "LA RUTA DE LA SEDA",
    communicator: "José Luis Trenzado",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/jose-luis-trenzado.jpg",
    role: "Investigador Cultural",
    bio: "Viaje por la historia y las civilizaciones."
  },
  {
    id: "s9",
    day: "Sábado",
    timeSlot: "21:30 - 23:00",
    startHour: 21.5,
    endHour: 23,
    program: "CON Y DE ACTORINO",
    communicator: "Carmelo Hernández",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/carmelo-hernandez.jpg",
    role: "Director Teatral",
    bio: "Artes escénicas y cultura teatral."
  },
  {
    id: "s10",
    day: "Sábado",
    timeSlot: "23:00 - 00:00",
    startHour: 23,
    endHour: 24,
    program: "LA OTRA NOCHE",
    communicator: "Asunción Benítez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/asuncion-benitez.jpg",
    role: "Periodista",
    bio: "Acompañamiento nocturno con música y reflexión."
  },

  // --- DOMINGO ---
  {
    id: "d1",
    day: "Domingo",
    timeSlot: "06:00 - 08:00",
    startHour: 6,
    endHour: 8,
    program: "SENTIRSE BIEN",
    communicator: "Alejandro Croissier",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/alejandro-croissier.jpg",
    role: "Especialista en Bienestar",
    bio: "Consejos de salud y mente sana para comenzar el domingo."
  },
  {
    id: "d2",
    day: "Domingo",
    timeSlot: "08:00 - 09:00",
    startHour: 8,
    endHour: 9,
    program: "EL RINCÓN DEL ARTE",
    communicator: "Rogelio García",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rogelio-garcia.jpg",
    role: "Crítico de Arte",
    bio: "Exposiciones, pintura y patrimonio artístico canario."
  },
  {
    id: "d3",
    day: "Domingo",
    timeSlot: "09:00 - 10:00",
    startHour: 9,
    endHour: 10,
    program: "HACEDORES DEL CAMBIO",
    communicator: "Carlos Jiménez",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/carlos-jimenez.jpg",
    role: "Divulgador de Emprendimiento",
    bio: "Proyectos innovadores y emprendedores locales."
  },
  {
    id: "d4",
    day: "Domingo",
    timeSlot: "10:00 - 12:00",
    startHour: 10,
    endHour: 12,
    program: "ZONA DEPORTIVA MOTOR",
    communicator: "Rafa León",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/rafa-leon.jpg",
    role: "Especialista en Motor",
    bio: "Rallyes, pruebas y motor en Canarias."
  },
  {
    id: "d5",
    day: "Domingo",
    timeSlot: "12:00 - 13:00",
    startHour: 12,
    endHour: 13,
    program: "ESCÁNDALO",
    communicator: "Marga de la Cueva",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/marga-de-la-cueva.jpg",
    role: "Directora y Presentadora",
    bio: "Espectáculos y momentos amenos de la semana."
  },
  {
    id: "d6",
    day: "Domingo",
    timeSlot: "13:00 - 15:00",
    startHour: 13,
    endHour: 15,
    program: "DESDE MI HAZOTEA",
    communicator: "Helena con H",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/helena-sansiviero.jpg",
    role: "Comunicadora",
    bio: "Música, charlas y cultura relajada de domingo."
  },
  {
    id: "d7",
    day: "Domingo",
    timeSlot: "15:00 - 18:00",
    startHour: 15,
    endHour: 18,
    program: "LA NOTA DISCORDANTE",
    communicator: "Antonio Melián",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/antonio-melian.jpg",
    role: "Comentarista Político",
    bio: "Debates y análisis del domingo."
  },
  {
    id: "d8",
    day: "Domingo",
    timeSlot: "18:00 - 19:00",
    startHour: 18,
    endHour: 19,
    program: "GUSTOS Y PASIONES",
    communicator: "Ricardo Gil",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/ricardo-gil.jpg",
    role: "Divulgador Cultural",
    bio: "Pasiones, pasatiempos y cultura."
  },
  {
    id: "d9",
    day: "Domingo",
    timeSlot: "19:00 - 20:30",
    startHour: 19,
    endHour: 20.5,
    program: "URBE INMOBILIARIA",
    communicator: "Juan Carlos Montenegro",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/juan-carlos-montenegro.jpg",
    role: "Asesor Inmobiliario",
    bio: "Mercado de la vivienda y consejos inmobiliarios."
  },
  {
    id: "d10",
    day: "Domingo",
    timeSlot: "20:30 - 22:00",
    startHour: 20.5,
    endHour: 22,
    program: "ARRASANDO",
    communicator: "Kiko Blanqui",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/kiko-blanqui.jpg",
    role: "DJ y Animador",
    bio: "Música bailable para despedir el fin de semana."
  }
];

/**
 * Calculates current Date in Canary Islands Time Zone (Atlantic/Canary UTC+0 / UTC+1 WEST)
 */
export function getCanaryDate(): Date {
  const now = new Date();
  try {
    const canaryString = now.toLocaleString("en-US", { timeZone: "Atlantic/Canary" });
    return new Date(canaryString);
  } catch {
    return now;
  }
}

/**
 * Formats current Canary Time string, e.g., "11:45"
 */
export function getCanaryTimeFormatted(): string {
  const cDate = getCanaryDate();
  const h = String(cDate.getHours()).padStart(2, '0');
  const m = String(cDate.getMinutes()).padStart(2, '0');
  return `${h}:${m}`;
}

/**
 * Returns the ProgramSlot currently on air based on Canary Islands time
 */
export function getCurrentProgramSlot(): ProgramSlot {
  const canaryDate = getCanaryDate();
  const days: ('Domingo' | 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado')[] = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ];
  const currentDayName = days[canaryDate.getDay()];
  const currentHour = canaryDate.getHours() + canaryDate.getMinutes() / 60;

  // Search exact matching slot for today
  const found = PROGRAM_SCHEDULE.find(slot => {
    return slot.day === currentDayName &&
      currentHour >= slot.startHour && currentHour < slot.endHour;
  });

  if (found) return found;

  // Overnight or unlisted slot fallback
  return {
    id: `redifusion_${currentDayName}`,
    day: currentDayName,
    timeSlot: "00:00 - 06:00",
    startHour: 0,
    endHour: 6,
    program: "REDIFUSIÓN Y MÚSICA EN DIRECTO",
    communicator: "Radio Las Palmas HD",
    imageUrl: "https://www.radiolaspalmas.com/uploads/programacion/dulce-maria-facundo.jpg",
    role: "Emisión Continua 24h",
    bio: "Selección musical e informativos en redifusión desde Gran Canaria."
  };
}

export interface Communicator {
  id: string;
  name: string;
  role: string;
  program: string;
  timeSlot: string;
  avatarUrl: string;
  bio: string;
  day: string;
}

// Derived list of unique communicators/programs from schedule for carousel navigation
export const COMMUNICATORS: Communicator[] = PROGRAM_SCHEDULE.map((s, idx) => ({
  id: String(idx + 1),
  name: s.communicator === '-' ? 'Radio Las Palmas' : s.communicator,
  role: s.role || 'Locutor / Presentador',
  program: s.program,
  timeSlot: `${s.day} (${s.timeSlot})`,
  avatarUrl: s.imageUrl,
  bio: s.bio || `Programa ${s.program} en Radio Las Palmas HD.`,
  day: s.day
}));

export interface ArchivoSalarialReducido {
  id_usuario: number;
  nombre_archivo: string;
  formato: string;
  tamano: number;
}

export interface ArchivoSalarial extends ArchivoSalarialReducido {
  id_archivo: number;
  created_at: string;
  updated_at: string;
}

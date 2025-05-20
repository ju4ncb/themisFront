export interface Usuario {
  id_usuario: number;
  id_rol: number;
  nombreusuario: string;
  nombres: string;
  apellidos: string;
  direccion: string;
  telefono: string;
  correo: string;
  contrasena_hash: string;
  created_at: string;
  updated_at: string;
}

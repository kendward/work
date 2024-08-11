export interface AuthJwtPayload {
  sub?: string;
  id?: string;
  email: string;
  roles?: string[];
}

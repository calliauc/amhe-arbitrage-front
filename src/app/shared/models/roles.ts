export type RolesNames = 'guest'|'arbitre'|'admin';
export const auth: Record<RolesNames, number> = { 'guest': 0, 'arbitre': 1, 'admin': 2 };

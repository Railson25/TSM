import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};

export function getRole(): string | undefined {
  const { sessionClaims } = auth();
  const role = sessionClaims?.metadata?.role;

  return role;
}

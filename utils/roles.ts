import { Roles } from "@/types/globals";
import { auth } from "@clerk/nextjs";

export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return (
    sessionClaims &&
    sessionClaims.metadata &&
    sessionClaims.metadata.role === role
  );
};

"use server";

export const getVersions = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/my-version`,
    {
      next: { tags: ["versions"] },
    }
  );

  const versions = await response.json();

  return versions;
};

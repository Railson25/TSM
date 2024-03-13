"use server";

export const getVersionById = async (versionId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/my-version/${versionId}`,
    {
      cache: "force-cache",
      next: { tags: ["versionById"] },
    }
  );

  const versions = await response.json();

  return versions;
};

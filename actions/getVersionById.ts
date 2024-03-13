"use server";

export const getVersionById = async (versionId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/my-version/${versionId}`,
    {
      cache: "force-cache",
      next: { tags: ["versions"] },
    }
  );

  const versions = await response.json();

  return versions;
};

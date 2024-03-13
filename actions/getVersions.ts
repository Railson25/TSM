"use server";

export const getVersions = async () => {
  const response = await fetch("http://localhost:3000/api/my-version", {
    next: { tags: ["versions"] },
  });

  const versions = await response.json();

  return versions;
};
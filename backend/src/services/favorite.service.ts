import fs from 'fs/promises';

const FILE_PATH = 'favorites.json';

export const getFavoriteIds = async (): Promise<string[]> => {
  try {
    const data = await fs.readFile(FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const saveFavoriteIds = async (ids: string[]): Promise<void> => {
  await fs.writeFile(FILE_PATH, JSON.stringify(ids, null, 2), 'utf-8');
};

export const toggleFavoriteId = async (id: string): Promise<string[]> => {
  const ids = await getFavoriteIds();
  const index = ids.indexOf(id);
  if (index === -1) {
    ids.unshift(id);
  } else {
    ids.splice(index, 1);
  }
  await saveFavoriteIds(ids);
  return ids;
};

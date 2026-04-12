import fs from 'fs/promises';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'favorites.json');

export const getFavoriteIds = async (): Promise<string[]> => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      const data = await fs.readFile(FILE_PATH, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If file doesn't exist, return empty array
      return [];
    }
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const saveFavoriteIds = async (ids: string[]): Promise<void> => {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(FILE_PATH, JSON.stringify(ids, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving favorites:', error);
    throw error;
  }
};

export const toggleFavoriteId = async (id: string): Promise<string[]> => {
  const ids = await getFavoriteIds();
  const index = ids.indexOf(id);
  if (index === -1) {
    ids.push(id);
  } else {
    ids.splice(index, 1);
  }
  await saveFavoriteIds(ids);
  return ids;
};

import { openDB } from 'idb';

// Create the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Accept content and add it to the database
export const putDb = async (content) => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const jateStore = tx.objectStore('jate');
    const req = jateStore.put({
      id: 1, value: content
    });
    const res = await req;
    console.log(res, ' added to database');
  } catch {
    console.error('putDb not implemented', error);
  }
}

// Gets content from the database
export const getDb = async () => {
  try {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readonly');
    const jateStore = tx.objectStore('jate');
    const req = jateStore.get(1);
    const res = await req;
    return res.value;
  } catch {
    console.error('getDb not implemented');
  }
}

initdb();

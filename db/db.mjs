
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';


const __dirname = dirname(fileURLToPath(import.meta.url));
const usersFilePath = join(__dirname, 'users.json');

// Helper function to read users data
const readUsersFile = () => {
  if (!fs.existsSync(usersFilePath)) {
    return {};
  }
  return JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));
};

// Helper function to write users data
const writeUsersFile = (data) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));
};

export const signup = (username, user) => {
  const users = readUsersFile()

  if (users[username]) {
    throw Error('username already exists')
  }
  users[username] = user;
  writeUsersFile(users);
}

export const signin = (username) => {
  const users = readUsersFile()
  const user = users[username];
  if (users[username]) {
    return user;
  }
  return null;
}

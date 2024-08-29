const API_BASE_URL = process.env.API_BASE_URL;

const CreateUser = async (userData: UserType) => {
  const newUser = await fetch(`${API_BASE_URL}/api/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
  });
  return newUser.json();
}

export {
  CreateUser
}
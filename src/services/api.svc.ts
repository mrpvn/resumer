const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3000'

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


const CreateResumeField = async (formData: PersonalDetail) => {
  const resumeData = await fetch(`${API_BASE_URL}/api/resume`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData)
  });
  return resumeData.json();
}

export {
  CreateUser,
  CreateResumeField
}
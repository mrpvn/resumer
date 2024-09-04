import axios from "axios"

const BASE_URL = process.env.API_BASE_URL || ''

const axiosClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
      'Content-Type': 'application/json',
  },
});

const CreateNewResume = async (data: CreateNewResumeType) => {
  const response = await axiosClient.post('/api/resume', data);
  return response.data;
}

const GetResumeList = async (userEmail: string) => {
  const response = await axiosClient.get('/api/resume', {
    params: {
      email: userEmail,
    }
  })
  return response.data;
}

const UpdateResume = async ({values, id}: { values: any, id: string | string[] }) => {
  const response = await axiosClient.put(`/api/resume/${id}`, values)
  return response.data;
}


// const CreateUser = async (userData: UserType) => {
//   const newUser = await fetch(`${API_BASE_URL}/api/user`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData)
//   });
//   return newUser.json();
// }


// const CreateResumeField = async (formData: PersonalDetail) => {
//   const resumeData = await fetch(`${API_BASE_URL}/api/resume`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(formData)
//   });
//   return resumeData.json();
// }

// const GetResumeField = async (id: string) => {
//   const resumeData = await fetch(`${API_BASE_URL}/api/field/${id}`);
//   return resumeData.json();
// }

export {
  // CreateUser,
  // CreateResumeField,
  // GetResumeField,
  CreateNewResume,
  GetResumeList,
  UpdateResume
}
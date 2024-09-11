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

const GetSingleResume = async (id: string) => {
  const resumeId = id?.queryKey[1]
  const response = await axiosClient.get(`/api/resume/${resumeId}`);
  return response.data;
}

const UpdateResume = async ({values, id}: { values: any, id: string | string[] }) => {
  const response = await axiosClient.put(`/api/resume/${id}`, values)
  return response.data;
}

const DeleteResume = async (id: string) => {
  const response = await axiosClient.delete(`/api/resume/${id}`)
  return response.data
}

export {
  CreateNewResume,
  GetResumeList,
  GetSingleResume,
  UpdateResume,
  DeleteResume
}
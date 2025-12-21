import { Story, StoryItems } from "@prisma/client";
import { axiosInstance } from "./axios-instance";

export type IStory = Story & {
  items: StoryItems[];
};

export const getAll = async () => {
  const { data } = await axiosInstance.get<IStory[]>("/stories");
  return data;
};

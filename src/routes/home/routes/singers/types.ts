import { Artist } from "@/api/types";
import { PullUpStateType } from "@/components/Scroll";

export type SingerOptionsType = {
  area: string;
  alpha: string;
  pullUpState: PullUpStateType;
};

export type SingerListMapType = {
  singerList: Artist[];
  offset: number;
  more: boolean;
};

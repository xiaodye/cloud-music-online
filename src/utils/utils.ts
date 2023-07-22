import { SongType } from "@/api/types";

export function getCount(count: number): string {
  if (count < 0) return "";
  if (count < 10000) {
    return count + "";
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + "万";
  } else {
    return Math.floor(count / 10000000) / 10 + "亿";
  }
}

// 处理歌手列表拼接歌手名字
export const getName = (list: { name: string }[]) => {
  let str = "";
  list.map((item, index) => {
    str += index === 0 ? item.name : "/" + item.name;
    return item;
  });
  return str;
};

//拼接出歌曲的url链接
export const getSongUrl = (id: number) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
};

// 转换歌曲播放时间
export const formatPlayTime = (interval: number) => {
  interval = interval | 0; // | 0 表示向下取整
  const minute = (interval / 60) | 0;
  const second = (interval % 60).toString().padStart(2, "0");
  return `${minute}:${second}`;
};

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: SongType[]): SongType[] {
  const newArr = [...arr];

  for (let i = 0; i < newArr.length; i++) {
    const j = getRandomInt(0, i);
    const t = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = t;
  }

  return newArr;
}

// 找到当前的歌曲索引
export const findIndex = (song: SongType, list: SongType[]) => {
  return list.findIndex((item) => {
    return song.id === item.id;
  });
};

import { FC, SyntheticEvent, createContext, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import PlayerBanner from "./PlayerBanner";
import FullScreenPlayer from "./FullScreenPlayer";
import { usePlayerStore } from "@/store";
import useMount from "@/hooks/useMount";
import { findIndex, getSongUrl, shuffle } from "@/utils/utils";
import { PlayMode } from "@/store/player/types";

type ContextType = {
  setSongProgress: (percent: number) => void;
};

export const SongContext = createContext<ContextType>({} as ContextType);

const Player: FC = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>({} as HTMLAudioElement);
  const [playing, setPlaying] = usePlayerStore((state) => [state.playing, state.setPlaying]);
  const [currentSong, setCurrentSong] = usePlayerStore((state) => [state.currentSong, state.setCurrentSong]);
  const [currentIndex, setCurrentIndex] = usePlayerStore((state) => [state.currentIndex, state.setCurrentIndex]);
  const [percent, setPercent] = usePlayerStore((state) => [state.percent, state.setPercent]);
  const [prevSong, setPrevSong] = useState<any>();
  const [playMode, setPlayMode] = usePlayerStore((state) => [state.playMode, state.setPlayMode]);
  const [playList, setPlayList] = usePlayerStore((state) => [state.playList, state.setPlayList]);
  const [sequencePlayList, setSequencePlayList] = usePlayerStore((state) => [
    state.sequencePlayList,
    state.setSequencePlayList,
  ]);
  const songReady = useRef(true);

  useMount(() => {
    if (!currentSong) return;

    setCurrentIndex(0);
    const current = playList[0];

    setCurrentSong(current);
    audioRef.current.src = getSongUrl(current.id);

    setCurrentTime(0); // 设置播放起始时间, 从头开始播放
    setDuration((current.dt / 1000) | 0); // 歌曲时长
    setPercent(getPercent(currentTime, duration)); // 设置百分比
  });

  useEffect(() => {
    if (!playList || currentIndex === -1 || !playList[currentIndex]) {
      return;
    }

    const song = playList[currentIndex];
    setCurrentSong(song);
    setPrevSong(song);
    audioRef.current.src = getSongUrl(song.id);

    setTimeout(() => {
      // 注意，play 方法返回的是一个 promise 对象
      audioRef.current.play().then(() => {
        songReady.current = true;
      });
    });
    setPlaying(true);
    setCurrentTime(0); // 从0 开始
    setDuration((song.dt / 1000) | 0); // 时长
  }, [playList, currentIndex]);

  useEffect(() => {
    if (playing) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  // 获取音乐播放的时间
  const updateTime = (e: SyntheticEvent<HTMLAudioElement>) => {
    const audioElement = e.target as HTMLAudioElement;
    const currentTime = audioElement.currentTime;

    setCurrentTime(currentTime);
    setPercent(getPercent(currentTime, duration));
  };

  /**
   * 根据已播放时间和总时长计算歌曲百分比进度
   * @param currentTime
   * @param duration
   * @returns
   */
  const getPercent = (currentTime: number, duration: number) => {
    return Number.isNaN(currentTime / duration) ? 0 : currentTime / duration;
  };

  /**
   * 当进度条被点击、滑动时，currentTime 也应该跟着变
   * @param percent
   */
  const setSongProgress = (percent: number) => {
    const newTime = percent * duration;
    setCurrentTime(newTime);
    audioRef.current.currentTime = newTime;

    // 如果进度条被滑动时，歌曲处于暂停状态，则把状态置为播放
    if (!playing) {
      setPlaying(true);
    }
  };

  /**
   * 循环播放
   */
  const loopHandler = () => {
    audioRef.current.currentTime = 0;
    setCurrentTime(0);
    audioRef.current.play();
    setPlaying(true);
  };

  const prevHandler = () => {
    //播放列表只有一首歌时单曲循环
    if (playList.length === 1) {
      loopHandler();
      return;
    }

    // 切换索引
    let index = currentIndex - 1;
    if (index < 0) index = playList.length - 1;
    if (!playing) setPlaying(true);
    setCurrentIndex(index);
  };

  const nextHandler = () => {
    if (playList.length === 1) {
      loopHandler();
      return;
    }

    // 切换索引
    let index = currentIndex + 1;
    if (index > playList.length - 1) index = 0;
    if (!playing) setPlaying(true);
    setCurrentIndex(index);
  };

  const endHandler = () => {
    if (playMode === PlayMode.LOOP) {
      loopHandler();
    } else {
      nextHandler();
    }
  };

  const togglePlayMode = () => {
    const newMode = (playMode + 1) % 3;
    if (newMode === PlayMode.SEQUENCE) {
      setPlayList(sequencePlayList);
      const newIndex = findIndex(currentSong, sequencePlayList);
      setCurrentIndex(newIndex);
    } else if (newMode === PlayMode.LOOP) {
      setPlayList([currentSong]);
    } else if (newMode === PlayMode.RANDOM) {
      const newList = shuffle(sequencePlayList);
      const newIndex = findIndex(currentSong, newList);
      setPlayList(newList);
      setCurrentIndex(newIndex);
    }

    setPlayMode(newMode);
  };

  const errorHandler = () => {
    songReady.current = true;
    alert("播放出错");
  };

  return (
    <div className={styles.player}>
      <PlayerBanner song={currentSong} />
      <SongContext.Provider value={{ setSongProgress }}>
        <FullScreenPlayer
          song={currentSong}
          currentTime={currentTime}
          duration={duration}
          prevHandler={prevHandler}
          nextHandler={nextHandler}
          togglePlayMode={togglePlayMode}
        />
      </SongContext.Provider>
      <audio ref={audioRef} onTimeUpdate={updateTime} onEnded={endHandler} onError={errorHandler}></audio>
    </div>
  );
};

export default Player;

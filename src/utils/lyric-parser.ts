const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g;

const STATE_PAUSE = 0;
const STATE_PLAYING = 1;

enum PlayState {
  PAUSE,
  PLAYING,
}

export type LineType = {
  time: number;
  txt: string;
};

export type LyricLineType = {
  txt: string;
  lineNum: number;
};

export default class Lyric {
  private lrc: string;
  lyricList: LineType[];
  private handler: (lyricLine: LyricLineType) => void;
  private state: number;
  private curLineIndex: number;
  private startStamp: number;
  private timer: any = null;

  constructor(lrc: string, handler: (lyricLine: LyricLineType) => void) {
    this.lrc = lrc; // 原始字符串
    this.lyricList = []; // 这是解析后的数组，每一项包含对应的歌词和时间
    this.handler = handler; // 回调函数
    this.state = PlayState.PAUSE; // 播放状态
    this.curLineIndex = 0; // 当前播放歌词所在的行数
    this.startStamp = 0; // 歌曲开始的时间戳

    this.initLines();
  }

  private initLines() {
    // 解析代码
    const lines = this.lrc.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]; // 如 "[00:01.997] 作词：薛之谦"
      const result = timeExp.exec(line);
      if (!result) continue;

      const txt = line.replace(timeExp, "").trim(); // 现在把时间戳去掉，只剩下歌词文本

      if (txt) {
        if (result[3].length === 3) {
          result[3] = Number(result[3]) / 10 + ""; // [00:01.997] 中匹配到的 997 就会被切成 99
        }

        // 转化具体到毫秒的时间，result [3] * 10 可理解为 (result / 100) * 1000
        this.lyricList.push({
          time: Number(result[1]) * 60 * 1000 + Number(result[2]) * 1000 + (Number(result[3]) || 0) * 10,
          txt,
        });
      }
    }

    this.lyricList.sort((a, b) => {
      return a.time - b.time;
    }); // 根据时间排序
  }

  getLyricList() {
    return this.lyricList;
  }

  // offset 为时间进度，isSeek 标志位表示用户是否手动调整进度
  // 开始播放
  play(timeOffset = 0, isSeek = false) {
    if (this.lyricList.length === 0) return;

    this.state = PlayState.PLAYING;

    // 找到当前所在的行
    this.curLineIndex = this.findCurLineIndex(timeOffset);

    // 现在正处于第 this.curLineIndex - 1 行
    // 立即定位，方式是调用传来的回调函数，并把当前歌词信息传给它
    this.callHandler(this.curLineIndex - 1);

    // 根据时间进度判断歌曲开始的时间戳
    this.startStamp = Date.now() - timeOffset;

    if (this.curLineIndex < this.lyricList.length) {
      clearTimeout(this.timer);
      // 继续播放
      this.playRest(isSeek);
    }
  }

  /**
   * 根据时间定为到歌词的第几行
   * @param time
   * @returns
   */
  private findCurLineIndex(time: number) {
    for (let i = 0; i < this.lyricList.length; i++) {
      if (time <= this.lyricList[i].time) {
        return i;
      }
    }

    // 若超出歌曲时长，返回最后一行
    return this.lyricList.length - 1;
  }

  /**
   * 定为到歌词的行数
   * @param i
   * @returns
   */
  private callHandler(i: number) {
    if (i < 0) return;

    this.handler({
      txt: this.lyricList[i].txt,
      lineNum: i,
    });
  }

  // isSeek 标志位表示用户是否手动调整进度
  private playRest(isSeek = false) {
    // line 下一行
    const line = this.lyricList[this.curLineIndex];
    let delay: number;

    if (isSeek) {
      delay = line.time - (Date.now() - this.startStamp);
    } else {
      // 拿到上一行的歌词开始时间，算间隔
      const preTime = this.lyricList[this.curLineIndex - 1] ? this.lyricList[this.curLineIndex - 1].time : 0;
      delay = line.time - preTime;
    }

    this.timer = setTimeout(() => {
      this.callHandler(this.curLineIndex++);
      if (this.curLineIndex < this.lyricList.length && this.state === PlayState.PLAYING) {
        this.playRest();
      }
    }, delay);
  }

  // 播放和暂停切换
  togglePlay(timeOffset: number) {
    if (this.state === PlayState.PLAYING) {
      this.stop();
    } else {
      this.state = PlayState.PLAYING;
      this.play(timeOffset, true);
    }
  }

  // 播放停止
  stop() {
    this.state = PlayState.PAUSE;
    clearTimeout(this.timer);
  }

  // 歌词跳转,切换到歌词某个点
  seek(timeOffset: number) {
    this.play(timeOffset, true);
  }
}

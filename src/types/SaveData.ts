import Letter from "./Letter";

export default interface SaveData {
  useSave: boolean;
  word: string;
  attempts: Letter[][];
  keys: {
    correct: string[];
    position: string[];
    used: string[];
  };
  stats: {
    totalPoints: number;
    streak: number;
    maxStreak: number;
  };

  showResults: boolean;
}

import SaveData from "@/types/SaveData";

const SAVE_DATA_KEY = "savedata";
const getEmptySave = (): SaveData => {
  return {
    useSave: false,
    attempts: [],
    stats: {
      maxStreak: 0,
      streak: 0,
      totalPoints: 0,
    },
    word: "",
    keys: {
      correct: [],
      position: [],
      used: [],
    },
    showResults: false,
  };
};

export default {
  checkStorage() {
    try {
      const data = localStorage.getItem(SAVE_DATA_KEY);
      if (data === null) return false;
      return this.getSave().useSave;
    } catch {
      return false;
    }
  },
  getSave() {
    const data = localStorage.getItem(SAVE_DATA_KEY);
    let savedata: SaveData;

    if (data !== null) {
      savedata = JSON.parse(data) as SaveData;
    } else {
      savedata = getEmptySave();
    }

    return savedata;
  },
  setSave(data: SaveData) {
    localStorage.setItem(SAVE_DATA_KEY, JSON.stringify(data));
  },
  reset() {
    localStorage.setItem(SAVE_DATA_KEY, JSON.stringify(getEmptySave()));
  },
  resetWordData() {
    const data = this.getSave();
    data.attempts = [];
    data.word = "";
    data.keys = { correct: [], used: [], position: [] };
    data.showResults = false;
    this.setSave(data);
  },
};

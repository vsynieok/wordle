const WORD_GENERATOR_API = "https://random-word-api.herokuapp.com";
const DICTIONARY_API = "https://api.dictionaryapi.dev/api/v2";

export default {
  async getWord(length: number) {
    const data: string[] = await fetch(
      `${WORD_GENERATOR_API}/word?length=${length}`
    ).then((d) => d.json());
    return data[0];
  },
  async checkWord(word: string) {
    try {
      const data = await fetch(`${DICTIONARY_API}/entries/en/${word}`);
      return data.ok;
    } catch {
      return false;
    }
  },
};

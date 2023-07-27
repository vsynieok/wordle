import Letter from "@/types/Letter";

export function generateEmptyWordArray(length: number): Letter[] {
  return Array.from({ length: length }, () => {
    return { text: "", status: "notsubmitted" };
  });
}

export function generateFullCorrectArray(word: string): Letter[] {
  return word.split("").map((l) => {
    return { text: l, status: "correct" };
  });
}

export function compareWords(wordA: string, wordB: string): Letter[] {
  // wordA -- an attempt
  // wordB -- the correct answer

  if (wordA === wordB)
    return Array.from(wordA).map((l) => {
      return { text: l, status: "correct" };
    });

  const arrA = Array.from(wordA);
  const arrB = Array.from(wordB);

  const results: Letter[] = arrA.map((v, i) => {
    return {
      text: v,
      status:
        arrB[i] === arrA[i]
          ? "correct"
          : arrB.includes(v)
          ? "incorrectposition"
          : "incorrect",
    };
  });

  arrA.forEach((v, i) => {
    const guessCountA = arrA.filter((p) => p === v).length;
    const guessCountB = arrB.filter((p) => p === v).length;

    if (guessCountA > guessCountB) {
      if (
        results[i].status === "incorrectposition" &&
        results.some(
          (r, ri) => r.text === v && r.status === "correct" && ri !== i
        )
      ) {
        results[i].status = "incorrect";
        return;
      }
      if (
        results[i].status === "incorrectposition" &&
        results.some(
          (r, ri) =>
            r.text === v && r.status === "incorrectposition" && ri !== i
        )
      ) {
        results[i].status = "incorrect";
      }
    }
  });

  return results;
}

export default interface Letter {
  text: string;
  status: "notsubmitted" | "correct" | "incorrect" | "incorrectposition";
}

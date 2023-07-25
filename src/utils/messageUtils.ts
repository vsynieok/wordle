export default {
  getMessageForResult(points: number) {
    switch (points) {
      case 1:
        return "That's a guess...";
      case 2:
        return "Not bad";
      case 3:
        return "Well done";
      case 4:
        return "Good job";
      case 5:
        return "Amazing!";
      case 6:
        return "Wow!";
      default:
        return "";
    }
  },
};

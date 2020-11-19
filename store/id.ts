export const setId = (id: String): { type: String; id: String } => ({
  type: "ID",
  id,
});

const getId = (
  currentId: String = "",
  action: { type: String; id: String }
): String => {
  switch (action.type) {
    case "ID":
      return action.id;
    default:
      return currentId;
  }
};

export default getId;
